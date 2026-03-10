#!/bin/bash

GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo ""
echo -e "${GREEN}╔══════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   🔧 Fixing multiSchema Feature      ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════╝${NC}"
echo ""

echo -e "${BLUE}[1/3] Rewriting schema.prisma with multiSchema preview...${NC}"

cat > prisma/schema.prisma << 'EOF'
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["multiSchema"]
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  schemas  = ["public", "auth"]
}

model User {
  id            String             @id @default(cuid())
  walletAddress String             @unique
  createdAt     DateTime           @default(now())
  enrollments   Enrollment[]
  completions   LessonCompletion[]
  certificates  Certificate[]

  @@schema("public")
}

model Course {
  id           String        @id @default(cuid())
  slug         String        @unique
  title        String
  description  String
  thumbnail    String        @default("")
  difficulty   String
  category     String
  durationMins Int           @default(60)
  createdAt    DateTime      @default(now())
  lessons      Lesson[]
  enrollments  Enrollment[]
  certificates Certificate[]

  @@schema("public")
}

model Lesson {
  id          String             @id @default(cuid())
  courseId    String
  course      Course             @relation(fields: [courseId], references: [id], onDelete: Cascade)
  title       String
  videoUrl    String             @default("")
  order       Int
  quizzes     Quiz[]
  completions LessonCompletion[]

  @@schema("public")
}

model Quiz {
  id          String   @id @default(cuid())
  lessonId    String
  lesson      Lesson   @relation(fields: [lessonId], references: [id], onDelete: Cascade)
  question    String
  options     String[]
  answer      Int
  explanation String   @default("")

  @@schema("public")
}

model Enrollment {
  id          String    @id @default(cuid())
  userId      String
  courseId    String
  user        User      @relation(fields: [userId], references: [id])
  course      Course    @relation(fields: [courseId], references: [id])
  enrolledAt  DateTime  @default(now())
  completedAt DateTime?

  @@unique([userId, courseId])
  @@schema("public")
}

model LessonCompletion {
  id          String   @id @default(cuid())
  userId      String
  lessonId    String
  user        User     @relation(fields: [userId], references: [id])
  lesson      Lesson   @relation(fields: [lessonId], references: [id])
  completedAt DateTime @default(now())

  @@unique([userId, lessonId])
  @@schema("public")
}

model Certificate {
  id             String   @id @default(cuid())
  userId         String
  courseId       String
  user           User     @relation(fields: [userId], references: [id])
  course         Course   @relation(fields: [courseId], references: [id])
  nftMintAddress String   @default("")
  txSignature    String   @default("")
  issuedAt       DateTime @default(now())

  @@schema("public")
}
EOF

echo -e "${GREEN}  ✓ schema.prisma fixed (multiSchema enabled)${NC}"

echo ""
echo -e "${BLUE}[2/3] Generating Prisma client...${NC}"
npx prisma generate
echo -e "${GREEN}  ✓ Done${NC}"

echo ""
echo -e "${BLUE}[3/3] Pushing schema to database...${NC}"
npx prisma db push

if [ $? -eq 0 ]; then
  echo ""
  echo -e "${GREEN}╔══════════════════════════════════════════════════╗${NC}"
  echo -e "${GREEN}║  ✅ Database schema pushed successfully!         ║${NC}"
  echo -e "${GREEN}╠══════════════════════════════════════════════════╣${NC}"
  echo -e "${GREEN}║  Now run:                                        ║${NC}"
  echo -e "${GREEN}║    npx prisma db seed                            ║${NC}"
  echo -e "${GREEN}║    npm run dev                                   ║${NC}"
  echo -e "${GREEN}║  🌐 http://localhost:3000                        ║${NC}"
  echo -e "${GREEN}╚══════════════════════════════════════════════════╝${NC}"
else
  echo -e "\033[0;31m❌ Still failing — paste the error above!\033[0m"
fi
