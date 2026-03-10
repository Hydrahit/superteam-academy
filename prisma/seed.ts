import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.certificate.deleteMany();
  await prisma.lessonCompletion.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Course 1: Web3 Basics — BEGINNER, 45min
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const course1 = await prisma.course.create({
    data: {
      slug: 'web3-basics',
      title: 'Web3 Basics',
      description: 'Your first steps into the decentralized web. Learn what Web3 is, how blockchains work, and why Solana is leading the next wave of internet innovation.',
      thumbnail: '/images/courses/web3-basics.png',
      difficulty: 'BEGINNER',
      category: 'Web3 Basics',
      durationMins: 45,
      lessons: {
        create: [
          {
            title: 'What is Web3?',
            videoUrl: 'https://www.youtube.com/watch?v=nHhAEkG1y2U',
            order: 1,
            quizzes: {
              create: [
                {
                  question: 'What is the primary difference between Web2 and Web3?',
                  options: ['Faster loading speeds', 'User ownership and decentralization', 'Better graphics', 'More social features'],
                  answer: 1,
                  explanation: 'Web3 is defined by decentralization and user ownership of data and assets, unlike Web2 where platforms control user data.'
                },
                {
                  question: 'Which technology underpins Web3 applications?',
                  options: ['Cloud computing', 'Blockchain technology', 'Artificial intelligence', '5G networks'],
                  answer: 1,
                  explanation: 'Blockchain is the foundational technology behind Web3, enabling trustless, decentralized applications.'
                }
              ]
            }
          },
          {
            title: 'How Blockchains Work',
            videoUrl: 'https://www.youtube.com/watch?v=SSo_EIwHSd4',
            order: 2,
            quizzes: {
              create: [
                {
                  question: 'What is a block in a blockchain?',
                  options: ['A user account', 'A collection of validated transactions', 'A smart contract', 'A mining reward'],
                  answer: 1,
                  explanation: 'A block is a bundle of transactions that have been validated and added to the chain in sequence.'
                },
                {
                  question: 'Why is a blockchain considered immutable?',
                  options: ['It uses strong passwords', 'Each block references the previous block via cryptographic hashes', 'Only admins can edit it', 'It backs up to the cloud'],
                  answer: 1,
                  explanation: 'Cryptographic hash linking means altering any block would invalidate all subsequent blocks, making tampering practically impossible.'
                }
              ]
            }
          },
          {
            title: 'Understanding Wallets & Keys',
            videoUrl: 'https://www.youtube.com/watch?v=GSTiKPFMTn0',
            order: 3,
            quizzes: {
              create: [
                {
                  question: 'What is a private key used for?',
                  options: ['Viewing your balance', 'Signing transactions and proving ownership', 'Connecting to WiFi', 'Registering a domain'],
                  answer: 1,
                  explanation: 'Your private key cryptographically signs transactions, proving you are the owner of the associated wallet.'
                },
                {
                  question: 'What should you NEVER do with your seed phrase?',
                  options: ['Write it down on paper', 'Store it in a safe', 'Share it online or with others', 'Memorize it'],
                  answer: 2,
                  explanation: 'Sharing your seed phrase gives full access to your wallet. Keep it private and secure at all times.'
                }
              ]
            }
          },
          {
            title: 'Your First Transaction',
            videoUrl: 'https://www.youtube.com/watch?v=4dNuMXBjpr0',
            order: 4,
            quizzes: {
              create: [
                {
                  question: 'What is a transaction fee (gas) used for?',
                  options: ['Paying the website host', 'Compensating validators for processing transactions', 'Subscription fees', 'Advertising costs'],
                  answer: 1,
                  explanation: 'Transaction fees compensate the network validators who process and confirm your transaction on the blockchain.'
                },
                {
                  question: 'On Solana, approximately how much does a typical transaction cost?',
                  options: ['$5-10', '$0.50-1.00', 'Less than $0.01', '$100+'],
                  answer: 2,
                  explanation: 'Solana is known for extremely low transaction fees, typically less than a penny per transaction.'
                }
              ]
            }
          },
          {
            title: 'Intro to dApps',
            videoUrl: 'https://www.youtube.com/watch?v=oPIupbsVimc',
            order: 5,
            quizzes: {
              create: [
                {
                  question: 'What makes a dApp different from a traditional app?',
                  options: ['It is faster', 'It runs on decentralized infrastructure with no single point of failure', 'It requires no internet', 'It is always free'],
                  answer: 1,
                  explanation: 'dApps run on blockchain networks, making them censorship-resistant and not controlled by any single entity.'
                },
                {
                  question: 'Which of these is an example of a dApp?',
                  options: ['Microsoft Word', 'Instagram', 'Uniswap', 'Spotify'],
                  answer: 2,
                  explanation: 'Uniswap is a decentralized exchange (DEX) that operates as a dApp on the Ethereum blockchain.'
                }
              ]
            }
          }
        ]
      }
    }
  });
  console.log(`✅ Created course: ${course1.title}`);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Course 2: Solana Fundamentals — BEGINNER, 90min
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const course2 = await prisma.course.create({
    data: {
      slug: 'solana-fundamentals',
      title: 'Solana Fundamentals',
      description: 'Dive deep into Solana\'s architecture. Understand Proof of History, the accounts model, programs, and how to build on the fastest blockchain.',
      thumbnail: '/images/courses/solana-fundamentals.png',
      difficulty: 'BEGINNER',
      category: 'Solana Dev',
      durationMins: 90,
      lessons: {
        create: [
          {
            title: 'Why Solana?',
            videoUrl: 'https://www.youtube.com/watch?v=1jzROE6EhxM',
            order: 1,
            quizzes: {
              create: [
                {
                  question: 'What is Solana\'s theoretical max throughput?',
                  options: ['1,000 TPS', '10,000 TPS', '65,000 TPS', '1,000,000 TPS'],
                  answer: 2,
                  explanation: 'Solana can theoretically process 65,000 transactions per second thanks to its Proof of History mechanism.'
                },
                {
                  question: 'What consensus innovation does Solana use?',
                  options: ['Proof of Work', 'Proof of Stake only', 'Proof of History + Proof of Stake', 'Delegated Proof of Stake'],
                  answer: 2,
                  explanation: 'Solana combines Proof of History (PoH) as a clock mechanism with Proof of Stake for consensus.'
                }
              ]
            }
          },
          {
            title: 'Proof of History Explained',
            videoUrl: 'https://www.youtube.com/watch?v=rywOYfGu4EA',
            order: 2,
            quizzes: {
              create: [
                {
                  question: 'What does Proof of History provide?',
                  options: ['Mining rewards', 'A verifiable passage of time between events', 'Smart contract execution', 'Token generation'],
                  answer: 1,
                  explanation: 'PoH creates a historical record that proves events occurred in a specific sequence, acting as a decentralized clock.'
                },
                {
                  question: 'How does PoH improve performance?',
                  options: ['By using more electricity', 'Validators don\'t need to agree on time, reducing communication overhead', 'By compressing data', 'By using fewer validators'],
                  answer: 1,
                  explanation: 'Since PoH provides an agreed-upon ordering of events, validators spend less time coordinating, leading to faster consensus.'
                }
              ]
            }
          },
          {
            title: 'Solana Accounts Model',
            videoUrl: 'https://www.youtube.com/watch?v=pRYs49MqapI',
            order: 3,
            quizzes: {
              create: [
                {
                  question: 'In Solana, what is an account?',
                  options: ['Only a user wallet', 'A container that holds data and/or SOL', 'A smart contract only', 'A validator node'],
                  answer: 1,
                  explanation: 'On Solana, everything is an account — wallets, program data, and even programs themselves are stored in accounts.'
                },
                {
                  question: 'What is "rent" in Solana?',
                  options: ['Monthly subscription to use Solana', 'Cost to keep data stored on the blockchain', 'Validator hosting fees', 'Transaction tax'],
                  answer: 1,
                  explanation: 'Rent is a fee for storing data on-chain. Accounts with enough SOL (2 years worth) become rent-exempt.'
                }
              ]
            }
          },
          {
            title: 'Programs (Smart Contracts)',
            videoUrl: 'https://www.youtube.com/watch?v=uRZP-II6Bog',
            order: 4,
            quizzes: {
              create: [
                {
                  question: 'What language are Solana programs primarily written in?',
                  options: ['JavaScript', 'Python', 'Rust', 'Solidity'],
                  answer: 2,
                  explanation: 'Solana programs are primarily written in Rust, compiled to BPF bytecode that runs on the Solana runtime.'
                },
                {
                  question: 'Are Solana programs stateful or stateless?',
                  options: ['Stateful — they store their own data', 'Stateless — data is stored in separate accounts', 'Both', 'Neither'],
                  answer: 1,
                  explanation: 'Solana programs are stateless. They read from and write to separate data accounts passed into instructions.'
                }
              ]
            }
          },
          {
            title: 'SPL Token Standard',
            videoUrl: 'https://www.youtube.com/watch?v=ZqKlKRqGRL0',
            order: 5,
            quizzes: {
              create: [
                {
                  question: 'What is an SPL Token?',
                  options: ['A special validator reward', 'Solana\'s standard for fungible and non-fungible tokens', 'A type of wallet', 'A consensus mechanism'],
                  answer: 1,
                  explanation: 'SPL (Solana Program Library) Token is the standard for creating fungible tokens, stablecoins, and NFTs on Solana.'
                },
                {
                  question: 'What account stores a user\'s token balance?',
                  options: ['The main wallet', 'An Associated Token Account (ATA)', 'The token program', 'A PDA'],
                  answer: 1,
                  explanation: 'Each token a user holds requires an Associated Token Account (ATA) that maps their wallet to a specific mint.'
                }
              ]
            }
          },
          {
            title: 'Wallet Adapters & Connecting',
            videoUrl: 'https://www.youtube.com/watch?v=tMdzsipmBQ4',
            order: 6,
            quizzes: {
              create: [
                {
                  question: 'What does a wallet adapter do in a dApp?',
                  options: ['Mines cryptocurrency', 'Provides a standard interface to connect different wallets', 'Stores private keys on the server', 'Generates NFTs'],
                  answer: 1,
                  explanation: 'Wallet adapters abstract the differences between wallet providers (Phantom, Solflare, etc.) into a unified API for dApps.'
                },
                {
                  question: 'Which wallet is the most popular on Solana?',
                  options: ['MetaMask', 'Phantom', 'Coinbase Wallet', 'Trust Wallet'],
                  answer: 1,
                  explanation: 'Phantom is the most widely used Solana wallet, known for its user-friendly interface and wide dApp support.'
                }
              ]
            }
          },
          {
            title: 'Transaction Anatomy',
            videoUrl: 'https://www.youtube.com/watch?v=g6rpCo-IxEQ',
            order: 7,
            quizzes: {
              create: [
                {
                  question: 'What is an instruction in a Solana transaction?',
                  options: ['A line of code', 'An individual operation telling a program what to do', 'A validator command', 'A wallet backup'],
                  answer: 1,
                  explanation: 'Instructions are the atomic operations within a transaction. Each tells a specific program what accounts to use and what action to take.'
                },
                {
                  question: 'Can a single Solana transaction contain multiple instructions?',
                  options: ['No, only one', 'Yes, transactions are composed of one or more instructions', 'Only if they target the same program', 'Only with special permissions'],
                  answer: 1,
                  explanation: 'Solana transactions can batch multiple instructions together, all executing atomically — they all succeed or all fail.'
                }
              ]
            }
          },
          {
            title: 'Solana CLI & Devnet',
            videoUrl: 'https://www.youtube.com/watch?v=G6nYHo72Q6o',
            order: 8,
            quizzes: {
              create: [
                {
                  question: 'What is Solana devnet used for?',
                  options: ['Production deployments', 'Testing and development with free SOL', 'Mining operations', 'Token sales'],
                  answer: 1,
                  explanation: 'Devnet is a testing environment where developers can experiment freely using free airdropped SOL.'
                },
                {
                  question: 'How do you get test SOL on devnet?',
                  options: ['Buy it on an exchange', 'Mine it', 'Use solana airdrop command', 'Earn it from staking'],
                  answer: 2,
                  explanation: 'The `solana airdrop` CLI command (or web faucets) provides free test SOL on devnet for development.'
                }
              ]
            }
          }
        ]
      }
    }
  });
  console.log(`✅ Created course: ${course2.title}`);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Course 3: Building with Anchor — INTERMEDIATE, 180min
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const course3 = await prisma.course.create({
    data: {
      slug: 'building-with-anchor',
      title: 'Building with Anchor',
      description: 'Master the Anchor framework for Solana development. From your first program to advanced patterns like PDAs, CPIs, and testing.',
      thumbnail: '/images/courses/building-with-anchor.png',
      difficulty: 'INTERMEDIATE',
      category: 'Solana Dev',
      durationMins: 180,
      lessons: {
        create: [
          {
            title: 'Introduction to Anchor',
            videoUrl: 'https://www.youtube.com/watch?v=oD5WIbkHHPE',
            order: 1,
            quizzes: {
              create: [
                {
                  question: 'What is Anchor?',
                  options: ['A Solana wallet', 'A framework for building Solana programs in Rust', 'A JavaScript library', 'A block explorer'],
                  answer: 1,
                  explanation: 'Anchor is a framework that simplifies Solana program development with macros, automatic serialization, and safety checks.'
                },
                {
                  question: 'What does the #[program] macro do?',
                  options: ['Creates a token', 'Defines the entry point and instruction handlers for your program', 'Deploys to mainnet', 'Generates a wallet'],
                  answer: 1,
                  explanation: 'The #[program] macro marks a module as the program\'s instruction handler, generating boilerplate for account validation and deserialization.'
                }
              ]
            }
          },
          {
            title: 'Rust Basics for Solana',
            videoUrl: 'https://www.youtube.com/watch?v=lYsFnED-mhg',
            order: 2,
            quizzes: {
              create: [
                {
                  question: 'What is Rust\'s ownership model?',
                  options: ['Garbage collection', 'Each value has exactly one owner, preventing memory leaks', 'Manual memory management like C', 'Reference counting only'],
                  answer: 1,
                  explanation: 'Rust enforces single ownership at compile time, ensuring memory safety without a garbage collector.'
                },
                {
                  question: 'What does the `&` symbol mean in Rust?',
                  options: ['Multiplication', 'A reference (borrowing without taking ownership)', 'String concatenation', 'Logical AND'],
                  answer: 1,
                  explanation: 'The & symbol creates a reference, allowing you to use a value without taking ownership of it.'
                }
              ]
            }
          },
          {
            title: 'Account Validation with Anchor',
            videoUrl: 'https://www.youtube.com/watch?v=fYGsq-_nps0',
            order: 3,
            quizzes: {
              create: [
                {
                  question: 'What does the #[account] macro do?',
                  options: ['Creates a wallet', 'Defines and validates the accounts a program instruction needs', 'Sends a transaction', 'Generates an NFT'],
                  answer: 1,
                  explanation: 'The #[account] macro defines account structs with validation constraints that Anchor checks automatically before instruction execution.'
                },
                {
                  question: 'What does `init` constraint do in Anchor?',
                  options: ['Closes an account', 'Creates a new account and allocates space', 'Transfers tokens', 'Updates an existing account'],
                  answer: 1,
                  explanation: 'The `init` constraint tells Anchor to create a new account, allocate the specified space, and pay rent from the payer.'
                }
              ]
            }
          },
          {
            title: 'Program Derived Addresses (PDAs)',
            videoUrl: 'https://www.youtube.com/watch?v=ZwFNPvqUclM',
            order: 4,
            quizzes: {
              create: [
                {
                  question: 'What is a PDA?',
                  options: ['A personal digital assistant', 'An account address derived from seeds that only a program can sign for', 'A type of token', 'A validator ID'],
                  answer: 1,
                  explanation: 'PDAs are special addresses derived from a program ID and seeds. They have no private key and can only be signed for by the owning program.'
                },
                {
                  question: 'Why are PDAs useful?',
                  options: ['They are faster', 'They let programs own and control accounts deterministically', 'They cost less', 'They are more secure than wallets'],
                  answer: 1,
                  explanation: 'PDAs allow programs to deterministically derive account addresses and sign transactions on behalf of those accounts.'
                }
              ]
            }
          },
          {
            title: 'Cross-Program Invocations (CPIs)',
            videoUrl: 'https://www.youtube.com/watch?v=reyVjSJCfPY',
            order: 5,
            quizzes: {
              create: [
                {
                  question: 'What is a CPI?',
                  options: ['A token standard', 'When one program calls another program\'s instruction', 'A consensus protocol', 'A wallet type'],
                  answer: 1,
                  explanation: 'Cross-Program Invocations allow programs to call instructions on other programs, enabling composability.'
                },
                {
                  question: 'What is the maximum CPI depth on Solana?',
                  options: ['2 levels', '4 levels', '10 levels', 'Unlimited'],
                  answer: 1,
                  explanation: 'Solana allows a maximum CPI depth of 4 levels to prevent excessive compute usage and stack overflow.'
                }
              ]
            }
          },
          {
            title: 'Working with the Token Program',
            videoUrl: 'https://www.youtube.com/watch?v=L3mBJKmoCfc',
            order: 6,
            quizzes: {
              create: [
                {
                  question: 'How do you transfer SPL tokens in an Anchor program?',
                  options: ['Direct assignment', 'Using CPI to the Token Program\'s transfer instruction', 'HTTP request', 'Modify the ledger directly'],
                  answer: 1,
                  explanation: 'Token transfers are done via CPI to the SPL Token Program, passing the source, destination, and authority accounts.'
                },
                {
                  question: 'What is a mint account?',
                  options: ['A user wallet', 'The account that defines a token\'s properties (supply, decimals, authority)', 'A validator reward', 'A PDA'],
                  answer: 1,
                  explanation: 'A mint account stores the token\'s metadata including total supply, decimals, and who has authority to mint more.'
                }
              ]
            }
          },
          {
            title: 'Error Handling in Anchor',
            videoUrl: 'https://www.youtube.com/watch?v=BXHQ5NxzGEY',
            order: 7,
            quizzes: {
              create: [
                {
                  question: 'How do you define custom errors in Anchor?',
                  options: ['Using try/catch', 'With the #[error_code] macro on an enum', 'With console.log', 'Using panic!()'],
                  answer: 1,
                  explanation: 'Anchor uses the #[error_code] attribute on a Rust enum to define custom program errors with descriptive messages.'
                },
                {
                  question: 'What does `require!()` do in Anchor?',
                  options: ['Imports a module', 'Checks a condition and returns an error if it fails', 'Creates an account', 'Logs a message'],
                  answer: 1,
                  explanation: 'The require!() macro is a guard that checks a boolean condition and returns the specified error if it evaluates to false.'
                }
              ]
            }
          },
          {
            title: 'Testing Anchor Programs',
            videoUrl: 'https://www.youtube.com/watch?v=OyKMl7MYUXI',
            order: 8,
            quizzes: {
              create: [
                {
                  question: 'What testing framework does Anchor use by default?',
                  options: ['Jest', 'Mocha with Chai', 'Vitest', 'Jasmine'],
                  answer: 1,
                  explanation: 'Anchor\'s default TypeScript test setup uses Mocha as the test runner and Chai for assertions.'
                },
                {
                  question: 'What does `anchor test` do?',
                  options: ['Only compiles', 'Builds the program, spins up a local validator, deploys, and runs tests', 'Only runs tests', 'Deploys to mainnet'],
                  answer: 1,
                  explanation: 'The `anchor test` command handles the full lifecycle: build, start local validator, deploy the program, run tests, then shut down.'
                }
              ]
            }
          },
          {
            title: 'State Management Patterns',
            videoUrl: 'https://www.youtube.com/watch?v=JYPZ8p1JKKE',
            order: 9,
            quizzes: {
              create: [
                {
                  question: 'What is the best practice for storing large data sets on Solana?',
                  options: ['One giant account', 'Multiple smaller accounts with PDAs', 'Off-chain in a database', 'In the program binary'],
                  answer: 1,
                  explanation: 'Using multiple PDA-derived accounts scales better and avoids the 10MB account size limit.'
                },
                {
                  question: 'What is account space allocation?',
                  options: ['Memory management', 'Defining how many bytes an account needs when initialized', 'CPU allocation', 'Network bandwidth'],
                  answer: 1,
                  explanation: 'When creating accounts, you must specify the exact byte size needed. Anchor can calculate this automatically with the `space` attribute.'
                }
              ]
            }
          },
          {
            title: 'Events & Logging',
            videoUrl: 'https://www.youtube.com/watch?v=28L0K0dPJ_o',
            order: 10,
            quizzes: {
              create: [
                {
                  question: 'How do you emit events in Anchor?',
                  options: ['console.log()', 'Using the emit!() macro', 'HTTP webhook', 'Writing to a file'],
                  answer: 1,
                  explanation: 'Anchor\'s emit!() macro serializes event data into the transaction log, which clients can parse and subscribe to.'
                },
                {
                  question: 'What is msg!() used for?',
                  options: ['Sending messages to users', 'Logging debug information to the program log', 'Creating notifications', 'Email alerts'],
                  answer: 1,
                  explanation: 'msg!() writes formatted strings to the Solana program log, useful for debugging during development.'
                }
              ]
            }
          },
          {
            title: 'Security Best Practices',
            videoUrl: 'https://www.youtube.com/watch?v=F_KZ0kMSIJI',
            order: 11,
            quizzes: {
              create: [
                {
                  question: 'What is a signer check?',
                  options: ['Checking email', 'Verifying that the expected wallet has signed the transaction', 'Password validation', 'IP verification'],
                  answer: 1,
                  explanation: 'Signer checks ensure that the wallet claiming authority over an operation has actually cryptographically signed the transaction.'
                },
                {
                  question: 'What is an owner check vulnerability?',
                  options: ['Copyright issue', 'Failing to verify that an account is owned by the expected program', 'Password leak', 'DNS attack'],
                  answer: 1,
                  explanation: 'Without owner checks, an attacker could pass accounts owned by a different program, potentially manipulating your program\'s logic.'
                }
              ]
            }
          },
          {
            title: 'Deploying to Devnet & Mainnet',
            videoUrl: 'https://www.youtube.com/watch?v=DU-TwPFnTjA',
            order: 12,
            quizzes: {
              create: [
                {
                  question: 'What command deploys an Anchor program?',
                  options: ['anchor push', 'anchor deploy', 'solana deploy', 'npm deploy'],
                  answer: 1,
                  explanation: 'The `anchor deploy` command builds and deploys the program binary to the configured Solana cluster.'
                },
                {
                  question: 'What should you do before deploying to mainnet?',
                  options: ['Nothing special', 'Thoroughly test on devnet, audit the code, and verify all accounts', 'Just change the RPC URL', 'Restart the computer'],
                  answer: 1,
                  explanation: 'Mainnet deployments use real SOL. Thorough testing, security audits, and careful account verification are essential.'
                }
              ]
            }
          }
        ]
      }
    }
  });
  console.log(`✅ Created course: ${course3.title}`);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Course 4: DeFi on Solana — ADVANCED, 150min
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const course4 = await prisma.course.create({
    data: {
      slug: 'defi-on-solana',
      title: 'DeFi on Solana',
      description: 'Explore the DeFi ecosystem on Solana. Learn about AMMs, lending protocols, yield farming, liquidations, and building DeFi applications.',
      thumbnail: '/images/courses/defi-on-solana.png',
      difficulty: 'ADVANCED',
      category: 'DeFi',
      durationMins: 150,
      lessons: {
        create: [
          {
            title: 'What is DeFi?',
            videoUrl: 'https://www.youtube.com/watch?v=o9ObYRjpIhs',
            order: 1,
            quizzes: {
              create: [
                {
                  question: 'What does DeFi stand for?',
                  options: ['Digital Finance', 'Decentralized Finance', 'Distributed Fintech', 'Delegated Funds'],
                  answer: 1,
                  explanation: 'DeFi = Decentralized Finance — financial services built on blockchain without traditional intermediaries like banks.'
                },
                {
                  question: 'What is TVL in DeFi?',
                  options: ['Total Validator Logs', 'Total Value Locked — the total crypto deposited in DeFi protocols', 'Token Verification Level', 'Transaction Volume Limit'],
                  answer: 1,
                  explanation: 'TVL (Total Value Locked) measures how much capital is deposited in a DeFi protocol, indicating its adoption and trust.'
                }
              ]
            }
          },
          {
            title: 'Automated Market Makers (AMMs)',
            videoUrl: 'https://www.youtube.com/watch?v=1PbZMudPP5E',
            order: 2,
            quizzes: {
              create: [
                {
                  question: 'How does an AMM determine token prices?',
                  options: ['Order book matching', 'The constant product formula (x * y = k)', 'Admin sets prices', 'Oracle feeds only'],
                  answer: 1,
                  explanation: 'AMMs use the constant product formula where the product of two token reserves must remain constant, automatically adjusting prices based on supply and demand.'
                },
                {
                  question: 'What is impermanent loss?',
                  options: ['Losing your private key', 'The difference between holding tokens vs providing liquidity when prices change', 'Network downtime', 'Transaction failure'],
                  answer: 1,
                  explanation: 'Impermanent loss occurs when the price ratio of pooled tokens changes, making the LP position worth less than simply holding the tokens.'
                }
              ]
            }
          },
          {
            title: 'Raydium Deep Dive',
            videoUrl: 'https://www.youtube.com/watch?v=hQn02r_SPSY',
            order: 3,
            quizzes: {
              create: [
                {
                  question: 'What makes Raydium unique among Solana DEXs?',
                  options: ['It only supports SOL', 'It combines an AMM with a central limit order book (CLOB)', 'It\'s the cheapest', 'It doesn\'t charge fees'],
                  answer: 1,
                  explanation: 'Raydium is a hybrid AMM that also provides liquidity to Serum\'s central limit order book, offering better price discovery.'
                },
                {
                  question: 'What are concentrated liquidity pools?',
                  options: ['Pools with one token', 'Pools where LPs focus liquidity in specific price ranges for better efficiency', 'Pools for large institutions', 'Pools with high fees'],
                  answer: 1,
                  explanation: 'Concentrated liquidity lets LPs allocate capital to specific price ranges, earning more fees per dollar deposited.'
                }
              ]
            }
          },
          {
            title: 'Orca & Whirlpools',
            videoUrl: 'https://www.youtube.com/watch?v=AJoFGjJCxjU',
            order: 4,
            quizzes: {
              create: [
                {
                  question: 'What is Orca known for?',
                  options: ['Mining', 'User-friendly DEX experience and Whirlpools concentrated liquidity', 'Lending', 'NFTs'],
                  answer: 1,
                  explanation: 'Orca is known for its clean UX and Whirlpools — their concentrated liquidity product that offers capital efficiency.'
                },
                {
                  question: 'What does the Fair Price indicator on Orca show?',
                  options: ['The cheapest token', 'Whether your swap price is close to the market rate', 'Historical prices', 'Future predictions'],
                  answer: 1,
                  explanation: 'The Fair Price indicator compares your swap price against aggregated market rates, helping users avoid high slippage trades.'
                }
              ]
            }
          },
          {
            title: 'Lending & Borrowing',
            videoUrl: 'https://www.youtube.com/watch?v=aTp9er6S73M',
            order: 5,
            quizzes: {
              create: [
                {
                  question: 'How do DeFi lending protocols determine interest rates?',
                  options: ['Fixed by the company', 'Algorithmically based on supply and demand (utilization rate)', 'Voted by users', 'Set by Solana validators'],
                  answer: 1,
                  explanation: 'Interest rates in DeFi lending are determined algorithmically. When utilization is high (lots of borrowing), rates increase; when low, they decrease.'
                },
                {
                  question: 'What is collateralization in DeFi lending?',
                  options: ['Identity verification', 'Depositing assets worth more than what you borrow as security', 'A type of insurance', 'Smart contract auditing'],
                  answer: 1,
                  explanation: 'DeFi loans require over-collateralization — depositing more value than you borrow — since there\'s no credit checks or legal enforcement.'
                }
              ]
            }
          },
          {
            title: 'Liquidations Explained',
            videoUrl: 'https://www.youtube.com/watch?v=EWJCIXFL1cQ',
            order: 6,
            quizzes: {
              create: [
                {
                  question: 'When does a liquidation occur?',
                  options: ['When you sell tokens', 'When collateral value drops below the required ratio', 'When the protocol shuts down', 'When gas fees are high'],
                  answer: 1,
                  explanation: 'Liquidation happens when your collateral value falls below the minimum ratio, allowing liquidators to repay part of your debt in exchange for your collateral at a discount.'
                },
                {
                  question: 'Who performs liquidations?',
                  options: ['The protocol team', 'Third-party liquidator bots incentivized by a discount on seized collateral', 'Government regulators', 'The borrower'],
                  answer: 1,
                  explanation: 'Liquidations are performed by external bots/actors who monitor positions and are incentivized by a discount on the seized collateral.'
                }
              ]
            }
          },
          {
            title: 'Yield Farming Strategies',
            videoUrl: 'https://www.youtube.com/watch?v=ClnnLI1SClA',
            order: 7,
            quizzes: {
              create: [
                {
                  question: 'What is yield farming?',
                  options: ['Growing crops', 'Deploying capital across DeFi protocols to maximize returns', 'Staking SOL', 'Running a validator'],
                  answer: 1,
                  explanation: 'Yield farming involves strategically providing liquidity or lending across multiple protocols to maximize return on crypto assets.'
                },
                {
                  question: 'What is APY vs APR?',
                  options: ['Same thing', 'APY includes compound interest, APR does not', 'APR is always higher', 'APY is annual, APR is monthly'],
                  answer: 1,
                  explanation: 'APR (Annual Percentage Rate) is simple interest. APY (Annual Percentage Yield) includes the effect of compounding, so it\'s usually higher.'
                }
              ]
            }
          },
          {
            title: 'Flash Loans on Solana',
            videoUrl: 'https://www.youtube.com/watch?v=mCJUhnXQ76s',
            order: 8,
            quizzes: {
              create: [
                {
                  question: 'What is unique about flash loans?',
                  options: ['They are very fast', 'They require no collateral as long as borrowed funds are returned in the same transaction', 'They have zero fees', 'They are only for large amounts'],
                  answer: 1,
                  explanation: 'Flash loans are uncollateralized loans that must be borrowed and repaid within a single atomic transaction. If not repaid, the entire transaction reverts.'
                },
                {
                  question: 'What is a common use case for flash loans?',
                  options: ['Buying NFTs', 'Arbitrage — exploiting price differences across exchanges', 'Paying rent', 'Staking rewards'],
                  answer: 1,
                  explanation: 'Flash loans are commonly used for arbitrage, collateral swaps, and self-liquidation without needing upfront capital.'
                }
              ]
            }
          },
          {
            title: 'MEV on Solana',
            videoUrl: 'https://www.youtube.com/watch?v=MWwLxe0ePGU',
            order: 9,
            quizzes: {
              create: [
                {
                  question: 'What is MEV?',
                  options: ['Maximum Ethereum Value', 'Maximal Extractable Value — profit from reordering/inserting transactions', 'Mining Energy Value', 'Market Exchange Volume'],
                  answer: 1,
                  explanation: 'MEV (Maximal Extractable Value) is the profit validators or searchers can extract by strategically ordering transactions within a block.'
                },
                {
                  question: 'How does MEV differ on Solana vs Ethereum?',
                  options: ['No difference', 'Solana\'s continuous block production and parallel execution change MEV dynamics', 'Solana has no MEV', 'Ethereum has no MEV'],
                  answer: 1,
                  explanation: 'Solana\'s unique architecture with continuous block production and Sealevel parallel execution creates different MEV dynamics than Ethereum\'s discrete block auctions.'
                }
              ]
            }
          },
          {
            title: 'Building a DeFi Dashboard',
            videoUrl: 'https://www.youtube.com/watch?v=72MXA4-V7jA',
            order: 10,
            quizzes: {
              create: [
                {
                  question: 'What data should a DeFi dashboard display?',
                  options: ['Only token prices', 'Portfolio value, positions, yields, PnL, and transaction history', 'Just a wallet address', 'Only NFTs'],
                  answer: 1,
                  explanation: 'A comprehensive DeFi dashboard shows portfolio overview, active positions across protocols, current yields, profit/loss, and recent transactions.'
                },
                {
                  question: 'What is a portfolio tracker?',
                  options: ['A wallet app', 'A tool that aggregates and displays all your DeFi positions across multiple protocols', 'A trading bot', 'A blockchain explorer'],
                  answer: 1,
                  explanation: 'Portfolio trackers aggregate data across multiple DeFi protocols and wallets, giving users a unified view of their positions and performance.'
                }
              ]
            }
          }
        ]
      }
    }
  });
  console.log(`✅ Created course: ${course4.title}`);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Course 5: NFTs & Digital Assets — INTERMEDIATE, 120min
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const course5 = await prisma.course.create({
    data: {
      slug: 'nfts-digital-assets',
      title: 'NFTs & Digital Assets',
      description: 'Master NFTs on Solana. From Metaplex standards to Candy Machine, compressed NFTs, and building your own NFT marketplace.',
      thumbnail: '/images/courses/nfts-digital-assets.png',
      difficulty: 'INTERMEDIATE',
      category: 'NFTs',
      durationMins: 120,
      lessons: {
        create: [
          {
            title: 'NFT Fundamentals',
            videoUrl: 'https://www.youtube.com/watch?v=M3EFi_POhps',
            order: 1,
            quizzes: {
              create: [
                {
                  question: 'What makes an NFT "non-fungible"?',
                  options: ['It cannot be sold', 'Each token is unique and not interchangeable with another', 'It is free', 'It only works on Solana'],
                  answer: 1,
                  explanation: 'Non-fungible means each token is unique. Unlike SOL or USDC where each unit is identical, each NFT has unique properties.'
                },
                {
                  question: 'Where is NFT media typically stored?',
                  options: ['On the blockchain directly', 'Off-chain (IPFS, Arweave) with on-chain metadata pointing to it', 'On the user\'s computer', 'In a database'],
                  answer: 1,
                  explanation: 'Due to storage costs, NFT images/videos are stored off-chain (IPFS, Arweave) while the blockchain stores a URI pointing to the metadata.'
                }
              ]
            }
          },
          {
            title: 'Metaplex Token Standard',
            videoUrl: 'https://www.youtube.com/watch?v=cfOjYiOKANE',
            order: 2,
            quizzes: {
              create: [
                {
                  question: 'What is Metaplex?',
                  options: ['A Solana wallet', 'The leading NFT standard and tooling framework on Solana', 'A DEX', 'A validator'],
                  answer: 1,
                  explanation: 'Metaplex provides the standard protocols, tools, and SDKs for creating and managing NFTs on Solana.'
                },
                {
                  question: 'What does a Metaplex metadata account contain?',
                  options: ['Only the image', 'Name, symbol, URI, creators, royalties, and collection info', 'Just the price', 'Transaction history'],
                  answer: 1,
                  explanation: 'Metaplex metadata includes the NFT\'s name, symbol, URI to off-chain data, creator array, seller fee basis points, and collection verification.'
                }
              ]
            }
          },
          {
            title: 'Candy Machine V3',
            videoUrl: 'https://www.youtube.com/watch?v=b0HBPumkINc',
            order: 3,
            quizzes: {
              create: [
                {
                  question: 'What is a Candy Machine?',
                  options: ['A candy dispenser', 'Metaplex\'s program for launching NFT collections with configurable minting rules', 'A trading bot', 'A token minter'],
                  answer: 1,
                  explanation: 'Candy Machine is Metaplex\'s NFT minting program that handles collection launches with guards for payment, timing, allowlists, and more.'
                },
                {
                  question: 'What are Candy Machine Guards?',
                  options: ['Security personnel', 'Configurable rules that control who can mint, when, and how', 'NFT traits', 'Wallet limits'],
                  answer: 1,
                  explanation: 'Guards are modular conditions (payment, start date, token gating, allow lists, etc.) that must be satisfied before a user can mint from the Candy Machine.'
                }
              ]
            }
          },
          {
            title: 'Creating NFT Collections',
            videoUrl: 'https://www.youtube.com/watch?v=S7ZgRxeqRDY',
            order: 4,
            quizzes: {
              create: [
                {
                  question: 'What is a collection NFT?',
                  options: ['The most expensive NFT', 'A parent NFT that groups and verifies individual NFTs as part of a collection', 'A burned NFT', 'An airdropped NFT'],
                  answer: 1,
                  explanation: 'A collection NFT is a special NFT that serves as the verified parent, allowing wallets and marketplaces to group and verify collection membership.'
                },
                {
                  question: 'What is the Metaplex standard for royalties?',
                  options: ['No royalties', 'Seller Fee Basis Points (100 = 1%)', 'Fixed 10%', 'Buyer pays royalties'],
                  answer: 1,
                  explanation: 'Royalties are set as seller_fee_basis_points where 100 = 1%. These are enforced on marketplaces that support the standard.'
                }
              ]
            }
          },
          {
            title: 'Compressed NFTs (cNFTs)',
            videoUrl: 'https://www.youtube.com/watch?v=A_U1Nd41vPc',
            order: 5,
            quizzes: {
              create: [
                {
                  question: 'How do compressed NFTs reduce costs?',
                  options: ['Lower image quality', 'Using Merkle trees to store data off-chain with only the root hash on-chain', 'Fewer metadata fields', 'Using a different blockchain'],
                  answer: 1,
                  explanation: 'cNFTs use concurrent Merkle trees. Individual NFT data is stored off-chain by indexers, while only the tree\'s root hash is on-chain, reducing cost by ~1000x.'
                },
                {
                  question: 'What cost savings do cNFTs offer?',
                  options: ['10% cheaper', '50% cheaper', '~1000x cheaper than regular NFTs', 'Same cost'],
                  answer: 2,
                  explanation: 'Compressed NFTs can be minted for a fraction of a cent each, making it feasible to mint millions of NFTs for gaming, loyalty programs, and certificates.'
                }
              ]
            }
          },
          {
            title: 'Bubblegum Program',
            videoUrl: 'https://www.youtube.com/watch?v=Eni3MPSTi0c',
            order: 6,
            quizzes: {
              create: [
                {
                  question: 'What is Bubblegum?',
                  options: ['A candy', 'Metaplex\'s program for creating and managing compressed NFTs', 'A wallet', 'A DEX'],
                  answer: 1,
                  explanation: 'Bubblegum is the Metaplex program that handles minting, transferring, and managing compressed NFTs using state compression.'
                },
                {
                  question: 'What is needed to verify ownership of a compressed NFT?',
                  options: ['Just the wallet address', 'A Merkle proof from an indexer (like Helius DAS API)', 'The original image file', 'The creator\'s signature'],
                  answer: 1,
                  explanation: 'Since cNFT data is off-chain, verifying ownership requires a Merkle proof from an indexer that can reconstruct the path from the leaf to the on-chain root.'
                }
              ]
            }
          },
          {
            title: 'NFT Marketplaces Architecture',
            videoUrl: 'https://www.youtube.com/watch?v=w_4tDEKlcVc',
            order: 7,
            quizzes: {
              create: [
                {
                  question: 'How do NFT marketplace listings work on Solana?',
                  options: ['Sending NFT to the marketplace', 'Creating an escrow PDA or delegating authority to the marketplace program', 'Just setting a price in metadata', 'Email the marketplace team'],
                  answer: 1,
                  explanation: 'Listings typically work by either transferring the NFT to an escrow PDA or delegating transfer authority to the marketplace\'s program.'
                },
                {
                  question: 'What is Magic Eden?',
                  options: ['A game', 'The largest NFT marketplace on Solana', 'A wallet', 'A token'],
                  answer: 1,
                  explanation: 'Magic Eden is the dominant NFT marketplace on Solana, supporting regular and compressed NFTs with trading, auctions, and collection launches.'
                }
              ]
            }
          },
          {
            title: 'Building an NFT Minter dApp',
            videoUrl: 'https://www.youtube.com/watch?v=35RO9lAJOB8',
            order: 8,
            quizzes: {
              create: [
                {
                  question: 'What do you need to mint an NFT programmatically on Solana?',
                  options: ['Just a wallet', 'A mint account, metadata account, token account, and signed transaction', 'An email address', 'A domain name'],
                  answer: 1,
                  explanation: 'Minting requires creating a mint account (the NFT identity), a metadata account (Metaplex standard), and an associated token account for the recipient.'
                },
                {
                  question: 'What is the role of the update authority on an NFT?',
                  options: ['Can transfer anyone\'s NFT', 'Can modify the NFT\'s metadata (name, URI, etc.)', 'Can burn any NFT', 'Can set marketplace fees'],
                  answer: 1,
                  explanation: 'The update authority is the wallet/program that can change the NFT\'s on-chain metadata. It\'s typically the collection creator or a program PDA.'
                }
              ]
            }
          }
        ]
      }
    }
  });
  console.log(`✅ Created course: ${course5.title}`);

  console.log('\n🎉 Seed complete! Created 5 courses with 43 lessons and 86 quiz questions.');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
