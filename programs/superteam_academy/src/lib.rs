use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, MintTo, Token, TokenAccount};
use anchor_spl::associated_token::AssociatedToken;

declare_id!("SAcadXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

/// Seeds constants
const PLATFORM_SEED: &[u8] = b"platform";
const COURSE_SEED: &[u8] = b"course";
const ENROLLMENT_SEED: &[u8] = b"enrollment";
const PROGRESS_SEED: &[u8] = b"progress";
const CERTIFICATE_SEED: &[u8] = b"certificate";

/// XP rewards
const XP_PER_LESSON: u64 = 10;
const XP_COURSE_BONUS: u64 = 50;

#[program]
pub mod superteam_academy {
    use super::*;

    /// Initialize the platform with an admin authority
    pub fn initialize_platform(ctx: Context<InitializePlatform>) -> Result<()> {
        let platform = &mut ctx.accounts.platform;
        platform.authority = ctx.accounts.authority.key();
        platform.total_courses = 0;
        platform.total_enrollments = 0;
        platform.total_certificates = 0;
        platform.bump = ctx.bumps.platform;

        msg!("Platform initialized with authority: {}", platform.authority);
        Ok(())
    }

    /// Register a new course (admin only)
    pub fn create_course(
        ctx: Context<CreateCourse>,
        course_id: String,
        title: String,
        total_lessons: u8,
        difficulty: Difficulty,
    ) -> Result<()> {
        require!(course_id.len() <= 32, ErrorCode::StringTooLong);
        require!(title.len() <= 64, ErrorCode::StringTooLong);
        require!(total_lessons > 0, ErrorCode::InvalidLessonCount);

        let course = &mut ctx.accounts.course;
        course.course_id = course_id;
        course.title = title;
        course.total_lessons = total_lessons;
        course.difficulty = difficulty;
        course.enrolled_count = 0;
        course.completed_count = 0;
        course.is_active = true;
        course.authority = ctx.accounts.authority.key();
        course.bump = ctx.bumps.course;

        let platform = &mut ctx.accounts.platform;
        platform.total_courses += 1;

        msg!("Course created: {} with {} lessons", course.title, course.total_lessons);
        Ok(())
    }

    /// Enroll a student in a course
    pub fn enroll(ctx: Context<Enroll>) -> Result<()> {
        let course = &ctx.accounts.course;
        require!(course.is_active, ErrorCode::CourseInactive);

        let enrollment = &mut ctx.accounts.enrollment;
        enrollment.student = ctx.accounts.student.key();
        enrollment.course = ctx.accounts.course.key();
        enrollment.enrolled_at = Clock::get()?.unix_timestamp;
        enrollment.bump = ctx.bumps.enrollment;

        let progress = &mut ctx.accounts.progress;
        progress.student = ctx.accounts.student.key();
        progress.course = ctx.accounts.course.key();
        progress.completed_lessons = 0;
        progress.total_lessons = course.total_lessons;
        progress.xp_earned = 0;
        progress.is_completed = false;
        progress.bump = ctx.bumps.progress;

        // Update counters
        let course_mut = &mut ctx.accounts.course;
        course_mut.enrolled_count += 1;

        let platform = &mut ctx.accounts.platform;
        platform.total_enrollments += 1;

        msg!(
            "Student {} enrolled in course {}",
            enrollment.student,
            course.title
        );
        Ok(())
    }

    /// Record a lesson completion
    pub fn complete_lesson(ctx: Context<CompleteLesson>, lesson_index: u8) -> Result<()> {
        let progress = &mut ctx.accounts.progress;

        require!(
            lesson_index < progress.total_lessons,
            ErrorCode::InvalidLessonIndex
        );
        require!(!progress.is_completed, ErrorCode::CourseAlreadyCompleted);

        // Increment completed lessons (simple counter, not tracking individual lessons on-chain
        // to save space; the off-chain DB tracks individual lesson completions)
        progress.completed_lessons += 1;
        progress.xp_earned += XP_PER_LESSON;

        // Check if course is now complete
        if progress.completed_lessons >= progress.total_lessons {
            progress.is_completed = true;
            progress.xp_earned += XP_COURSE_BONUS;

            let course = &mut ctx.accounts.course;
            course.completed_count += 1;

            msg!(
                "Course completed! Total XP earned: {}",
                progress.xp_earned
            );
        } else {
            msg!(
                "Lesson {} completed. Progress: {}/{}",
                lesson_index,
                progress.completed_lessons,
                progress.total_lessons
            );
        }

        Ok(())
    }

    /// Mint a certificate NFT for a completed course
    pub fn mint_certificate(
        ctx: Context<MintCertificate>,
        certificate_uri: String,
        certificate_name: String,
    ) -> Result<()> {
        require!(certificate_uri.len() <= 200, ErrorCode::StringTooLong);
        require!(certificate_name.len() <= 64, ErrorCode::StringTooLong);

        let progress = &ctx.accounts.progress;
        require!(progress.is_completed, ErrorCode::CourseNotCompleted);

        let certificate = &mut ctx.accounts.certificate;
        certificate.student = ctx.accounts.student.key();
        certificate.course = ctx.accounts.course.key();
        certificate.mint = ctx.accounts.certificate_mint.key();
        certificate.metadata_uri = certificate_uri;
        certificate.minted_at = Clock::get()?.unix_timestamp;
        certificate.bump = ctx.bumps.certificate;

        // Mint 1 token to the student's ATA
        let platform_seeds = &[
            PLATFORM_SEED,
            &[ctx.accounts.platform.bump],
        ];
        let signer_seeds = &[&platform_seeds[..]];

        let cpi_accounts = MintTo {
            mint: ctx.accounts.certificate_mint.to_account_info(),
            to: ctx.accounts.student_token_account.to_account_info(),
            authority: ctx.accounts.platform.to_account_info(),
        };
        let cpi_ctx = CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            cpi_accounts,
            signer_seeds,
        );
        token::mint_to(cpi_ctx, 1)?;

        // Update platform stats
        let platform = &mut ctx.accounts.platform;
        platform.total_certificates += 1;

        msg!(
            "Certificate NFT minted for student {} - course {}",
            certificate.student,
            ctx.accounts.course.title
        );
        Ok(())
    }

    /// Deactivate a course (admin only)
    pub fn deactivate_course(ctx: Context<DeactivateCourse>) -> Result<()> {
        let course = &mut ctx.accounts.course;
        course.is_active = false;
        msg!("Course deactivated: {}", course.title);
        Ok(())
    }
}

