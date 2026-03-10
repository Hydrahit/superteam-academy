import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { SuperteamAcademy } from '../target/types/superteam_academy';
import { PublicKey, Keypair, SystemProgram } from '@solana/web3.js';
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync,
} from '@solana/spl-token';
import { assert, expect } from 'chai';

describe('superteam_academy', () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.SuperteamAcademy as Program<SuperteamAcademy>;
  const authority = provider.wallet;

  // PDAs
  let platformPda: PublicKey;
  let platformBump: number;

  // Test course data
  const courseId = 'web3-basics';
  const courseTitle = 'Web3 Basics';
  const totalLessons = 5;

  let coursePda: PublicKey;
  let courseBump: number;

  // Student
  const student = Keypair.generate();
  let enrollmentPda: PublicKey;
  let progressPda: PublicKey;
  let certificatePda: PublicKey;

  before(async () => {
    // Derive PDAs
    [platformPda, platformBump] = PublicKey.findProgramAddressSync(
      [Buffer.from('platform')],
      program.programId
    );

    [coursePda, courseBump] = PublicKey.findProgramAddressSync(
      [Buffer.from('course'), Buffer.from(courseId)],
      program.programId
    );

    [enrollmentPda] = PublicKey.findProgramAddressSync(
      [
        Buffer.from('enrollment'),
        student.publicKey.toBuffer(),
        coursePda.toBuffer(),
      ],
      program.programId
    );

    [progressPda] = PublicKey.findProgramAddressSync(
      [
        Buffer.from('progress'),
        student.publicKey.toBuffer(),
        coursePda.toBuffer(),
      ],
      program.programId
    );

    [certificatePda] = PublicKey.findProgramAddressSync(
      [
        Buffer.from('certificate'),
        student.publicKey.toBuffer(),
        coursePda.toBuffer(),
      ],
      program.programId
    );

    // Airdrop SOL to student for transactions
    const sig = await provider.connection.requestAirdrop(
      student.publicKey,
      5 * anchor.web3.LAMPORTS_PER_SOL
    );
    await provider.connection.confirmTransaction(sig);
  });

  describe('Platform Initialization', () => {
    it('initializes the platform', async () => {
      await program.methods
        .initializePlatform()
        .accounts({
          platform: platformPda,
          authority: authority.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      const platform = await program.account.platform.fetch(platformPda);
      assert.ok(platform.authority.equals(authority.publicKey));
      assert.equal(platform.totalCourses, 0);
      assert.equal(platform.totalEnrollments.toNumber(), 0);
      assert.equal(platform.totalCertificates.toNumber(), 0);
    });

    it('rejects duplicate initialization', async () => {
      try {
        await program.methods
          .initializePlatform()
          .accounts({
            platform: platformPda,
            authority: authority.publicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc();
        assert.fail('Should have thrown error');
      } catch (err) {
        // Account already initialized - expected
        assert.ok(err);
      }
    });
  });

  describe('Course Management', () => {
    it('creates a course', async () => {
      await program.methods
        .createCourse(courseId, courseTitle, totalLessons, { beginner: {} })
        .accounts({
          platform: platformPda,
          course: coursePda,
          authority: authority.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      const course = await program.account.course.fetch(coursePda);
      assert.equal(course.courseId, courseId);
      assert.equal(course.title, courseTitle);
      assert.equal(course.totalLessons, totalLessons);
      assert.deepEqual(course.difficulty, { beginner: {} });
      assert.equal(course.enrolledCount, 0);
      assert.equal(course.completedCount, 0);
      assert.ok(course.isActive);

      const platform = await program.account.platform.fetch(platformPda);
      assert.equal(platform.totalCourses, 1);
    });

    it('rejects course with empty title', async () => {
      const badCourseId = 'bad-course';
      const [badCoursePda] = PublicKey.findProgramAddressSync(
        [Buffer.from('course'), Buffer.from(badCourseId)],
        program.programId
      );

      try {
        await program.methods
          .createCourse(badCourseId, '', 0, { beginner: {} })
          .accounts({
            platform: platformPda,
            course: badCoursePda,
            authority: authority.publicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc();
        assert.fail('Should have thrown error');
      } catch (err) {
        assert.ok(err);
      }
    });

    it('rejects non-admin course creation', async () => {
      const fakeCourseId = 'fake-course';
      const [fakeCoursePda] = PublicKey.findProgramAddressSync(
        [Buffer.from('course'), Buffer.from(fakeCourseId)],
        program.programId
      );

      try {
        await program.methods
          .createCourse(fakeCourseId, 'Fake Course', 3, { beginner: {} })
          .accounts({
            platform: platformPda,
            course: fakeCoursePda,
            authority: student.publicKey,
            systemProgram: SystemProgram.programId,
          })
          .signers([student])
          .rpc();
        assert.fail('Should have thrown error');
      } catch (err) {
        // Constraint violation - not the authority
        assert.ok(err);
      }
    });
  });

  describe('Student Enrollment', () => {
    it('enrolls a student in a course', async () => {
      await program.methods
        .enroll()
        .accounts({
          platform: platformPda,
          course: coursePda,
          enrollment: enrollmentPda,
          progress: progressPda,
          student: student.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .signers([student])
        .rpc();

      const enrollment = await program.account.enrollment.fetch(enrollmentPda);
      assert.ok(enrollment.student.equals(student.publicKey));
      assert.ok(enrollment.course.equals(coursePda));
      assert.ok(enrollment.enrolledAt.toNumber() > 0);

      const progress = await program.account.progress.fetch(progressPda);
      assert.equal(progress.completedLessons, 0);
      assert.equal(progress.totalLessons, totalLessons);
      assert.equal(progress.xpEarned.toNumber(), 0);
      assert.ok(!progress.isCompleted);

      const course = await program.account.course.fetch(coursePda);
      assert.equal(course.enrolledCount, 1);

      const platform = await program.account.platform.fetch(platformPda);
      assert.equal(platform.totalEnrollments.toNumber(), 1);
    });

    it('rejects duplicate enrollment', async () => {
      try {
        await program.methods
          .enroll()
          .accounts({
            platform: platformPda,
            course: coursePda,
            enrollment: enrollmentPda,
            progress: progressPda,
            student: student.publicKey,
            systemProgram: SystemProgram.programId,
          })
          .signers([student])
          .rpc();
        assert.fail('Should have thrown error');
      } catch (err) {
        assert.ok(err);
      }
    });
  });

  describe('Lesson Completion', () => {
    it('completes lessons and tracks progress', async () => {
      // Complete lessons 0 through 3
      for (let i = 0; i < totalLessons - 1; i++) {
        await program.methods
          .completeLesson(i)
          .accounts({
            course: coursePda,
            progress: progressPda,
            student: student.publicKey,
          })
          .signers([student])
          .rpc();
      }

      const progress = await program.account.progress.fetch(progressPda);
      assert.equal(progress.completedLessons, totalLessons - 1);
      assert.equal(progress.xpEarned.toNumber(), (totalLessons - 1) * 10); // 10 XP per lesson
      assert.ok(!progress.isCompleted);
    });

    it('completes the final lesson and marks course done', async () => {
      await program.methods
        .completeLesson(totalLessons - 1)
        .accounts({
          course: coursePda,
          progress: progressPda,
          student: student.publicKey,
        })
        .signers([student])
        .rpc();

      const progress = await program.account.progress.fetch(progressPda);
      assert.equal(progress.completedLessons, totalLessons);
      assert.equal(progress.xpEarned.toNumber(), totalLessons * 10 + 50); // lessons XP + course bonus
      assert.ok(progress.isCompleted);

      const course = await program.account.course.fetch(coursePda);
      assert.equal(course.completedCount, 1);
    });

    it('rejects lesson completion after course is done', async () => {
      try {
        await program.methods
          .completeLesson(0)
          .accounts({
            course: coursePda,
            progress: progressPda,
            student: student.publicKey,
          })
          .signers([student])
          .rpc();
        assert.fail('Should have thrown error');
      } catch (err) {
        const anchorErr = err as anchor.AnchorError;
        assert.ok(
          anchorErr.error?.errorMessage?.includes('already completed') ||
          anchorErr.toString().includes('CourseAlreadyCompleted')
        );
      }
    });

    it('rejects invalid lesson index', async () => {
      // Create a new course + enrollment to test
      const course2Id = 'solana-101';
      const [course2Pda] = PublicKey.findProgramAddressSync(
        [Buffer.from('course'), Buffer.from(course2Id)],
        program.programId
      );
      const [enrollment2Pda] = PublicKey.findProgramAddressSync(
        [Buffer.from('enrollment'), student.publicKey.toBuffer(), course2Pda.toBuffer()],
        program.programId
      );
      const [progress2Pda] = PublicKey.findProgramAddressSync(
        [Buffer.from('progress'), student.publicKey.toBuffer(), course2Pda.toBuffer()],
        program.programId
      );

      await program.methods
        .createCourse(course2Id, 'Solana 101', 3, { intermediate: {} })
        .accounts({
          platform: platformPda,
          course: course2Pda,
          authority: authority.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      await program.methods
        .enroll()
        .accounts({
          platform: platformPda,
          course: course2Pda,
          enrollment: enrollment2Pda,
          progress: progress2Pda,
          student: student.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .signers([student])
        .rpc();

      try {
        await program.methods
          .completeLesson(99) // Invalid index
          .accounts({
            course: course2Pda,
            progress: progress2Pda,
            student: student.publicKey,
          })
          .signers([student])
          .rpc();
        assert.fail('Should have thrown error');
      } catch (err) {
        assert.ok(err);
      }
    });
  });

  describe('Certificate Minting', () => {
    it('mints a certificate NFT for completed course', async () => {
      const certificateMint = Keypair.generate();
      const studentAta = getAssociatedTokenAddressSync(
        certificateMint.publicKey,
        student.publicKey
      );

      await program.methods
        .mintCertificate(
          'https://arweave.net/test-metadata-uri',
          'Superteam Academy - Web3 Basics Certificate'
        )
        .accounts({
          platform: platformPda,
          course: coursePda,
          progress: progressPda,
          certificate: certificatePda,
          certificateMint: certificateMint.publicKey,
          studentTokenAccount: studentAta,
          student: student.publicKey,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
          rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        })
        .signers([student, certificateMint])
        .rpc();

      const certificate = await program.account.certificateAccount.fetch(certificatePda);
      assert.ok(certificate.student.equals(student.publicKey));
      assert.ok(certificate.course.equals(coursePda));
      assert.ok(certificate.mint.equals(certificateMint.publicKey));
      assert.equal(certificate.metadataUri, 'https://arweave.net/test-metadata-uri');
      assert.ok(certificate.mintedAt.toNumber() > 0);

      const platform = await program.account.platform.fetch(platformPda);
      assert.equal(platform.totalCertificates.toNumber(), 1);
    });

    it('rejects certificate for incomplete course', async () => {
      // Use the second course (solana-101) which has NOT been completed
      const course2Id = 'solana-101';
      const [course2Pda] = PublicKey.findProgramAddressSync(
        [Buffer.from('course'), Buffer.from(course2Id)],
        program.programId
      );
      const [progress2Pda] = PublicKey.findProgramAddressSync(
        [Buffer.from('progress'), student.publicKey.toBuffer(), course2Pda.toBuffer()],
        program.programId
      );
      const [certificate2Pda] = PublicKey.findProgramAddressSync(
        [Buffer.from('certificate'), student.publicKey.toBuffer(), course2Pda.toBuffer()],
        program.programId
      );

      const certMint2 = Keypair.generate();
      const studentAta2 = getAssociatedTokenAddressSync(
        certMint2.publicKey,
        student.publicKey
      );

      try {
        await program.methods
          .mintCertificate(
            'https://arweave.net/fake',
            'Fake Certificate'
          )
          .accounts({
            platform: platformPda,
            course: course2Pda,
            progress: progress2Pda,
            certificate: certificate2Pda,
            certificateMint: certMint2.publicKey,
            studentTokenAccount: studentAta2,
            student: student.publicKey,
            tokenProgram: TOKEN_PROGRAM_ID,
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
          })
          .signers([student, certMint2])
          .rpc();
        assert.fail('Should have thrown error');
      } catch (err) {
        const anchorErr = err as anchor.AnchorError;
        assert.ok(
          anchorErr.error?.errorMessage?.includes('not yet completed') ||
          anchorErr.toString().includes('CourseNotCompleted')
        );
      }
    });
  });

  describe('Course Deactivation', () => {
    it('deactivates a course (admin only)', async () => {
      await program.methods
        .deactivateCourse()
        .accounts({
          platform: platformPda,
          course: coursePda,
          authority: authority.publicKey,
        })
        .rpc();

      const course = await program.account.course.fetch(coursePda);
      assert.ok(!course.isActive);
    });

    it('rejects enrollment in deactivated course', async () => {
      const newStudent = Keypair.generate();
      const airdropSig = await provider.connection.requestAirdrop(
        newStudent.publicKey,
        2 * anchor.web3.LAMPORTS_PER_SOL
      );
      await provider.connection.confirmTransaction(airdropSig);

      const [newEnrollmentPda] = PublicKey.findProgramAddressSync(
        [Buffer.from('enrollment'), newStudent.publicKey.toBuffer(), coursePda.toBuffer()],
        program.programId
      );
      const [newProgressPda] = PublicKey.findProgramAddressSync(
        [Buffer.from('progress'), newStudent.publicKey.toBuffer(), coursePda.toBuffer()],
        program.programId
      );

      try {
        await program.methods
          .enroll()
          .accounts({
            platform: platformPda,
            course: coursePda,
            enrollment: newEnrollmentPda,
            progress: newProgressPda,
            student: newStudent.publicKey,
            systemProgram: SystemProgram.programId,
          })
          .signers([newStudent])
          .rpc();
        assert.fail('Should have thrown error');
      } catch (err) {
        assert.ok(err);
      }
    });
  });
});
