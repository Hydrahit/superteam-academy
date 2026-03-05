-- 1. Create Profiles Table (Linked to Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  wallet_address TEXT UNIQUE,
  total_xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  streak INTEGER DEFAULT 0,
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create Lesson Progress Table
CREATE TABLE IF NOT EXISTS public.user_lessons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- 3. THE BRAIN FUNCTION: Atomic XP Increment
-- This prevents race conditions and frontend hacking.
CREATE OR REPLACE FUNCTION public.complete_lesson_atomic(
  p_user_id UUID,
  p_lesson_id TEXT,
  p_difficulty INTEGER,
  p_base_xp INTEGER DEFAULT 100
) RETURNS INTEGER AS $$
DECLARE
  v_reward INTEGER;
  v_streak_bonus DECIMAL;
BEGIN
  -- Check if already completed
  IF EXISTS (SELECT 1 FROM public.user_lessons WHERE user_id = p_user_id AND lesson_id = p_lesson_id) THEN
    RETURN 0;
  END IF;

  -- Calculate Streak Bonus (Logic locked in DB)
  SELECT CASE 
    WHEN streak >= 7 THEN 1.5 
    WHEN streak >= 3 THEN 1.2 
    ELSE 1.0 
  END INTO v_streak_bonus
  FROM public.profiles WHERE id = p_user_id;

  v_reward := FLOOR(p_difficulty * p_base_xp * v_streak_bonus);

  -- 1. Record Lesson Completion
  INSERT INTO public.user_lessons (user_id, lesson_id) VALUES (p_user_id, p_lesson_id);

  -- 2. Update Profile (XP and Level)
  UPDATE public.profiles 
  SET 
    total_xp = total_xp + v_reward,
    level = FLOOR(SQRT((total_xp + v_reward) / 100)),
    last_activity = NOW()
  WHERE id = p_user_id;

  RETURN v_reward;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);