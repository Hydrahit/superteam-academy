// lib/services/course.ts

/**
 * COURSE SERVICE
 * 
 * Manages course catalog with multilingual support
 * Provides sample Solana courses in English, Portuguese, and Spanish
 */

import { Course, CourseModule, Lesson, Difficulty, Locale } from '@/lib/types/domain';

/**
 * Interface for Course Service
 */
export interface ICourseService {
  /** Get all courses */
  getAllCourses(locale?: Locale): Promise<Course[]>;
  
  /** Get course by ID */
  getCourseById(id: string, locale?: Locale): Promise<Course | null>;
  
  /** Get course by slug */
  getCourseBySlug(slug: string, locale?: Locale): Promise<Course | null>;
  
  /** Get lesson by ID */
  getLessonById(courseId: string, lessonId: string, locale?: Locale): Promise<Lesson | null>;
}

/**
 * Mock Course Service with multilingual sample content
 */
export class MockCourseService implements ICourseService {
  private courses: Map<Locale, Course[]> = new Map();

  constructor() {
    this.initializeCourses();
  }

  private initializeCourses() {
    // English courses
    this.courses.set('en', this.getEnglishCourses());
    
    // Portuguese courses
    this.courses.set('pt-br', this.getPortugueseCourses());
    
    // Spanish courses
    this.courses.set('es', this.getSpanishCourses());
  }

  async getAllCourses(locale: Locale = 'en'): Promise<Course[]> {
    await this.delay();
    return this.courses.get(locale) || this.courses.get('en')!;
  }

  async getCourseById(id: string, locale: Locale = 'en'): Promise<Course | null> {
    await this.delay();
    const courses = this.courses.get(locale) || this.courses.get('en')!;
    return courses.find(c => c.id === id) || null;
  }

  async getCourseBySlug(slug: string, locale: Locale = 'en'): Promise<Course | null> {
    await this.delay();
    const courses = this.courses.get(locale) || this.courses.get('en')!;
    return courses.find(c => c.slug === slug) || null;
  }

  async getLessonById(courseId: string, lessonId: string, locale: Locale = 'en'): Promise<Lesson | null> {
    const course = await this.getCourseById(courseId, locale);
    if (!course) return null;

    for (const module of course.modules) {
      const lesson = module.lessons.find(l => l.id === lessonId);
      if (lesson) return lesson;
    }

    return null;
  }

  private async delay(ms: number = 300): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // ==========================================================================
  // ENGLISH COURSES
  // ==========================================================================

