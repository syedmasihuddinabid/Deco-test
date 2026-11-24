import { QuestionItem } from '../types/deco';

export const QUESTION_BANK: QuestionItem[] = [
  // ==================== UNIT I ====================
  {
    id: 'q-u1-saq-1',
    unit: 'unit1',
    category: 'SAQ',
    sourceLabel: 'Course File SAQ #1 · Unit I',
    co: 'CO1',
    btl: 'BTL 2',
    marks: 2,
    question: 'Give the basic operational concepts of a computer.',
    answerSummary:
      'A computer executes instructions fetched sequentially from main memory into the CPU using dedicated registers (PC, IR, MAR, MDR) coordinated by the Control Unit.',
    keyPoints: [
      'Program Counter (PC) holds the memory address of the next instruction to fetch.',
      'MAR receives the address and MDR transfers the instruction/data between memory and CPU.',
      'Instruction Register (IR) holds the current instruction while CU decodes it and ALU executes arithmetic/logic operations.',
    ],
    rtlOrSteps: ['MAR ← PC', 'MDR ← M[MAR], PC ← PC + 1', 'IR ← MDR (Decode & Execute)'],
    diagramType: 'von-neumann',
  },
  {
    id: 'q-u1-saq-2',
    unit: 'unit1',
    category: 'SAQ',
    sourceLabel: 'Course File SAQ #2 & #4 · Unit I',
    co: 'CO1',
    btl: 'BTL 2',
    marks: 2,
    question: 'State the difference between multiprocessors and multicomputers.',
    answerSummary:
      'Multiprocessors share a single common main memory space across multiple CPUs, whereas multicomputers consist of autonomous computers each with its own private local memory.',
    keyPoints: [
      'Multiprocessor: Tightly coupled, shared global memory, communicates via shared variables (e.g., multicore servers).',
      'Multicomputer: Loosely coupled, distributed private memory, communicates via message passing over a network (e.g., clusters).',
    ],
    table: {
      headers: ['Feature', 'Multiprocessor', 'Multicomputer'],
      rows: [
        ['Memory', 'Single shared global memory', 'Distributed local private memories'],
        ['Communication', 'Shared variables / bus', 'Message passing over interconnect'],
        ['Coupling', 'Tightly coupled', 'Loosely coupled / scalable'],
      ],
    },
  },
  {
    id: 'q-u1-saq-3',
    unit: 'unit1',
    category: 'SAQ',
    sourceLabel: 'Course File SAQ #3 · Unit I',
    co: 'CO1',
    btl: 'BTL 2',
    marks: 2,
    question: 'Write a short note on computer performance.',
    answerSummary:
      'Computer performance measures how quickly a system executes programs, governed by instruction count (N), cycles per instruction (S), and clock rate (R).',
    keyPoints: [
      'Basic performance equation: T = (N × S) / R.',
      'Throughput = tasks completed per unit time; Response time (latency) = time from start to finish of one task.',
      'Improved by reducing N (better compiler/ISA), lowering CPI (pipelining/cache), or raising clock frequency R.',
    ],
  },
  {
    id: 'q-u1-saq-4',
    unit: 'unit1',
    category: 'SAQ',
    sourceLabel: 'Course File SAQ #6 · Unit I',
    co: 'CO1',
    btl: 'BTL 1',
    marks: 2,
    question: 'Write a short note on the system bus.',
    answerSummary:
      'A system bus is a shared group of electrical lines connecting the CPU, main memory, and I/O modules, consisting of Data, Address, and Control buses.',
    keyPoints: [
      'Data Bus (bidirectional): Transfers actual data and instructions; width (e.g., 32/64 bits) sets word transfer rate.',
      'Address Bus (unidirectional): Carries memory/I/O addresses from CPU; n lines address 2^n locations.',
      'Control Bus: Carries timing and command signals such as MemRead, MemWrite, Clock, and Interrupt Request.',
    ],
  },
  {
    id: 'q-u1-saq-5',
    unit: 'unit1',
    category: 'SAQ',
    sourceLabel: 'Course File SAQ #7–#11 · Unit I',
    co: 'CO1',
    btl: 'BTL 3',
    marks: 2,
    question:
      'Solve Unit-I numericals: (a) 2’s complement of 1010111 and 11001101; (b) Convert (520)₁₀ to Hex & (480)₁₀ to Octal; (c) Gray 0011, 1011 to Binary; (d) Subtract +19 − 43 and 57 − 33.',
    answerSummary:
      'Use bit-inversion + 1 for 2’s complement, repeated base division for conversions, sequential MSB-to-LSB XOR for Gray-to-binary, and 8-bit 2’s complement addition for subtraction.',
    keyPoints: [
      '2’s complement of 1010111 = 0101000 + 1 = 0101001; of 11001101 = 00110010 + 1 = 00110011.',
      '(520)₁₀ = 2×256 + 0×16 + 8 = (208)₁₆; (480)₁₀ = 7×64 + 4×8 + 0 = (740)₈.',
      'Gray 0011 → Binary: 0, 0⊕0=0, 0⊕1=1, 1⊕1=0 → 0010₂. Gray 1011 → Binary: 1, 1⊕0=1, 1⊕1=0, 0⊕1=1 → 1101₂.',
      '+19 − 43 (8-bit): 00010011 + 11010101 = 11101000 (−24 in 2’s complement). 57 − 33 = 00111001 + 11011111 = (1) 00011000 (+24).',
    ],
  },
  {
    id: 'q-u1-laq-1',
    unit: 'unit1',
    category: 'LAQ',
    sourceLabel: 'Course File LAQ #1 & R20 Feb 2022 · Unit I',
    co: 'CO1',
    btl: 'BTL 2',
    marks: 12,
    question:
      '(a) Explain the basic structure of a computer (Von Neumann) with a neat block diagram and describe each functional unit. (b) Differentiate system software from application software.',
    answerSummary:
      'A digital computer comprises five functional units—Input, Memory, ALU, Control Unit, and Output—operating on the stored-program principle where instructions and data share a single memory space.',
    keyPoints: [
      'Input Unit: Accepts coded data/programs (keyboard, mouse, scanner) and converts them into binary.',
      'Memory Unit: Primary (fast volatile RAM + non-volatile boot ROM) holds active instructions/data; Secondary (SSD/HDD) provides bulk non-volatile storage.',
      'Arithmetic & Logic Unit (ALU): Executes arithmetic (+, −, ×, ÷) and logic (AND, OR, XOR, shifts) on operands loaded into processor registers.',
      'Control Unit (CU): Nerve center that fetches instructions via PC/IR and issues timed control signals across all units.',
      'Output Unit: Sends processed binary results to external devices (display, printer).',
      'System Software (OS, compilers, assemblers, device drivers) manages hardware resources; Application Software (CAD, browsers, DBMS) performs user-specific tasks.',
    ],
    diagramType: 'von-neumann',
  },
  {
    id: 'q-u1-assign-1',
    unit: 'unit1',
    category: 'ASSIGNMENT',
    sourceLabel: 'Assignment 1 & Quiz 01 · Unit I',
    co: 'CO1',
    btl: 'BTL 3',
    marks: 6,
    question:
      'Compare fixed-point and floating-point representations. Convert 13.625 and +12.5 into IEEE 754 single-precision (32-bit) format.',
    answerSummary:
      'Fixed-point fixes the radix point position (simple hardware, limited range), whereas IEEE 754 floating-point separates Sign, Biased Exponent, and Mantissa to represent very large and very small real numbers.',
    keyPoints: [
      '13.625₁₀ = 1101.101₂ = 1.101101₂ × 2³.',
      'For 13.625: Sign S = 0; Biased Exponent E = 3 + 127 = 130 = 10000010₂; Mantissa M = 10110100000000000000000.',
      '32-bit hex for 13.625: 0 10000010 10110100000000000000000 = 0x415A0000.',
      'For +12.5: 1100.1₂ = 1.1001₂ × 2³ → S=0, E=10000010, M=10010000000000000000000 (0x41480000).',
    ],
    table: {
      headers: ['Number', 'Normalized Binary', 'Sign (1b)', 'Exponent (8b, +127)', 'Mantissa (23b)'],
      rows: [
        ['13.625', '1.101101 × 2³', '0', '10000010 (130)', '10110100000000000000000'],
        ['+12.5', '1.1001 × 2³', '0', '10000010 (130)', '10010000000000000000000'],
      ],
    },
  },
  {
    id: 'q-u1-laq-7',
    unit: 'unit1',
    category: 'LAQ',
    sourceLabel: 'Course File LAQ #7 · Unit I',
    co: 'CO1',
    btl: 'BTL 3',
    marks: 12,
    question:
      'Convert the following numbers: (i) (7562.45)₁₀ to Octal, (ii) (1938.257)₁₀ to Hexadecimal, (iii) (175.175)₈ to Binary, (iv) (163.789)₁₆ to Octal, (v) (11001101.0101)₂ to Hexadecimal, (vi) (245.125)₈ to Binary.',
    answerSummary:
      'Convert integer parts by repeated division and fractional parts by repeated multiplication; convert between binary, octal (3-bit groups), and hex (4-bit groups) directly.',
    keyPoints: [
      '(i) (7562.45)₁₀ = (16612.3463...)₈ (7562÷8 remainders: 2,1,6,6,1; 0.45×8=3.6, 0.6×8=4.8, 0.8×8=6.4).',
      '(ii) (1938.257)₁₀ = (792.41CA...)₁₆ (1938÷16 = 7,9,2; 0.257×16 = 4.112, 0.112×16 = 1.792, 0.792×16 = 12.672 [C]).',
      '(iii) (175.175)₈ → 3 bits per digit → (001 111 101 . 001 111 101)₂ = (1111101.001111101)₂.',
      '(iv) (163.789)₁₆ → binary (0001 0110 0011 . 0111 1000 1001)₂ → regroup 3 bits → (543.3611)₈.',
      '(v) (11001101.0101)₂ → 4-bit groups → (CD.5)₁₆.',
      '(vi) (245.125)₈ → (010 100 101 . 001 010 101)₂ = (10100101.001010101)₂.',
    ],
  },

  // ==================== UNIT II ====================
  {
    id: 'q-u2-saq-1',
    unit: 'unit2',
    category: 'SAQ',
    sourceLabel: 'Course File SAQ #14 & #18 · Unit II',
    co: 'CO2',
    btl: 'BTL 2',
    marks: 2,
    question: 'What are universal gates? State De Morgan’s Theorem.',
    answerSummary:
      'NAND and NOR are universal gates because any Boolean expression (NOT, AND, OR, XOR) can be implemented using only NAND gates or only NOR gates.',
    keyPoints: [
      "De Morgan's First Law: (A·B)' = A' + B' (complement of product equals sum of complements).",
      "De Morgan's Second Law: (A + B)' = A'·B' (complement of sum equals product of complements).",
      'NAND as NOT: connect both inputs together (A·A)’ = A’; NAND followed by NAND-NOT gives AND.',
    ],
  },
  {
    id: 'q-u2-saq-2',
    unit: 'unit2',
    category: 'SAQ',
    sourceLabel: 'Course File SAQ #15 & #19 · Unit II',
    co: 'CO2',
    btl: 'BTL 2',
    marks: 2,
    question: 'Differentiate between (a) combinational and sequential circuits, and (b) latch and flip-flop.',
    answerSummary:
      'Combinational outputs depend solely on present inputs without memory, while sequential outputs depend on both present inputs and past stored state.',
    keyPoints: [
      'Combinational: No memory/feedback, no clock needed (Adders, MUX, Decoders).',
      'Sequential: Contains memory elements (flip-flops) and feedback, typically synchronized by clock (Counters, Shift Registers).',
      'Latch vs Flip-Flop: Latch is level-triggered (transparent while enable=1); Flip-Flop is edge-triggered (changes state only at rising or falling clock edge).',
    ],
  },
  {
    id: 'q-u2-st2',
    unit: 'unit2',
    category: 'SURPRISE_TEST',
    sourceLabel: 'Surprise Test 1 & 2 · Unit II',
    co: 'CO2',
    btl: 'BTL 3',
    marks: 3,
    question:
      '(a) Minimize F = Σm(1,2,7) and F = ΠM(0,1,4,6). (b) Design a 3-input (A,B,C) majority circuit giving X=1 when inputs have more 1s than 0s.',
    answerSummary:
      'Use 3-variable K-maps to simplify SOP/POS forms; for the 3-input majority detector, X = 1 whenever two or more inputs are 1 (minterms 3, 5, 6, 7).',
    keyPoints: [
      "F = Σm(1,2,7) = A'B'C + A'BC' + ABC (no adjacent pairs; minimal SOP).",
      "F = ΠM(0,1,4,6): 0-cells at 000, 001, 100, 110 → groups (0,1,4): B' + ... wait: (0,1) gives (A+B), (0,4) gives (B+C), (4,6) gives (A'+C) → F = (A+B)(B+C)(A'+C).",
      '3-input Majority X = Σm(3,5,6,7) = AB + BC + AC (identical to the Carry-out of a Full Adder!).',
    ],
  },
  {
    id: 'q-u2-laq-1',
    unit: 'unit2',
    category: 'CIE2_SOLVED',
    sourceLabel: 'CIE-2 LAQ #3 & Course File LAQ #10–11 · Unit II',
    co: 'CO2',
    btl: 'BTL 4',
    marks: 12,
    question:
      'Explain the working of a Half Adder, Full Adder, and 4-bit Arithmetic Binary Adder/Subtractor circuit with truth tables, Boolean equations, and neat diagram.',
    answerSummary:
      'A Full Adder adds three bits (A, B, Cin) to produce Sum and Cout. Cascading four Full Adders with XOR gates on each B input controlled by Mode M creates a 4-bit Adder/Subtractor.',
    keyPoints: [
      'Half Adder: Sum = A ⊕ B, Carry = A·B.',
      'Full Adder: Sum = A ⊕ B ⊕ Cin, Cout = A·B + Cin·(A ⊕ B).',
      'Mode M = 0 (ADD): B ⊕ 0 = B and C0 = 0, so output S = A + B.',
      'Mode M = 1 (SUBTRACT): B ⊕ 1 = B’ and C0 = 1, so output S = A + B’ + 1 = A − B (2’s complement).',
      'Signed Overflow Flag: V = C4 ⊕ C3.',
    ],
    workedExample:
      'A = 0101 (5), B = 0011 (3): For M=0 → 0101 + 0011 = 1000 (8, V=1 signed overflow). For M=1 → B⊕1 = 1100; 0101 + 1100 + 1 = (1) 0010 (+2, carry C4 discarded).',
    diagramType: 'adder-subtractor',
  },
  {
    id: 'q-u2-laq-2',
    unit: 'unit2',
    category: 'LAQ',
    sourceLabel: 'Course File LAQ #12 & #13 · Unit II',
    co: 'CO2',
    btl: 'BTL 5',
    marks: 12,
    question:
      'Explain the working of SR, D, and JK flip-flops with truth tables and characteristic equations, and design a 3-bit asynchronous ripple binary counter.',
    answerSummary:
      'Flip-flops are 1-bit edge-triggered storage elements. Connecting three negative-edge JK flip-flops (with J=K=1) in cascade forms a Mod-8 (000–111) 3-bit ripple counter.',
    keyPoints: [
      'SR FF: S=1,R=0 sets Q=1; S=0,R=1 resets Q=0; S=R=0 holds; S=R=1 is forbidden/indeterminate.',
      "D FF: Q(t+1) = D (eliminates forbidden state by feeding D' to R).",
      'JK FF: Resolves S=R=1 by toggling Q(t+1) = Q’(t). Master-Slave JK avoids race-around condition.',
      '3-bit Asynchronous Counter: Clock drives FF0 (Q0); Q0 drives clock of FF1 (Q1); Q1 drives clock of FF2 (Q2). Counts 000 through 111.',
    ],
    table: {
      headers: ['Flip-Flop', 'Inputs', 'Next State Q(t+1)', 'Characteristic / Key Rule'],
      rows: [
        ['SR', 'S, R', '0,1→0 | 1,0→1 | 0,0→Q | 1,1→Invalid', "Q(t+1) = S + R'Q (SR=0)"],
        ['D', 'D', '0→0 | 1→1', 'Q(t+1) = D (Data / Delay FF)'],
        ['JK', 'J, K', "0,0→Q | 0,1→0 | 1,0→1 | 1,1→Q'", "Q(t+1) = JQ' + K'Q"],
        ['T', 'T', "0→Q | 1→Q'", 'Q(t+1) = T ⊕ Q (Toggle FF)'],
      ],
    },
  },

  // ==================== UNIT III ====================
  {
    id: 'q-u3-saq-1',
    unit: 'unit3',
    category: 'CIE2_SOLVED',
    sourceLabel: 'CIE-2 SAQ #1 · Unit III',
    co: 'CO3',
    btl: 'BTL 3',
    marks: 2,
    question: 'Give two examples of arithmetic machine instructions.',
    answerSummary:
      'Arithmetic machine instructions command the ALU to perform operations like addition, subtraction, multiplication, division, increment, or decrement on register/memory operands.',
    keyPoints: [
      'ADD A, B → RTL: A ← A + B (e.g., A=5, B=3 yields A=8).',
      'SUB R1, R2 → RTL: R1 ← R1 − R2 (e.g., R1=9, R2=4 yields R1=5).',
      'INC R1 / MUL / DIV → RTL: R1 ← R1 + 1 (e.g., R1=7 yields R1=8).',
    ],
    table: {
      headers: ['Instruction', 'Meaning (RTL)', 'Example'],
      rows: [
        ['ADD A, B', 'A ← A + B', 'A = 5, B = 3 → A = 8'],
        ['SUB R1, R2', 'R1 ← R1 − R2', 'R1 = 9, R2 = 4 → R1 = 5'],
        ['INC R1', 'R1 ← R1 + 1', 'R1 = 7 → R1 = 8'],
      ],
    },
  },
  {
    id: 'q-u3-saq-2',
    unit: 'unit3',
    category: 'CIE2_SOLVED',
    sourceLabel: 'CIE-2 SAQ #2 · Unit III',
    co: 'CO3',
    btl: 'BTL 1',
    marks: 2,
    question: 'What is the function of LOAD and STORE instructions?',
    answerSummary:
      'LOAD and STORE are data-transfer instructions—the only instructions in load/store architectures that move data between Main Memory and CPU Registers.',
    keyPoints: [
      'LOAD copies data from a memory address into a CPU register: LOAD R1, 5000 ⇒ R1 ← M[5000].',
      'STORE writes a CPU register value back to main memory: STORE R1, 6000 ⇒ M[6000] ← R1.',
      'Example C = A + B: LOAD R1, A; LOAD R2, B; ADD R3, R1, R2; STORE R3, C.',
    ],
  },
  {
    id: 'q-u3-saq-3',
    unit: 'unit3',
    category: 'CIE2_SOLVED',
    sourceLabel: 'CIE-2 SAQ #3 · Unit III',
    co: 'CO3',
    btl: 'BTL 1',
    marks: 2,
    question: 'What is Register Transfer Language (RTL)?',
    answerSummary:
      'RTL is a symbolic notation describing micro-operations (data transfers and ALU/shift processing) performed on register contents in one clock pulse, specifying what is done and where the result goes.',
    keyPoints: [
      'Registers are written in uppercase (R1, PC, AR); arrow ← indicates transfer.',
      'Conditional transfer: T1: R2 ← R1 (executes only when control signal T1 = 1).',
      'Memory read/write notation: R1 ← M[AR] and M[AR] ← R1.',
    ],
  },
  {
    id: 'q-u3-laq-rtl',
    unit: 'unit3',
    category: 'CIE2_SOLVED',
    sourceLabel: 'CIE-2 LAQ #1 & Assignment 2 Q4 · Unit III',
    co: 'CO3',
    btl: 'BTL 3',
    marks: 12,
    question:
      'What is RTL? Explain the various types of micro-operations (Register Transfer, Arithmetic, Logic, Shift) with examples and common bus diagram.',
    answerSummary:
      'RTL formally represents elementary micro-operations completed in a single clock cycle across registers connected via a common bus or ALU.',
    keyPoints: [
      'Register Transfer: R2 ← R1, AR ← PC, DR ← M[AR], M[AR] ← R1.',
      'Arithmetic Micro-operations: Add (R3 ← R1 + R2), Subtract via 2’s comp (R3 ← R1 + R2’ + 1), Increment (R1 ← R1 + 1), Decrement (R1 ← R1 − 1).',
      'Logic Micro-operations (bitwise): AND (R3 ← R1 ∧ R2 to mask/clear), OR (R3 ← R1 ∨ R2 to set), XOR (R3 ← R1 ⊕ R2 to toggle), NOT (R1 ← R1’).',
      'Shift Micro-operations on R=1011: shl→0110 (×2), shr→0101, ashr→1101 (preserves sign bit, ÷2), cil→0111, cir→1101.',
    ],
    table: {
      headers: ['Shift Type (R = 1011)', 'Before', 'After', 'Rule'],
      rows: [
        ['Logical shift left (shl)', '1011', '0110', '0 enters LSB; MSB lost'],
        ['Logical shift right (shr)', '1011', '0101', '0 enters MSB; LSB lost'],
        ['Arithmetic shift right (ashr)', '1011', '1101', 'Sign bit preserved (-5 → -3)'],
        ['Circular shift left (cil)', '1011', '0111', 'MSB wraps into LSB'],
        ['Circular shift right (cir)', '1011', '1101', 'LSB wraps into MSB'],
      ],
    },
    diagramType: 'rtl-bus',
  },
  {
    id: 'q-u3-laq-mcu',
    unit: 'unit3',
    category: 'CIE2_SOLVED',
    sourceLabel: 'CIE-2 LAQ #2 & Course File LAQ #17–18 · Unit III',
    co: 'CO3',
    btl: 'BTL 4',
    marks: 12,
    question:
      'What is microprogrammed control? Explain its structure and working with control memory, 20-bit microinstruction format, and address sequencing.',
    answerSummary:
      'A microprogrammed control unit stores microinstructions in a Control Memory (ROM). Each machine instruction executes a micro-routine fetched via CAR and CDR, offering high flexibility at slightly lower speed than hardwired control.',
    keyPoints: [
      'Control Memory (ROM): Permanently holds all microprograms (fetch, execute, interrupt routines).',
      'CAR (Control Address Register): Holds address of next microinstruction; CDR (Microinstruction Register) holds current 20-bit word.',
      '20-bit Format: F1 (3b) | F2 (3b) | F3 (3b) | CD (2b condition) | BR (2b branch) | AD (7b branch address).',
      'Address Sequencing (MUX): (1) Increment CAR+1, (2) Unconditional branch CAR←AD, (3) Conditional branch if CD true, (4) Opcode mapping CAR ← 0 | opcode | 00, (5) Subroutine call/return via SBR.',
      'Hardwired vs Microprogrammed: Hardwired uses fixed logic gates (very fast, hard to modify); Microprogrammed uses ROM (easy to update ISA, slower due to ROM read).',
    ],
    rtlOrSteps: [
      'Fetch Routine (addr 64): AR ← PC',
      'DR ← M[AR], PC ← PC + 1',
      'IR ← DR, CAR ← Mapping(IR opcode) (e.g., opcode 0010 → addr 8)',
    ],
    diagramType: 'microprogrammed-cu',
  },
  {
    id: 'q-u3-assign2-div',
    unit: 'unit3',
    category: 'ASSIGNMENT',
    sourceLabel: 'Assignment 2 Q1 & Course File LAQ #14 · Unit III',
    co: 'CO3',
    btl: 'BTL 3',
    marks: 12,
    question:
      'Draw and explain the Restoring Division Algorithm and Booth’s Multiplication Algorithm with hardware block diagrams and examples.',
    answerSummary:
      'Binary division uses repeated shift-left and subtract (restoring A on negative result), whereas Booth’s algorithm multiplies signed 2’s complement numbers by recoding bit pairs (Q_0, Q_{-1}).',
    keyPoints: [
      'Restoring Division Init: A = 0 (n+1 bits), Q = Dividend (n bits), M = Divisor, Counter = n.',
      'Step 1: Shift left (A, Q) by 1 bit; Step 2: Subtract A = A − M.',
      'Step 3: If A < 0, set Q0 = 0 and Restore A = A + M; Else set Q0 = 1.',
      'Decrement n until n = 0; final Q = Quotient, A = Remainder (e.g., 7 ÷ 3 → Q = 2, A = 1).',
      'Non-Restoring Division avoids the restore step by performing A + M after shifting if A < 0.',
    ],
    diagramType: 'restoring-division',
  },
  {
    id: 'q-u3-pyq-isa',
    unit: 'unit3',
    category: 'PYQ',
    sourceLabel: 'R18 Jul 2021, R15 Feb 2021 & Course File LAQ #15 · Unit III',
    co: 'CO3',
    btl: 'BTL 4',
    marks: 14,
    question:
      'Explain various instruction formats (3, 2, 1, 0-address) by evaluating X = (A + B) * (C + D), and explain CPU addressing modes with examples.',
    answerSummary:
      'Instruction formats differ by the number of explicit operand addresses per instruction; addressing modes specify how the Effective Address (EA) of an operand is calculated.',
    keyPoints: [
      '3-Address: ADD R1, A, B; ADD R2, C, D; MUL X, R1, R2 (short code, long instructions).',
      '2-Address: MOV R1, A; ADD R1, B; MOV R2, C; ADD R2, D; MUL R1, R2; MOV X, R1.',
      '1-Address (Accumulator AC): LOAD A; ADD B; STORE T; LOAD C; ADD D; MUL T; STORE X.',
      '0-Address (Stack): PUSH A; PUSH B; ADD; PUSH C; PUSH D; ADD; MUL; POP X.',
      'Addressing Modes: Immediate (#5, EA in instruction), Direct (EA = Addr), Indirect (EA = M[Addr]), Register (operand in Rn), Register Indirect (EA = Rn), Indexed (EA = Addr + XR), Relative (EA = PC + Offset).',
    ],
  },

  // ==================== UNIT IV ====================
  {
    id: 'q-u4-saq-dma',
    unit: 'unit4',
    category: 'CIE2_SOLVED',
    sourceLabel: 'CIE-2 SAQ #4 & Assignment 2 Q5 · Unit IV',
    co: 'CO4',
    btl: 'BTL 3',
    marks: 12,
    question: 'What is Direct Memory Access (DMA)? Explain its controller registers, handshake signals, transfer modes, and significance.',
    answerSummary:
      'DMA lets high-speed peripherals transfer blocks of data directly to/from main memory via a DMA Controller (DMAC) without routing every word through the CPU.',
    keyPoints: [
      'DMAC Registers: Address Register (start RAM address, auto-incremented), Word Count Register (words remaining, decremented), Control Register (R/W direction & mode).',
      'Handshake: Device sends DMA Request → DMAC sends Bus Request (BR/HOLD) to CPU → CPU finishes current cycle, tri-states buses, sends Bus Grant (BG/HLDA) → DMAC transfers block → sends Interrupt at Word Count = 0.',
      'Transfer Modes: Burst/Block (entire block at once), Cycle Stealing (1 word per bus cycle), Transparent (only when CPU is idle).',
      'Significance: Frees CPU for parallel computation and eliminates per-word interrupt overhead.',
    ],
    diagramType: 'dma',
  },
  {
    id: 'q-u4-saq-ramrom',
    unit: 'unit4',
    category: 'CIE2_SOLVED',
    sourceLabel: 'CIE-2 SAQ #5 & #6 · Unit IV',
    co: 'CO4',
    btl: 'BTL 2',
    marks: 2,
    question: 'Define RAM and ROM (with differences) and explain why Cache Memory is important.',
    answerSummary:
      'RAM is volatile read/write primary memory for active programs (SRAM/DRAM), whereas ROM is non-volatile permanent memory (BIOS/firmware). Cache (fast SRAM) bridges the CPU–DRAM speed gap.',
    keyPoints: [
      'RAM vs ROM: RAM (volatile, read/write, fast, holds OS/apps) vs ROM (non-volatile, mainly read, holds boot firmware).',
      'Cache exploits temporal locality (recently accessed items) and spatial locality (nearby addresses).',
      'Effective access time: t_eff = h·t_c + (1 − h)·t_m. Example: h=0.95, t_c=10 ns, t_m=100 ns → t_eff = 14.5 ns.',
    ],
    table: {
      headers: ['Feature', 'RAM', 'ROM'],
      rows: [
        ['Volatility', 'Volatile (lost on power-off)', 'Non-volatile (retains data)'],
        ['Operations', 'Read and Write', 'Mainly Read (PROM/EPROM/EEPROM)'],
        ['Primary Use', 'Running programs & data', 'BIOS, boot firmware'],
      ],
    },
  },
  {
    id: 'q-u4-laq-io',
    unit: 'unit4',
    category: 'CIE2_SOLVED',
    sourceLabel: 'CIE-2 LAQ #4 & Assignment 2 Q2 · Unit IV',
    co: 'CO4',
    btl: 'BTL 3',
    marks: 12,
    question:
      'Explain the organization and functioning of Input/Output systems, I/O interface structure, Isolated vs. Memory-Mapped I/O, and Modes of Transfer.',
    answerSummary:
      'Peripherals connect to the CPU and memory via an I/O Interface attached to a shared I/O bus to resolve speed, format, and electrical mismatches.',
    keyPoints: [
      'I/O Interface Functions: Address decoding, Data buffering/speed matching, Status reporting (READY/BUSY/ERROR), Format conversion (serial↔parallel), Interrupt generation.',
      'Isolated I/O: Separate I/O address space using dedicated IN/OUT instructions and IO/M’ line.',
      'Memory-Mapped I/O: Device registers share RAM address space; CPU uses standard LOAD/STORE instructions.',
      'Modes of Transfer: (1) Programmed I/O (CPU polls READY bit—busy waiting), (2) Interrupt-Driven I/O (device interrupts CPU via ISR; priority via Daisy-Chain or Parallel Priority), (3) DMA (DMAC moves blocks directly).',
    ],
    diagramType: 'io-organization',
  },
  {
    id: 'q-u4-laq-mem',
    unit: 'unit4',
    category: 'CIE2_SOLVED',
    sourceLabel: 'CIE-2 LAQ #5 & Assignment 2 Q3 · Unit IV',
    co: 'CO4',
    btl: 'BTL 4',
    marks: 12,
    question:
      'What is memory hierarchy? Explain its levels, characteristics, and why it is important in computer system design.',
    answerSummary:
      'Memory hierarchy arranges storage into five tiers from fastest/smallest/costliest (Registers, Cache) to slowest/largest/cheapest (RAM, SSD/HDD, Tape) to achieve the illusion of large, fast, low-cost memory.',
    keyPoints: [
      'Registers (<1 ns, Flip-flops, Bytes–KB) → Cache SRAM (1–10 ns, KB–MB) → Main DRAM (50–100 ns, GB) → Secondary SSD/HDD (0.1–10 ms, TB) → Backup Tape/Optical (seconds).',
      'Moving down the hierarchy: Access time ↑, Capacity ↑, Cost per bit ↓.',
      'Operates efficiently due to Principle of Locality (Temporal & Spatial).',
    ],
    table: {
      headers: ['Level', 'Technology', 'Typical Access Time', 'Typical Size'],
      rows: [
        ['Registers', 'Flip-flops', '< 1 ns', 'Bytes – KB'],
        ['Cache (L1/L2/L3)', 'SRAM', '1 – 10 ns', 'KB – MB'],
        ['Main Memory', 'DRAM', '50 – 100 ns', 'GB'],
        ['Secondary', 'SSD / Magnetic Disk', '0.1 ms / 5–10 ms', '100s GB – TB'],
        ['Backup', 'Magnetic Tape / Optical', 'Seconds', 'TB+'],
      ],
    },
    diagramType: 'memory-hierarchy',
  },
  {
    id: 'q-u4-laq-cache',
    unit: 'unit4',
    category: 'CIE2_SOLVED',
    sourceLabel: 'CIE-2 LAQ #6 & R20 Feb 2022 · Unit IV',
    co: 'CO4',
    btl: 'BTL 5',
    marks: 12,
    question:
      'Explain the need for cache memory mapping and describe Direct, Associative, and Set-Associative mapping in detail with bit-splitting example.',
    answerSummary:
      'Because cache has far fewer lines than main memory blocks, mapping functions determine block placement and hit/miss tag comparison.',
    keyPoints: [
      'Example System: 64K-word Main Memory (16-bit address), Block = 16 words (4,096 blocks), Cache = 128 lines.',
      'Direct Mapping: Block j maps to line (j mod 128). Address = Tag (5) + Index (7) + Word (4). Needs 1 comparator; lowest cost, higher conflict misses.',
      'Associative Mapping: Any block fits in any line. Address = Tag (12) + Word (4). Compares all 128 tags in parallel (CAM); highest hit ratio, expensive hardware.',
      '2-Way Set-Associative: 128 lines ÷ 2 = 64 sets. Block j maps to set (j mod 64), placed in either Way 0 or Way 1. Address = Tag (6) + Set (6) + Word (4). Needs k=2 comparators; balances cost and conflict misses.',
    ],
    table: {
      headers: ['Feature', 'Direct', 'Associative', 'k-Way Set-Associative'],
      rows: [
        ['Placement', 'Exactly 1 fixed line', 'Any cache line', 'Any line inside 1 mapped set'],
        ['Comparators', '1', 'All cache lines', 'k (ways per set)'],
        ['Conflict Misses', 'High', 'Zero', 'Low'],
        ['Hardware Cost', 'Low', 'High (CAM)', 'Moderate'],
      ],
    },
    diagramType: 'cache-mapping',
  },
  {
    id: 'q-u4-pyq-fifo',
    unit: 'unit4',
    category: 'PYQ',
    sourceLabel: 'R18 Oct 2020 & R15 May 2019 · Unit IV',
    co: 'CO4',
    btl: 'BTL 5',
    marks: 10,
    question:
      '(a) Explain Write-Through vs. Write-Back cache policies. (b) Solve numerical: Cache access time = 10 ns, Miss penalty = 150 ns, Miss rate = 0.12 (or Memory 64K×16, Cache 1K, Block 4 words direct mapping).',
    answerSummary:
      'Write-through updates cache and RAM simultaneously; write-back updates RAM only when a dirty block is evicted. Effective access time and address fields follow exact logarithmic splits.',
    keyPoints: [
      'Write-Through: Always keeps RAM consistent (simple, more bus writes). Write-Back: Sets dirty bit and writes to RAM only on replacement (faster writes).',
      'Access Time Numerical: Hit rate h = 1 − 0.12 = 0.88. T_avg = t_c + (miss_rate × miss_penalty) = 10 + 0.12 × 150 = 28 ns.',
      '64K Memory, 1K Direct Cache, Block=4 words: Address = 16 bits; Word = log2(4) = 2 bits; Index = log2(1024/4) = log2(256) = 8 bits; Tag = 16 − 8 − 2 = 6 bits. Cache holds 256 blocks.',
    ],
  },

  // ==================== UNIT V ====================
  {
    id: 'q-u5-saq-risc',
    unit: 'unit5',
    category: 'CIE2_SOLVED',
    sourceLabel: 'CIE-2 SAQ #7 & Surprise Test 4 · Unit V',
    co: 'CO5',
    btl: 'BTL 3',
    marks: 12,
    question: 'Define RISC and CISC. Compare RISC and CISC architectures in detail.',
    answerSummary:
      'RISC emphasizes simple, fixed-length, single-cycle instructions with hardwired control and Load/Store memory access, whereas CISC uses complex variable-length microprogrammed instructions.',
    keyPoints: [
      'RISC (ARM, MIPS, RISC-V): Fixed-length instructions, large register file, Load/Store only, hardwired control, highly efficient pipelining.',
      'CISC (Intel x86, VAX): Variable-length instructions, memory-to-memory operations, many addressing modes, microprogrammed control, compact code size.',
    ],
    table: {
      headers: ['Feature', 'RISC', 'CISC'],
      rows: [
        ['Instruction Set', 'Small, simple, fixed-length', 'Large, complex, variable-length'],
        ['Execution', 'Mostly 1 instruction per clock', 'Multi-cycle, many clocks'],
        ['Control Unit', 'Hardwired (fast)', 'Microprogrammed (ROM)'],
        ['Memory Access', 'Only LOAD / STORE', 'Any instruction can access memory'],
        ['Registers', 'Large general-purpose file', 'Fewer registers'],
        ['Pipelining', 'Easy and high efficiency', 'Complex / stalls'],
        ['Examples', 'ARM, MIPS, RISC-V', 'Intel x86, VAX'],
      ],
    },
  },
  {
    id: 'q-u5-laq-pipe',
    unit: 'unit5',
    category: 'CIE2_SOLVED',
    sourceLabel: 'CIE-2 LAQ #7 & Course File LAQ #27 · Unit V',
    co: 'CO5',
    btl: 'BTL 3',
    marks: 12,
    question:
      'Explain the basic concept of pipelining. How does it improve performance? Illustrate with a 4-stage space-time diagram and numerical example.',
    answerSummary:
      'Pipelining overlaps execution stages (IF, ID, EX, WB) across multiple instructions so throughput approaches 1 completed instruction per clock cycle.',
    keyPoints: [
      'Increases instruction throughput without reducing the latency of a single individual instruction.',
      'Cycles for n instructions in k stages: T_pipe = k + n − 1 (vs non-pipelined n·k).',
      'Speedup formula: S = (n·k) / (k + n − 1), approaching ideal S = k as n → ∞.',
      'Numerical: k=4, n=100, clock=10 ns → Non-pipelined = 400 cycles (4000 ns); Pipelined = 4 + 99 = 103 cycles (1030 ns); Speedup = 400/103 ≈ 3.88.',
    ],
    diagramType: 'pipeline-4stage',
  },
  {
    id: 'q-u5-laq-datapath',
    unit: 'unit5',
    category: 'CIE2_SOLVED',
    sourceLabel: 'CIE-2 LAQ #8 & Surprise Test 4 Q3 · Unit V',
    co: 'CO5',
    btl: 'BTL 4',
    marks: 12,
    question:
      'Explain datapath and control considerations in a 5-stage pipelined processor and discuss Superscalar operation.',
    answerSummary:
      'Inserting pipeline registers (IF/ID, ID/EX, EX/MEM, MEM/WB) isolates stages and carries operands, destination register numbers, and decoded control signals forward each clock cycle.',
    keyPoints: [
      'Separate Instruction Memory (I-Cache) and Data Memory (D-Cache) prevent structural hazards during simultaneous IF and MEM.',
      'Control signals are decoded once in ID and propagated through registers: EX (RegDst, ALUOp, ALUSrc), MEM (Branch, MemRead, MemWrite), WB (RegWrite, MemtoReg).',
      'Forwarding Unit checks EX/MEM and MEM/WB destination registers against ID/EX source registers to bypass ALU inputs.',
      'Hazard Detection Unit holds PC & IF/ID and injects a bubble for load-use hazards; Branch flush/prediction handles control hazards.',
      'Superscalar Operation: Duplicates fetch/decode/execution pipelines to issue and complete multiple independent instructions per clock cycle (ILP).',
    ],
    diagramType: 'pipeline-datapath',
  },
  {
    id: 'q-u5-laq-hazards',
    unit: 'unit5',
    category: 'CIE2_SOLVED',
    sourceLabel: 'CIE-2 LAQ #9, SAQ #9 & Course File LAQ #26 · Unit V',
    co: 'CO5',
    btl: 'BTL 4',
    marks: 12,
    question:
      'Explain pipeline hazards (Data Hazards: RAW/WAR/WAW, Control & Structural Hazards). What are their causes and how can they be eliminated?',
    answerSummary:
      'Hazards prevent the next instruction from executing in its designated clock cycle; they are resolved via stalling, data forwarding (bypassing), compiler scheduling, register renaming, and branch prediction.',
    keyPoints: [
      'RAW (Read After Write — True Dependency): ADD R1,R2,R3 followed by SUB R4,R1,R5. Without forwarding requires 2 stall cycles; with EX/MEM forwarding executes with 0 stalls!',
      'Load-Use Hazard: LW R1,0(R2) followed by ADD R4,R1,R5. Memory data is ready only after MEM stage, so even with forwarding 1 stall cycle is mandatory (unless compiler reorders an independent instruction in between).',
      'WAR (Anti-dependency) & WAW (Output dependency): Occur only in out-of-order / multicycle pipelines; eliminated via Register Renaming.',
      'Control (Instruction) Hazards: Caused by branch/jump uncertainty; mitigated via Branch Target Buffer (BTB), Static/Dynamic Branch Prediction, or Delayed Branch.',
    ],
    table: {
      headers: ['Hazard Type', 'Meaning', 'Example', 'Resolution'],
      rows: [
        ['RAW (True)', 'Read before earlier write finishes', 'ADD R1,R2,R3 ; SUB R4,R1,R5', 'Data forwarding / Stalls / Scheduling'],
        ['Load-Use', 'ALU needs LW result immediately', 'LW R1,0(R2) ; ADD R4,R1,R5', 'Forwarding + 1 Stall / Reordering'],
        ['WAR (Anti)', 'Write before earlier read finishes', 'SUB R4,R1,R5 ; ADD R1,R2,R3', 'Register renaming (OoO CPUs)'],
        ['Control', 'Branch target/outcome unknown', 'BEQ R1,R2,TARGET', 'Branch prediction / Flush / Delay slot'],
      ],
    },
    diagramType: 'raw-hazard',
  },

  // ==================== BEYOND SYLLABUS GAPS ====================
  {
    id: 'q-gap-1',
    unit: 'gaps',
    category: 'ASSIGNMENT',
    sourceLabel: 'Faculty Gap Topics #1–#2 · CO2 Extension',
    co: 'CO2',
    btl: 'BTL 4',
    marks: 6,
    question:
      'Design and explain (a) Half Subtractor & Full Subtractor, and (b) 1-bit & 2-bit Magnitude Comparator.',
    answerSummary:
      'Subtractors compute binary Difference and Borrow bits, while Magnitude Comparators evaluate whether A > B, A = B, or A < B.',
    keyPoints: [
      "Half Subtractor: D = A ⊕ B, Borrow Bout = A'·B.",
      "Full Subtractor: D = A ⊕ B ⊕ Bin, Borrow Bout = A'·B + Bin·(A ⊕ B)'.",
      "1-bit Comparator: (A=B) = (A ⊕ B)' [XNOR]; (A>B) = A·B'; (A<B) = A'·B.",
      '2-bit Comparator (A1A0 vs B1B0): A=B when x1·x0=1 (where xi = Ai ⊙ Bi); A>B = A1B1’ + x1·A0B0’; A<B = A1’B1 + x1·A0’B0.',
    ],
  },
  {
    id: 'q-gap-2',
    unit: 'gaps',
    category: 'ASSIGNMENT',
    sourceLabel: 'Faculty Gap Topics #3–#5 & Course File SAQ #12 · CO2 Extension',
    co: 'CO2',
    btl: 'BTL 3',
    marks: 6,
    question:
      'Compare Encoder, Decoder, Multiplexer (MUX), and Demultiplexer (DEMUX) with truth equations and real-world applications.',
    answerSummary:
      'MUX selects 1 of 2^n inputs using n select lines; DEMUX distributes 1 input to 1 of 2^n outputs; Encoders compress 2^n lines to n bits; Decoders expand n bits to 2^n active minterms.',
    keyPoints: [
      '4:1 MUX: Y = S1’S0’I0 + S1’S0I1 + S1S0’I2 + S1S0I3. Applications: Data routing, parallel-to-serial conversion, implementing Boolean functions.',
      '1:4 DEMUX: Routes data D to Y0..Y3 based on S1,S0 (equivalent to 2:4 Decoder with Enable = D). Applications: Serial-to-parallel, communication demultiplexing.',
      '8:3 Priority Encoder: Converts highest active input D7..D0 into 3-bit binary (e.g., keyboard encoding, interrupt priority controller).',
    ],
    table: {
      headers: ['Device', 'Inputs → Outputs', 'Control / Select Lines', 'Primary Application'],
      rows: [
        ['Multiplexer (MUX)', '2^n data → 1 out', 'n select lines', 'Data selector, Boolean function gen'],
        ['Demultiplexer (DEMUX)', '1 data → 2^n out', 'n select lines', 'Data distributor, serial-to-parallel'],
        ['Encoder', '2^n active → n bit code', 'Priority logic (optional)', 'Keypad / Interrupt prioritization'],
        ['Decoder', 'n bit code → 2^n lines', 'Enable (E)', 'Memory address decoding, 7-seg'],
      ],
    },
  },
];