// ============================================================================
// Account Contexts
// ============================================================================

#[derive(Accounts)]
pub struct InitializePlatform<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + Platform::INIT_SPACE,
        seeds = [PLATFORM_SEED],
        bump
    )]
    pub platform: Account<'info, Platform>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(course_id: String)]
pub struct CreateCourse<'info> {
    #[account(
        mut,
        seeds = [PLATFORM_SEED],
        bump = platform.bump,
        has_one = authority
    )]
    pub platform: Account<'info, Platform>,
    #[account(
        init,
        payer = authority,
        space = 8 + Course::INIT_SPACE,
        seeds = [COURSE_SEED, course_id.as_bytes()],
        bump
    )]
    pub course: Account<'info, Course>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Enroll<'info> {
    #[account(
        mut,
        seeds = [PLATFORM_SEED],
        bump = platform.bump,
    )]
    pub platform: Account<'info, Platform>,
    #[account(
        mut,
        seeds = [COURSE_SEED, course.course_id.as_bytes()],
        bump = course.bump,
    )]
    pub course: Account<'info, Course>,
    #[account(
        init,
        payer = student,
        space = 8 + Enrollment::INIT_SPACE,
        seeds = [ENROLLMENT_SEED, student.key().as_ref(), course.key().as_ref()],
        bump
    )]
    pub enrollment: Account<'info, Enrollment>,
    #[account(
        init,
        payer = student,
        space = 8 + Progress::INIT_SPACE,
        seeds = [PROGRESS_SEED, student.key().as_ref(), course.key().as_ref()],
        bump
    )]
    pub progress: Account<'info, Progress>,
    #[account(mut)]
    pub student: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(lesson_index: u8)]
pub struct CompleteLesson<'info> {
    #[account(
        mut,
        seeds = [COURSE_SEED, course.course_id.as_bytes()],
        bump = course.bump,
    )]
    pub course: Account<'info, Course>,
    #[account(
        mut,
        seeds = [PROGRESS_SEED, student.key().as_ref(), course.key().as_ref()],
        bump = progress.bump,
        has_one = student,
        has_one = course,
    )]
    pub progress: Account<'info, Progress>,
    pub student: Signer<'info>,
}