  private getEnglishCourses(): Course[] {
    return [
      {
        id: 'solana-101',
        slug: 'solana-fundamentals',
        title: 'Solana Fundamentals',
        description: 'Learn the basics of Solana blockchain development. Perfect for beginners starting their Web3 journey.',
        difficulty: 'beginner',
        durationMinutes: 120,
        xpReward: 500,
        coverImageUrl: '/courses/solana-fundamentals.jpg',
        language: 'en',
        prerequisites: [],
        tags: ['blockchain', 'solana', 'web3', 'beginner'],
        isPublished: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        modules: [
          {
            id: 'module-1',
            title: 'Introduction to Solana',
            description: 'Understanding blockchain and Solana basics',
            order: 1,
            lessons: [
              {
                id: 'lesson-1-1',
                title: 'What is Solana?',
                type: 'reading',
                xpReward: 50,
                estimatedMinutes: 10,
                order: 1,
                tags: ['introduction', 'blockchain'],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                contentMarkdown: `# What is Solana?

Solana is a high-performance blockchain supporting builders around the world creating crypto apps that scale today.

## Key Features

- **Fast**: 400ms block times enable near-instant transactions
- **Cheap**: Average cost per transaction is $0.00025
- **Scalable**: Theoretical limit of 50,000 TPS (transactions per second)

## How It Works

Solana achieves high performance through eight key innovations:

1. **Proof of History (PoH)**: A clock before consensus
2. **Tower BFT**: PoH-optimized version of PBFT
3. **Turbine**: Block propagation protocol
4. **Gulf Stream**: Mempool-less transaction forwarding
5. **Sealevel**: Parallel smart contracts runtime
6. **Pipelining**: Transaction processing unit
7. **Cloudbreak**: Horizontally-scaled accounts database
8. **Archivers**: Distributed ledger store

## Why Learn Solana?

- **Growing ecosystem**: Thousands of projects building on Solana
- **Developer-friendly**: Rich tooling and documentation
- **Career opportunities**: High demand for Solana developers
- **Innovation**: Cutting-edge blockchain technology

Ready to start your journey?`,
              },
              {
                id: 'lesson-1-2',
                title: 'Setting Up Your Environment',
                type: 'reading',
                xpReward: 50,
                estimatedMinutes: 15,
                order: 2,
                tags: ['setup', 'tools'],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                contentMarkdown: `# Setting Up Your Development Environment

Let's get your development environment ready for Solana.

## Prerequisites

Before starting, ensure you have:

- **Node.js 16+** installed
- **Rust** (latest stable version)
- **Git** for version control

## Installing Solana CLI

The Solana Command Line Interface (CLI) is essential for development.

\`\`\`bash
# Install Solana CLI
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"

# Verify installation
solana --version

# Expected output: solana-cli 1.17.x
\`\`\`

## Configuring Solana CLI

Set up your CLI for devnet (test network):

\`\`\`bash
# Set config to devnet
solana config set --url https://api.devnet.solana.com

# Create a new keypair
solana-keygen new

# Check your address
solana address

# Request airdrop (test SOL)
solana airdrop 2
\`\`\`

## Installing Anchor Framework

Anchor makes Solana development easier:

\`\`\`bash
# Install Anchor
cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
avm install latest
avm use latest

# Verify installation
anchor --version
\`\`\`

## IDE Setup

We recommend **Visual Studio Code** with these extensions:

- Rust Analyzer
- Solana Playground
- Prettier

You're ready to build!`,
              },
            ],
          },
          {
            id: 'module-2',
            title: 'Your First Transaction',
            description: 'Learn to interact with the Solana blockchain',
            order: 2,
            lessons: [
              {
                id: 'lesson-2-1',
                title: 'Creating a Wallet',
                type: 'challenge',
                xpReward: 100,
                estimatedMinutes: 20,
                order: 1,
                language: 'typescript',
                tags: ['coding', 'wallet', 'web3'],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                contentMarkdown: `# Creating a Wallet

Let's write code to create a new Solana wallet!

## Challenge

Complete the function to generate a new keypair and return its public address as a string.

## What You'll Learn

- Using @solana/web3.js library
- Creating keypairs
- Working with public keys`,
                starterCode: `import { Keypair } from '@solana/web3.js';

function createWallet() {
  // TODO: Create a new keypair
  const keypair = 
  
  // TODO: Return the public key as a string
  return 
}

// Test your code
const wallet = createWallet();
console.log('Wallet address:', wallet);`,
                solution: `import { Keypair } from '@solana/web3.js';

function createWallet() {
  // Create a new keypair
  const keypair = Keypair.generate();
  
  // Return the public key as a string
  return keypair.publicKey.toBase58();
}

// Test your code
const wallet = createWallet();
console.log('Wallet address:', wallet);`,
                testCases: [
                  {
                    id: 'test-1',
                    input: '',
                    expectedOutput: 'string',
                    isHidden: false,
                    description: 'Should return a valid Solana address',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'anchor-201',
        slug: 'anchor-framework',
        title: 'Anchor Framework Mastery',
        description: 'Build production-ready Solana programs with Anchor. Learn smart contract development from scratch.',
        difficulty: 'intermediate',
        durationMinutes: 240,
        xpReward: 1000,
        coverImageUrl: '/courses/anchor-framework.jpg',
        language: 'en',
        prerequisites: ['solana-101'],
        tags: ['anchor', 'smart-contracts', 'intermediate'],
        isPublished: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        modules: [
          {
            id: 'module-1',
            title: 'Anchor Basics',
            description: 'Introduction to Anchor framework',
            order: 1,
            lessons: [
              {
                id: 'lesson-1-1',
                title: 'Introduction to Anchor',
                type: 'reading',
                xpReward: 75,
                estimatedMinutes: 15,
                order: 1,
                tags: ['anchor', 'introduction'],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                contentMarkdown: `# Introduction to Anchor

Anchor is a framework for Solana that makes it easier to write secure smart contracts.

## Why Anchor?

- **Type safety**: Automatic serialization and deserialization
- **Testing framework**: Built-in testing utilities
- **Account validation**: Automatic security checks
- **Documentation**: Auto-generated IDL (Interface Definition Language)

## Project Structure

\`\`\`
my-anchor-project/
├── programs/       # Your smart contracts
├── tests/          # Integration tests
├── migrations/     # Deployment scripts
└── Anchor.toml     # Configuration
\`\`\`

## Your First Anchor Program

\`\`\`rust
use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod my_program {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
\`\`\`

Let's build something amazing!`,
              },
            ],
          },
        ],
      },
    ];
  }

  // ==========================================================================
  // PORTUGUESE COURSES
  // ==========================================================================

  private getPortugueseCourses(): Course[] {
    return [
      {
        id: 'solana-101',
        slug: 'solana-fundamentals',
        title: 'Fundamentos de Solana',
        description: 'Aprenda o básico do desenvolvimento blockchain Solana. Perfeito para iniciantes começando sua jornada Web3.',
        difficulty: 'beginner',
        durationMinutes: 120,
        xpReward: 500,
        coverImageUrl: '/courses/solana-fundamentals.jpg',
        language: 'pt-br',
        prerequisites: [],
        tags: ['blockchain', 'solana', 'web3', 'iniciante'],
        isPublished: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        modules: [
          {
            id: 'module-1',
            title: 'Introdução ao Solana',
            description: 'Entendendo blockchain e os fundamentos do Solana',
            order: 1,
            lessons: [
              {
                id: 'lesson-1-1',
                title: 'O que é Solana?',
                type: 'reading',
                xpReward: 50,
                estimatedMinutes: 10,
                order: 1,
                tags: ['introdução', 'blockchain'],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                contentMarkdown: `# O que é Solana?

Solana é uma blockchain de alta performance que suporta desenvolvedores ao redor do mundo criando aplicativos cripto que escalam hoje.

## Características Principais

- **Rápido**: Blocos de 400ms permitem transações quase instantâneas
- **Barato**: Custo médio por transação é $0.00025
- **Escalável**: Limite teórico de 50.000 TPS (transações por segundo)

## Como Funciona

Solana alcança alta performance através de oito inovações chave:

1. **Proof of History (PoH)**: Um relógio antes do consenso
2. **Tower BFT**: Versão otimizada de PBFT com PoH
3. **Turbine**: Protocolo de propagação de blocos
4. **Gulf Stream**: Encaminhamento de transações sem mempool
5. **Sealevel**: Runtime paralelo de contratos inteligentes
6. **Pipelining**: Unidade de processamento de transações
7. **Cloudbreak**: Base de dados de contas escalonada horizontalmente
8. **Archivers**: Armazenamento distribuído do ledger

## Por que Aprender Solana?

- **Ecossistema crescente**: Milhares de projetos construindo na Solana
- **Amigável para desenvolvedores**: Ferramentas e documentação ricas
- **Oportunidades de carreira**: Alta demanda por desenvolvedores Solana
- **Inovação**: Tecnologia blockchain de ponta

Pronto para começar sua jornada?`,
              },
            ],
          },
        ],
      },
    ];
  }

  // ==========================================================================
  // SPANISH COURSES
  // ==========================================================================

  private getSpanishCourses(): Course[] {
    return [
      {
        id: 'solana-101',
        slug: 'solana-fundamentals',
        title: 'Fundamentos de Solana',
        description: 'Aprende los conceptos básicos del desarrollo blockchain en Solana. Perfecto para principiantes que comienzan su viaje en Web3.',
        difficulty: 'beginner',
        durationMinutes: 120,
        xpReward: 500,
        coverImageUrl: '/courses/solana-fundamentals.jpg',
        language: 'es',
        prerequisites: [],
        tags: ['blockchain', 'solana', 'web3', 'principiante'],
        isPublished: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        modules: [
          {
            id: 'module-1',
            title: 'Introducción a Solana',
            description: 'Entendiendo blockchain y los fundamentos de Solana',
            order: 1,
            lessons: [
              {
                id: 'lesson-1-1',
                title: '¿Qué es Solana?',
                type: 'reading',
                xpReward: 50,
                estimatedMinutes: 10,
                order: 1,
                tags: ['introducción', 'blockchain'],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                contentMarkdown: `# ¿Qué es Solana?

Solana es una blockchain de alto rendimiento que apoya a desarrolladores de todo el mundo en la creación de aplicaciones cripto que escalan hoy.

## Características Clave

- **Rápido**: Bloques de 400ms permiten transacciones casi instantáneas
- **Económico**: Costo promedio por transacción es $0.00025
- **Escalable**: Límite teórico de 50,000 TPS (transacciones por segundo)

## Cómo Funciona

Solana logra alto rendimiento a través de ocho innovaciones clave:

1. **Proof of History (PoH)**: Un reloj antes del consenso
2. **Tower BFT**: Versión optimizada de PBFT con PoH
3. **Turbine**: Protocolo de propagación de bloques
4. **Gulf Stream**: Reenvío de transacciones sin mempool
5. **Sealevel**: Runtime paralelo de contratos inteligentes
6. **Pipelining**: Unidad de procesamiento de transacciones
7. **Cloudbreak**: Base de datos de cuentas escalada horizontalmente
8. **Archivers**: Almacenamiento distribuido del ledger

## ¿Por qué Aprender Solana?

- **Ecosistema creciente**: Miles de proyectos construyendo en Solana
- **Amigable para desarrolladores**: Herramientas y documentación ricas
- **Oportunidades de carrera**: Alta demanda de desarrolladores Solana
- **Innovación**: Tecnología blockchain de vanguardia

¿Listo para comenzar tu viaje?`,
              },
            ],
          },
        ],
      },
    ];
  }
}

// Export singleton
export const courseService = new MockCourseService();