#[derive(Accounts)]
pub struct MintCertificate<'info> {
    #[account(
        mut,
        seeds = [PLATFORM_SEED],
        bump = platform.bump,
    )]
    pub platform: Account<'info, Platform>,
    #[account(
        seeds = [COURSE_SEED, course.course_id.as_bytes()],
        bump = course.bump,
    )]
    pub course: Account<'info, Course>,
    #[account(
        seeds = [PROGRESS_SEED, student.key().as_ref(), course.key().as_ref()],
        bump = progress.bump,
        has_one = student,
        has_one = course,
    )]
    pub progress: Account<'info, Progress>,
    #[account(
        init,
        payer = student,
        space = 8 + CertificateAccount::INIT_SPACE,
        seeds = [CERTIFICATE_SEED, student.key().as_ref(), course.key().as_ref()],
        bump
    )]
    pub certificate: Account<'info, CertificateAccount>,
    #[account(
        init,
        payer = student,
        mint::decimals = 0,
        mint::authority = platform,
        mint::freeze_authority = platform,
    )]
    pub certificate_mint: Account<'info, Mint>,
    #[account(
        init,
        payer = student,
        associated_token::mint = certificate_mint,
        associated_token::authority = student,
    )]
    pub student_token_account: Account<'info, TokenAccount>,
    #[account(mut)]
    pub student: Signer<'info>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct DeactivateCourse<'info> {
    #[account(
        seeds = [PLATFORM_SEED],
        bump = platform.bump,
        has_one = authority,
    )]
    pub platform: Account<'info, Platform>,
    #[account(
        mut,
        seeds = [COURSE_SEED, course.course_id.as_bytes()],
        bump = course.bump,
    )]
    pub course: Account<'info, Course>,
    pub authority: Signer<'info>,
}

// ============================================================================
// State Accounts
// ============================================================================

#[account]
#[derive(InitSpace)]
pub struct Platform {
    pub authority: Pubkey,
    pub total_courses: u32,
    pub total_enrollments: u64,
    pub total_certificates: u64,
    pub bump: u8,
}

#[account]
#[derive(InitSpace)]
pub struct Course {
    #[max_len(32)]
    pub course_id: String,
    #[max_len(64)]
    pub title: String,
    pub total_lessons: u8,
    pub difficulty: Difficulty,
    pub enrolled_count: u32,
    pub completed_count: u32,
    pub is_active: bool,
    pub authority: Pubkey,
    pub bump: u8,
}

#[account]
#[derive(InitSpace)]
pub struct Enrollment {
    pub student: Pubkey,
    pub course: Pubkey,
    pub enrolled_at: i64,
    pub bump: u8,
}

#[account]
#[derive(InitSpace)]
pub struct Progress {
    pub student: Pubkey,
    pub course: Pubkey,
    pub completed_lessons: u8,
    pub total_lessons: u8,
    pub xp_earned: u64,
    pub is_completed: bool,
    pub bump: u8,
}

#[account]
#[derive(InitSpace)]
pub struct CertificateAccount {
    pub student: Pubkey,
    pub course: Pubkey,
    pub mint: Pubkey,
    #[max_len(200)]
    pub metadata_uri: String,
    pub minted_at: i64,
    pub bump: u8,
}

// ============================================================================
// Enums
// ============================================================================

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, PartialEq, Eq, InitSpace)]
pub enum Difficulty {
    Beginner,
    Intermediate,
    Advanced,
}

// ============================================================================
// Errors
// ============================================================================

#[error_code]
pub enum ErrorCode {
    #[msg("String exceeds maximum allowed length")]
    StringTooLong,
    #[msg("Invalid lesson count - must be greater than 0")]
    InvalidLessonCount,
    #[msg("Course is not active")]
    CourseInactive,
    #[msg("Invalid lesson index")]
    InvalidLessonIndex,
    #[msg("Course is already completed")]
    CourseAlreadyCompleted,
    #[msg("Course is not yet completed - all lessons must be done")]
    CourseNotCompleted,
    #[msg("Unauthorized - admin access required")]
    Unauthorized,
}
