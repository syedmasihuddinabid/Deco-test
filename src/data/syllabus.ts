import { CourseUnit, ResourceFile } from '../types/deco';

export const COURSE_META = {
  code: 'U24EC304',
  title: 'Digital Electronics & Computer Organization',
  shortTitle: 'DECO',
  institution: 'Lords Institute of Engineering & Technology (UGC Autonomous)',
  department: 'Departments of CSM & AIML · B.E. III Semester',
  academicYear: 'A.Y. 2026–2027',
  faculty: 'Dr. Abdul Mateen Ahmed',
  credits: 3,
  ltp: '3-0-0 (5 Contact Hrs/Wk)',
  cieMarks: 40,
  seeMarks: 60,
  totalMarks: 100,
  examDuration: '3 Hours',
};

export const COURSE_UNITS: CourseUnit[] = [
  {
    id: 'unit1',
    shortLabel: 'Unit I',
    title: 'Basic Structure of Computers & Data Representation',
    co: 'C31.1',
    btl: 'BTL 3 (Apply)',
    coDescription:
      'Illustrate the functional organization and operational concepts of a digital computer, and perform number system conversions and binary arithmetic operations.',
    examWeight: 'High Priority · Foundation & Numericals',
    topics: [
      {
        id: 'u1-t1',
        title: 'Functional Units & Von Neumann Architecture',
        btl: 'BTL 2',
        lectures: 'L1–L3',
        keyTakeaway:
          'Five core units: Input, Memory, ALU, Control Unit (CU), and Output. Stored-program concept holds both instructions and data in a single memory space, causing the CPU–memory bus bottleneck.',
      },
      {
        id: 'u1-t2',
        title: 'Basic Operational Concepts, Registers & Bus Structures',
        btl: 'BTL 3',
        lectures: 'L4',
        keyTakeaway:
          'Key processor registers: PC (next instruction address), IR (current instruction), MAR (memory address), MDR (memory data), Accumulator/General Registers. System bus = Data + Address + Control lines.',
      },
      {
        id: 'u1-t3',
        title: 'Software, Performance, Multiprocessors & Multicomputers',
        btl: 'BTL 3',
        lectures: 'L4–L5',
        keyTakeaway:
          'Performance equation: T = (N × S) / R (Processor Time = Instructions × CPI / Clock Rate). Multiprocessors share global memory; multicomputers have distributed private memories communicating via messages.',
      },
      {
        id: 'u1-t4',
        title: 'Number Base Conversions (Binary, Octal, Decimal, Hex)',
        btl: 'BTL 2',
        lectures: 'L8–L10',
        keyTakeaway:
          'Repeated division by base for integers; repeated multiplication by base for fractions. Group 3 bits for Octal (8 = 2³) and 4 bits for Hexadecimal (16 = 2⁴).',
      },
      {
        id: 'u1-t5',
        title: 'Fixed-Point, Signed Numbers & 1’s/2’s Complements',
        btl: 'BTL 3',
        lectures: 'L6, L11–L13',
        keyTakeaway:
          '2’s complement = 1’s complement + 1; gives unique zero and covers [-2^(n-1), +2^(n-1) - 1]. Subtraction A − B is computed as A + (2’s complement of B).',
      },
      {
        id: 'u1-t6',
        title: 'IEEE 754 Floating-Point Representation',
        btl: 'BTL 3',
        lectures: 'L7',
        keyTakeaway:
          'Single precision (32-bit): 1-bit Sign (S), 8-bit Biased Exponent (E = true exp + 127), 23-bit Normalized Mantissa (1.M).',
      },
      {
        id: 'u1-t7',
        title: 'Binary Codes (BCD 8421, Excess-3, Gray, Parity & Hamming)',
        btl: 'BTL 3',
        lectures: 'L13–L15',
        keyTakeaway:
          'BCD encodes each decimal digit in 4 bits; Excess-3 adds 0011 (self-complementing); Gray changes only 1 bit per step (G_msb = B_msb, G_i = B_{i+1} ⊕ B_i); Hamming adds parity bits at 2^k positions for error correction.',
      },
    ],
    formulas: [
      {
        label: 'CPU Execution Time',
        expression: 'T = (N × S) / R',
        note: 'N = machine instructions executed, S = avg clock cycles/instruction (CPI), R = clock rate (Hz)',
      },
      {
        label: 'IEEE 754 Single Precision',
        expression: '(-1)^S × (1.M)_2 × 2^(E - 127)',
        note: '32 bits total: 1 Sign bit + 8 Exponent bits (bias 127) + 23 Fraction bits',
      },
      {
        label: 'Binary to Gray Conversion',
        expression: 'G_n = B_n ; G_i = B_{i+1} ⊕ B_i',
        note: 'Preserve MSB, then XOR adjacent binary bits moving right',
      },
      {
        label: '2’s Complement Range (n bits)',
        expression: '[-2^(n-1), +2^(n-1) - 1]',
        note: '8-bit range: -128 to +127 (unique representation of 0)',
      },
    ],
    revisionChecklist: [
      'Draw Von Neumann diagram with CU, ALU, Registers, Cache, Bus Bottleneck & Main Memory',
      'Convert decimal with fractional parts (e.g., 163.875 or 13.625) to Binary, Octal, Hex & IEEE 754',
      'Compute +19 − 43 and 57 − 33 using 8-bit 2’s complement arithmetic',
      'Convert between Binary and Gray code without errors (e.g., 110101₂ → Gray, 1011_Gray → Binary)',
    ],
    diagrams: [
      {
        src: '/assets/aistudio/DECO1_1cb5244a.JPG',
        caption: 'Von Neumann Architecture & CPU–Memory Bus Bottleneck (Course Reference)',
        alt: 'Von Neumann Architecture diagram showing CPU, Control Unit, ALU, Registers, Cache, Bus Bottleneck, and Main Memory',
      },
    ],
  },
  {
    id: 'unit2',
    shortLabel: 'Unit II',
    title: 'Switching Theory & Digital Logic Circuits',
    co: 'C31.2',
    btl: 'BTL 6 (Create)',
    coDescription:
      'Simplify Boolean expressions using algebraic techniques and Karnaugh maps, and design combinational and sequential logic circuits.',
    examWeight: 'High Priority · K-Maps, Adders & Flip-Flops',
    topics: [
      {
        id: 'u2-t1',
        title: 'Boolean Algebra Laws, Duality & De Morgan’s Theorems',
        btl: 'BTL 2',
        lectures: 'L16–L17',
        keyTakeaway:
          'De Morgan: (A·B)’ = A’ + B’ and (A + B)’ = A’·B’. Absorption: A + A·B = A; Redundant literal rule: A + A’·B = A + B.',
      },
      {
        id: 'u2-t2',
        title: 'Basic, Derived & Universal Logic Gates (NAND / NOR)',
        btl: 'BTL 3',
        lectures: 'L18–L19',
        keyTakeaway:
          'NAND and NOR are universal because any Boolean function (NOT, AND, OR, XOR) can be built solely using NANDs or solely using NORs.',
      },
      {
        id: 'u2-t3',
        title: 'Canonical SOP/POS & Karnaugh Maps (2, 3, 4 Variables)',
        btl: 'BTL 4',
        lectures: 'L20–L22',
        keyTakeaway:
          'SOP sums minterms (Σm where output = 1); POS multiplies maxterms (ΠM where output = 0). Group powers of 2 (1, 2, 4, 8, 16) in Gray-coded K-map cells including Don’t Cares (d).',
      },
      {
        id: 'u2-t4',
        title: 'Combinational Circuits: Half Adder, Full Adder & 4-bit Adder-Subtractor',
        btl: 'BTL 4',
        lectures: 'L23–L24',
        keyTakeaway:
          'Half Adder: S = A ⊕ B, C = AB. Full Adder: S = A ⊕ B ⊕ Cin, Cout = AB + Cin(A ⊕ B). 4-bit Adder-Subtractor uses XOR gates controlled by Mode M (M=0 Add, M=1 Subtract).',
      },
      {
        id: 'u2-t5',
        title: 'Sequential Circuits: SR, D, JK & T Flip-Flops',
        btl: 'BTL 5',
        lectures: 'L26',
        keyTakeaway:
          'Latches are level-triggered; Flip-flops are edge-triggered. JK resolves SR=11 invalid state by toggling (Q’); Master-Slave JK prevents race-around condition.',
      },
      {
        id: 'u2-t6',
        title: 'Registers, Shift Registers, Binary Counters & Decoders',
        btl: 'BTL 4',
        lectures: 'L26–L28',
        keyTakeaway:
          'Shift modes: SISO, SIPO, PISO, PIPO. Asynchronous (ripple) counters clock each FF from previous output; synchronous counters share one clock. n-to-2^n Decoders activate 1 of 2^n minterm lines.',
      },
    ],
    formulas: [
      {
        label: 'De Morgan’s Laws',
        expression: "(A·B)' = A' + B'   |   (A + B)' = A'·B'",
        note: 'Break the bar and change the operator (AND ↔ OR)',
      },
      {
        label: 'Full Adder Equations',
        expression: 'Sum = A ⊕ B ⊕ C_in   |   C_out = AB + C_in(A ⊕ B)',
        note: 'Built using two Half Adders + one OR gate',
      },
      {
        label: 'JK Characteristic Equation',
        expression: "Q(t+1) = J·Q' + K'·Q",
        note: 'J=K=0 holds; J=K=1 toggles; J=1,K=0 sets; J=0,K=1 resets',
      },
      {
        label: 'Signed Overflow (4-bit Adder)',
        expression: 'V = C_4 ⊕ C_3',
        note: 'Carry into MSB differs from Carry out of MSB',
      },
    ],
    revisionChecklist: [
      'Derive NOT, AND, OR, and XOR using only NAND gates and only NOR gates',
      'Minimize 4-variable SOP/POS expressions with Don’t Care conditions via K-Map',
      'Draw Half Adder, Full Adder, and 4-bit Binary Adder-Subtractor with XOR Mode M',
      'Write truth & excitation tables for SR, D, JK, T flip-flops and 3-bit Ripple Counter',
    ],
    diagrams: [
      {
        src: '/assets/aistudio/andornot_8662986d.JPG',
        caption: 'Logic Gate Symbols: AND, OR, NOT, and NAND',
        alt: 'Logic gate schematic symbols for AND, OR, NOT, and NAND gates',
      },
      {
        src: '/assets/aistudio/Nandand_Nor_54c707f9.JPG',
        caption: 'AND, NAND, OR & NOR Functional Comparison',
        alt: 'Comparison chart showing AND, NAND, OR, and NOR symbols and logic rules',
      },
      {
        src: '/assets/aistudio/Xor_b0f26fef.JPG',
        caption: 'XOR & XNOR Gate Logic Rules',
        alt: 'XOR and XNOR gate symbols with truth behavior',
      },
    ],
  },
  {
    id: 'unit3',
    shortLabel: 'Unit III',
    title: 'Computer Arithmetic & Basic Processing Unit',
    co: 'C31.3 & C31.4',
    btl: 'BTL 4 (Analyze)',
    coDescription:
      'Apply binary arithmetic algorithms for multiplication and division, analyze instruction formats and addressing modes, formulate RTL micro-operations, and analyze microprogrammed control.',
    examWeight: 'CIE-2 Core · Algorithms, RTL & Control Unit',
    topics: [
      {
        id: 'u3-t1',
        title: 'Multiplication Algorithms (Shift-Add & Booth’s Algorithm)',
        btl: 'BTL 3',
        lectures: 'L29–L30',
        keyTakeaway:
          'Booth’s handles signed 2’s complement numbers by inspecting (Q_0, Q_{-1}): 00/11 → shift only; 10 → A = A − M then shift; 01 → A = A + M then shift (arithmetic right shift).',
      },
      {
        id: 'u3-t2',
        title: 'Division Algorithms (Restoring & Non-Restoring)',
        btl: 'BTL 4',
        lectures: 'L30',
        keyTakeaway:
          'Restoring: Shift left (A,Q), A = A − M. If A < 0, Q_0 = 0 and restore A = A + M; else Q_0 = 1. Repeat n times. Final Q = Quotient, A = Remainder.',
      },
      {
        id: 'u3-t3',
        title: 'Instruction Set Formats (3, 2, 1, 0-Address) & Addressing Modes',
        btl: 'BTL 4',
        lectures: 'L31–L32',
        keyTakeaway:
          'LOAD/STORE move data between Memory and Registers. Addressing modes: Immediate (EA in instruction), Direct (EA = addr), Indirect (EA = M[addr]), Register, Register Indirect, Indexed (EA = addr + XR), Relative (EA = PC + offset).',
      },
      {
        id: 'u3-t4',
        title: 'Register Transfer Language (RTL) & Micro-operations',
        btl: 'BTL 4',
        lectures: 'L36–L38',
        keyTakeaway:
          'Symbolic notation for clock-edge register operations: T: R2 ← R1. Four classes: Register Transfer, Arithmetic (+, −, +1, −1, 2’s comp), Logic (∧, ∨, ⊕, ’), Shift (shl, shr, ashr, cil, cir).',
      },
      {
        id: 'u3-t5',
        title: 'Microprogrammed Control, Control Memory & Address Sequencing',
        btl: 'BTL 4',
        lectures: 'L39–L41',
        keyTakeaway:
          'Generates control signals from ROM (Control Memory) via CAR, CDR, Sequencer, and SBR. 20-bit microinstruction: F1(3) | F2(3) | F3(3) | CD(2) | BR(2) | AD(7). Address sequencing: CAR+1, Unconditional/Conditional branch, Opcode mapping (0|opcode|00), SBR call/return.',
      },
    ],
    formulas: [
      {
        label: 'Booth’s Recoding Rule (Q_0, Q_{-1})',
        expression: '00,11: Shift  |  10: A←A−M, Shift  |  01: A←A+M, Shift',
        note: 'Arithmetic Shift Right (ashr) preserves sign bit of A',
      },
      {
        label: '20-bit Microinstruction Format',
        expression: 'F1 (3) | F2 (3) | F3 (3) | CD (2) | BR (2) | AD (7)',
        note: 'F1–F3: micro-ops, CD: condition bits, BR: branch type, AD: branch address',
      },
      {
        label: 'Fetch Routine RTL Sequence',
        expression: 'AR ← PC ;  DR ← M[AR], PC ← PC+1 ;  IR ← DR',
        note: 'Followed by CAR ← Mapping(IR opcode)',
      },
    ],
    revisionChecklist: [
      'Trace Restoring Division for 7 ÷ 3 (4-bit) and Booth’s Multiplication for (+7) × (−3)',
      'Evaluate X = (A+B)*(C+D) using 3-address, 2-address, 1-address (AC), and 0-address (Stack)',
      'Draw Common Bus RTL diagram and show shl, shr, ashr, cil, cir on 1011',
      'Draw Microprogrammed Control Unit (CAR, ROM, CDR, MUX, SBR, Mapping Logic)',
    ],
  },
  {
    id: 'unit4',
    shortLabel: 'Unit IV',
    title: 'Input/Output & Memory Organization',
    co: 'C31.5',
    btl: 'BTL 5 (Evaluate)',
    coDescription:
      'Analyze input-output data transfer mechanisms and evaluate memory hierarchy, cache mapping techniques, and storage systems.',
    examWeight: 'CIE-2 Core · DMA, Memory Hierarchy & Cache Mapping',
    topics: [
      {
        id: 'u4-t1',
        title: 'Peripheral Devices, I/O Interface & Addressing',
        btl: 'BTL 3',
        lectures: 'L42–L43',
        keyTakeaway:
          'I/O interface bridges speed/format mismatch using Data, Status, and Control registers + Address Decoder. Isolated I/O uses separate IN/OUT instructions; Memory-mapped I/O shares memory addresses (LOAD/STORE).',
      },
      {
        id: 'u4-t2',
        title: 'Asynchronous vs. Synchronous Data Transfer',
        btl: 'BTL 3',
        lectures: 'L44',
        keyTakeaway:
          'Synchronous shares a common clock. Asynchronous uses strobe pulses or two-wire handshaking (Data Valid / Data Accepted) for independent timing.',
      },
      {
        id: 'u4-t3',
        title: 'Modes of Transfer, Priority Interrupts & Direct Memory Access (DMA)',
        btl: 'BTL 4',
        lectures: 'L45–L46',
        keyTakeaway:
          'Programmed I/O polls status (CPU busy). Interrupt-driven uses ISR (Daisy-chain/Priority). DMA uses DMAC (Address, Word Count, Control registers) with BR/HOLD & BG/HLDA to transfer blocks directly between I/O and Memory (Burst, Cycle-stealing, Transparent).',
      },
      {
        id: 'u4-t4',
        title: 'Memory Hierarchy, RAM (SRAM/DRAM) & ROM Types',
        btl: 'BTL 3',
        lectures: 'L48–L49',
        keyTakeaway:
          'Registers (<1 ns) → Cache SRAM (1–10 ns) → Main DRAM (50–100 ns) → SSD/HDD → Tape. Going down: capacity increases, access time increases, cost/bit decreases. Works via temporal & spatial locality.',
      },
      {
        id: 'u4-t5',
        title: 'Cache Mapping (Direct, Associative, Set-Associative) & Write Policies',
        btl: 'BTL 5',
        lectures: 'L50–L53',
        keyTakeaway:
          'Direct: Tag | Index | Word (1 comparator). Associative: Tag | Word (all-line parallel comparators). k-way Set-Associative: Tag | Set | Word (k comparators). Write-through updates RAM immediately; Write-back uses dirty bit.',
      },
      {
        id: 'u4-t6',
        title: 'Virtual Memory, Page Faults & Secondary Storage',
        btl: 'BTL 4',
        lectures: 'L51',
        keyTakeaway:
          'Virtual memory maps large virtual addresses to physical frames via Page Table / TLB. Page fault triggers replacement policies (FIFO, LRU, Optimal).',
      },
    ],
    formulas: [
      {
        label: 'Effective Memory Access Time',
        expression: 't_eff = h·t_c + (1 − h)·t_m',
        note: 'With h = 0.95, t_c = 10 ns, t_m = 100 ns → t_eff = 14.5 ns',
      },
      {
        label: 'Direct Mapping Address Split',
        expression: 'Tag = log2(M/C)  |  Index = log2(Lines)  |  Word = log2(Block)',
        note: 'For 64K memory, 16-word blocks, 128 cache lines: Tag(5) + Index(7) + Word(4) = 16 bits',
      },
      {
        label: 'Set-Associative Address Split (k-way)',
        expression: 'Sets = Lines / k   →   Set bits = log2(Sets)',
        note: 'For 128 lines, 2-way (64 sets): Tag(6) + Set(6) + Word(4) = 16 bits',
      },
    ],
    revisionChecklist: [
      'Draw DMA Controller block diagram showing BR/HOLD, BG/HLDA, Address, Word Count & Control registers',
      'Compare Programmed I/O, Interrupt-driven I/O, and DMA transfer modes',
      'Draw Memory Hierarchy pyramid and calculate t_eff given hit ratio h, t_c, and t_m',
      'Split a 16-bit memory address into Tag/Set/Word for Direct, Associative, and 2-way Set-Associative mapping',
    ],
  },
  {
    id: 'unit5',
    shortLabel: 'Unit V',
    title: 'Pipelining & RISC / CISC Architectures',
    co: 'C31.6',
    btl: 'BTL 4 (Analyze)',
    coDescription:
      'Differentiate between RISC and CISC architectures and analyze pipelining concepts, pipeline hazards, and superscalar execution.',
    examWeight: 'CIE-2 Core · Hazards, Forwarding & Speedup',
    topics: [
      {
        id: 'u5-t1',
        title: 'RISC vs. CISC Characteristics & Design Philosophy',
        btl: 'BTL 3',
        lectures: 'L56–L58',
        keyTakeaway:
          'RISC: small fixed-length instructions, single-cycle execution, hardwired control, load/store memory access, large register file, easy pipelining (ARM, MIPS, RISC-V). CISC: variable-length complex instructions, microprogrammed control, memory-to-memory ops (x86, VAX).',
      },
      {
        id: 'u5-t2',
        title: 'Pipelining Basics, Speedup & Throughput',
        btl: 'BTL 3',
        lectures: 'L59',
        keyTakeaway:
          'Overlaps k instruction stages (IF, ID, EX, MEM, WB) separated by pipeline registers. Increases throughput (~1 instruction/clock) while individual instruction latency stays unchanged.',
      },
      {
        id: 'u5-t3',
        title: 'Data Hazards (RAW, WAR, WAW) & Resolution',
        btl: 'BTL 4',
        lectures: 'L60',
        keyTakeaway:
          'RAW (true dependency) is resolved by stalling (bubbles), data forwarding/bypassing (EX/MEM → ALU, MEM/WB → ALU), and compiler instruction scheduling. Load-use hazard requires 1 stall even with forwarding.',
      },
      {
        id: 'u5-t4',
        title: 'Structural & Control (Instruction) Hazards',
        btl: 'BTL 4',
        lectures: 'L60',
        keyTakeaway:
          'Structural hazards arise from shared memory/ALU (fixed by separate I-cache & D-cache). Control hazards arise on branches (outcome known in EX/MEM), mitigated via pipeline flush, branch prediction, or delayed branch.',
      },
      {
        id: 'u5-t5',
        title: 'Datapath & Control Considerations & Superscalar Operation',
        btl: 'BTL 4',
        lectures: 'L61–L62',
        keyTakeaway:
          'Pipeline registers (IF/ID, ID/EX, EX/MEM, MEM/WB) pass data and control signals (EX/MEM/WB) forward each cycle. Superscalar processors issue multiple instructions per clock using parallel execution pipelines (ILP).',
      },
    ],
    formulas: [
      {
        label: 'Pipelined Execution Cycles',
        expression: 'T_pipe = k + (n − 1) clock cycles',
        note: 'k = number of stages, n = number of instructions (non-pipelined = n·k)',
      },
      {
        label: 'Pipeline Speedup',
        expression: 'S = (n · k) / (k + n − 1)   →   S_max = k',
        note: 'For k=4, n=100: S = 400 / 103 ≈ 3.88 (approaches 4 as n → ∞)',
      },
    ],
    revisionChecklist: [
      'Compare RISC and CISC across 8+ architectural parameters (Control, Registers, ISA, Pipelining)',
      'Draw 4-stage and 5-stage space-time pipeline diagrams and compute Speedup S',
      'Trace RAW hazard with 2 stalls vs. Data Forwarding vs. Load-Use 1 stall',
      'Draw 5-stage Pipelined Datapath showing IF/ID, ID/EX, EX/MEM, MEM/WB & forwarding/control lines',
    ],
  },
  {
    id: 'gaps',
    shortLabel: 'Beyond Syllabus',
    title: 'Faculty-Identified Gaps (CO2 Combinational Modules)',
    co: 'C31.2',
    btl: 'BTL 3–4 (Design)',
    coDescription:
      'Essential combinational building blocks covered in corrective extension lectures and asked in viva, assignments, and exams.',
    examWeight: 'Bonus & Viva Focus · 5 Core Combinational Circuits',
    topics: [
      {
        id: 'gap-1',
        title: 'Gap 1: Half & Full Subtractor',
        btl: 'BTL 3',
        keyTakeaway:
          'Half Subtractor (A − B): Difference D = A ⊕ B, Borrow B_out = A’·B. Full Subtractor (A − B − B_in): D = A ⊕ B ⊕ B_in, B_out = A’B + B_in(A ⊕ B)’. Implemented directly in arithmetic circuits.',
      },
      {
        id: 'gap-2',
        title: 'Gap 2: Magnitude Comparator (1-bit & 2-bit / 4-bit IC 7485)',
        btl: 'BTL 4',
        keyTakeaway:
          'Compares two binary numbers A and B to assert A > B, A = B, or A < B. For 1-bit: (A=B) = A ⊙ B (XNOR), (A>B) = A·B’, (A<B) = A’·B.',
      },
      {
        id: 'gap-3',
        title: 'Gap 3: Encoder & Priority Encoder',
        btl: 'BTL 3',
        keyTakeaway:
          'Converts 2^n active input lines into an n-bit binary code (e.g., 8-to-3 octal-to-binary encoder or keypad). Priority encoder resolves multiple simultaneous active inputs by outputting the highest-priority index.',
      },
      {
        id: 'gap-4',
        title: 'Gap 4: Multiplexer (MUX — Data Selector)',
        btl: 'BTL 3',
        keyTakeaway:
          'Selects 1 of 2^n input lines onto a single output using n select lines (e.g., 4:1 MUX, 8:1 MUX). Also acts as a universal combinational logic implementer without external gates.',
      },
      {
        id: 'gap-5',
        title: 'Gap 5: Demultiplexer (DEMUX — Data Distributor)',
        btl: 'BTL 3',
        keyTakeaway:
          'Routes a single data input to 1 of 2^n output lines chosen by n select lines. Inverse of MUX; functionally equivalent to a Decoder with an Enable line acting as the data input.',
      },
    ],
    formulas: [
      {
        label: 'Half & Full Subtractor',
        expression: "HS: D = A ⊕ B, Bout = A'B   |   FS: D = A ⊕ B ⊕ Bin, Bout = A'B + Bin(A ⊕ B)'",
        note: 'Compare with Adder: only the A term is complemented in Borrow logic',
      },
      {
        label: '1-Bit Magnitude Comparator',
        expression: "(A>B) = A·B'   |   (A=B) = (A ⊕ B)'   |   (A<B) = A'·B",
        note: 'Uses XNOR for equality and AND+NOT for greater/less comparison',
      },
      {
        label: '4:1 Multiplexer Output',
        expression: "Y = S1'S0'·I0 + S1'S0·I1 + S1S0'·I2 + S1S0·I3",
        note: '2^n data inputs controlled by n select lines',
      },
    ],
    revisionChecklist: [
      'Derive Half Subtractor & Full Subtractor truth tables and K-maps',
      'Compare Multiplexer (2^n → 1) vs. Demultiplexer (1 → 2^n) vs. Encoder vs. Decoder',
      'Design a 2-bit Magnitude Comparator with A>B, A=B, A<B outputs',
    ],
  },
];

export const RESOURCE_FILES: ResourceFile[] = [
  {
    id: 'res-course-file',
    title: 'Complete DECO Course File (CSM-A 2026)',
    filename: 'Course_File_DECO_CSM_A_2026_27ef2295',
    path: '/assets/aistudio/Course_File_DECO_CSM_A_2026_27ef2295',
    category: 'Syllabus & Course File',
    unit: 'all',
    description: 'Lesson plan, CO–PO/PSO matrix, beyond-syllabus gaps, 42 SAQs, 30 LAQs, and 60 unit quiz Q&As.',
    fileType: 'TXT',
  },
  {
    id: 'res-syllabus',
    title: 'Official DECO U24EC304 Syllabus & Textbooks',
    filename: 'Syllabus_DECO_ee3286af.pdf',
    path: '/assets/aistudio/Syllabus_DECO_ee3286af.pdf',
    category: 'Syllabus & Course File',
    unit: 'all',
    description: 'Autonomous curriculum syllabus, CIE/SEE split, course objectives, and textbook/web references.',
    fileType: 'PDF',
  },
  {
    id: 'res-cie2-ans',
    title: 'CIE-2 Question Bank: Complete Worked Answers',
    filename: 'DECO_CIE2_QB_Answers_17549ffc.pdf',
    path: '/assets/aistudio/DECO_CIE2_QB_Answers_17549ffc.pdf',
    category: 'Question Banks & Solutions',
    unit: 'unit3',
    description: 'Full diagrams and worked solutions for 9 SAQs and 9 LAQs covering Units III, IV, and V.',
    fileType: 'PDF',
  },
  {
    id: 'res-cie2-sol',
    title: 'CIE-2 Student Question Bank Solutions',
    filename: 'DECO_CIE-2_QB_for_students_Solutions_57c90199.pdf',
    path: '/assets/aistudio/DECO_CIE-2_QB_for_students_Solutions_57c90199.pdf',
    category: 'Question Banks & Solutions',
    unit: 'unit3',
    description: 'Student revision edition of CIE-2 Question Bank solutions.',
    fileType: 'PDF',
  },
  {
    id: 'res-pyq',
    title: 'Previous University Question Papers (R20 / R18 / R17 / R15)',
    filename: 'COMPUTER_ORGANIZATION_Question_papers_bb45a08d.pdf',
    path: '/assets/aistudio/COMPUTER_ORGANIZATION_Question_papers_bb45a08d.pdf',
    category: 'Question Banks & Solutions',
    unit: 'all',
    description: '10+ past end-semester Computer Organization examination papers for pattern & numerical practice.',
    fileType: 'PDF',
  },
  {
    id: 'res-assign2-ans',
    title: 'Assignment 2 Complete Worked Answers',
    filename: 'DECO_Assignment2_Answers_fc616205.pdf',
    path: '/assets/aistudio/DECO_Assignment2_Answers_fc616205.pdf',
    category: 'Assignments & Surprise Tests',
    unit: 'unit3',
    description: 'Worked solutions with block diagrams for Restoring Division, I/O, Memory Hierarchy, RTL, and DMA.',
    fileType: 'PDF',
  },
  {
    id: 'res-assign2-q',
    title: 'Assignment 2 Question Sheet',
    filename: 'Assignment2_DECO_65fb0213.pdf',
    path: '/assets/aistudio/Assignment2_DECO_65fb0213.pdf',
    category: 'Assignments & Surprise Tests',
    unit: 'unit3',
    description: 'Official Assignment 2 prompt sheet for Units III & IV.',
    fileType: 'PDF',
  },
  {
    id: 'res-assign1',
    title: 'Assignment 1 — Unit I Problem Set',
    filename: 'DECO_Ast_Unit1_6057c128.pdf',
    path: '/assets/aistudio/DECO_Ast_Unit1_6057c128.pdf',
    category: 'Assignments & Surprise Tests',
    unit: 'unit1',
    description: '40-point Unit I assignment covering functional units, IEEE 754 (13.625), complements, and 8086.',
    fileType: 'PDF',
  },
  {
    id: 'res-quiz01',
    title: 'Quiz 01: Unit I Assessment Paper',
    filename: 'QUIZ_01_4ed421c8.pdf',
    path: '/assets/aistudio/QUIZ_01_4ed421c8.pdf',
    category: 'Assignments & Surprise Tests',
    unit: 'unit1',
    description: '20-mark Quiz 01 with MCQs, SAQs, True/False, IEEE 754 LAQ, and Gray code bonus.',
    fileType: 'PDF',
  },
  {
    id: 'res-st1',
    title: 'Surprise Test 1 & Assignment 1 (CO1/CO2)',
    filename: 'Srt2_7b0b30b4.pdf',
    path: '/assets/aistudio/Srt2_7b0b30b4.pdf',
    category: 'Assignments & Surprise Tests',
    unit: 'unit2',
    description: 'Gates, SOP/POS K-Map minterms/maxterms, 3-input majority circuit, and Full Adder.',
    fileType: 'PDF',
  },
  {
    id: 'res-st2',
    title: 'Surprise Test 2 (Boolean Logic & Full Adder)',
    filename: 'Surprise_Test_2_2c0fd452.pdf',
    path: '/assets/aistudio/Surprise_Test_2_2c0fd452.pdf',
    category: 'Assignments & Surprise Tests',
    unit: 'unit2',
    description: 'Official 10-mark Surprise Test 2 paper for CO2.',
    fileType: 'PDF',
  },
  {
    id: 'res-st4',
    title: 'Surprise Test 4 (Unit V: RISC/CISC & Pipelining)',
    filename: 'Surprise_Test_4__e0adcd71.pdf',
    path: '/assets/aistudio/Surprise_Test_4__e0adcd71.pdf',
    category: 'Assignments & Surprise Tests',
    unit: 'unit5',
    description: 'Official 10-mark Surprise Test 4 covering RISC vs CISC, Pipeline Hazards, Datapath, and Superscalar.',
    fileType: 'PDF',
  },
  {
    id: 'res-u1-datarep',
    title: 'Unit I Notes: Data Representation & Codes',
    filename: 'DECO_U1_Datarep_54befef6.pdf',
    path: '/assets/aistudio/DECO_U1_Datarep_54befef6.pdf',
    category: 'Unit Lecture Notes',
    unit: 'unit1',
    description: 'Lecture deck on number systems, complements, fixed/floating point, and binary codes.',
    fileType: 'PDF',
  },
  {
    id: 'res-u1-perf',
    title: 'Unit I Notes: Software & Performance',
    filename: 'U1_Software_and_Performance_6ca54e4e.pdf',
    path: '/assets/aistudio/U1_Software_and_Performance_6ca54e4e.pdf',
    category: 'Unit Lecture Notes',
    unit: 'unit1',
    description: 'Lecture slides on system software, performance equation, and multiprocessors vs multicomputers.',
    fileType: 'PDF',
  },
  {
    id: 'res-u2-notes',
    title: 'Unit II Notes: Switching Theory & Digital Logic',
    filename: 'DECO_U2_01Aug25_68c3a4f5.pdf',
    path: '/assets/aistudio/DECO_U2_01Aug25_68c3a4f5.pdf',
    category: 'Unit Lecture Notes',
    unit: 'unit2',
    description: 'Boolean algebra, K-Maps, combinational circuits, and sequential flip-flops/counters.',
    fileType: 'PDF',
  },
  {
    id: 'res-u2-sop',
    title: 'Unit II Slides: Boolean Algebra, SOP & POS',
    filename: 'Chap_02_P1_Boolean_Algebra_SOP_POS_d23c84de.pdf',
    path: '/assets/aistudio/Chap_02_P1_Boolean_Algebra_SOP_POS_d23c84de.pdf',
    category: 'Unit Lecture Notes',
    unit: 'unit2',
    description: 'Detailed walkthrough of canonical SOP/POS conversion and minimization.',
    fileType: 'PDF',
  },
  {
    id: 'res-u3-notes',
    title: 'Unit III Notes: Computer Arithmetic & Control',
    filename: 'Deco_Unit3_6b7fc3f1.pdf',
    path: '/assets/aistudio/Deco_Unit3_6b7fc3f1.pdf',
    category: 'Unit Lecture Notes',
    unit: 'unit3',
    description: 'Complete Unit III lecture notes covering arithmetic, ISA, RTL, and microprogramming.',
    fileType: 'PDF',
  },
  {
    id: 'res-u3-div',
    title: 'Unit III Handout: Binary Division Algorithm',
    filename: 'Division_Algorithm_a4cc1f32.pdf',
    path: '/assets/aistudio/Division_Algorithm_a4cc1f32.pdf',
    category: 'Unit Lecture Notes',
    unit: 'unit3',
    description: 'Focused handout on Restoring and Non-Restoring division flowcharts and step traces.',
    fileType: 'PDF',
  },
  {
    id: 'res-u5-risc',
    title: 'Unit V Notes: RISC, CISC & Pipelining',
    filename: 'RISC_ffa13362.pdf',
    path: '/assets/aistudio/RISC_ffa13362.pdf',
    category: 'Unit Lecture Notes',
    unit: 'unit5',
    description: 'Lecture deck on RISC/CISC design, pipeline stages, hazards, and superscalar processors.',
    fileType: 'PDF',
  },
  {
    id: 'res-diag-vn',
    title: 'Diagram: Von Neumann Architecture',
    filename: 'DECO1_1cb5244a.JPG',
    path: '/assets/aistudio/DECO1_1cb5244a.JPG',
    category: 'Reference Diagrams',
    unit: 'unit1',
    description: 'CPU, Main Memory, and Bus Bottleneck reference figure.',
    fileType: 'JPG',
  },
  {
    id: 'res-diag-gates',
    title: 'Diagram: Basic Logic Gates (AND, OR, NOT, NAND)',
    filename: 'andornot_8662986d.JPG',
    path: '/assets/aistudio/andornot_8662986d.JPG',
    category: 'Reference Diagrams',
    unit: 'unit2',
    description: 'Standard logic gate schematic symbols.',
    fileType: 'JPG',
  },
  {
    id: 'res-diag-nandnor',
    title: 'Diagram: AND, NAND, OR & NOR Logic Reference',
    filename: 'Nandand_Nor_54c707f9.JPG',
    path: '/assets/aistudio/Nandand_Nor_54c707f9.JPG',
    category: 'Reference Diagrams',
    unit: 'unit2',
    description: 'Visual comparison of basic and universal gate rules.',
    fileType: 'JPG',
  },
  {
    id: 'res-diag-xor',
    title: 'Diagram: XOR & XNOR Logic Reference',
    filename: 'Xor_b0f26fef.JPG',
    path: '/assets/aistudio/Xor_b0f26fef.JPG',
    category: 'Reference Diagrams',
    unit: 'unit2',
    description: 'Visual truth behavior of XOR and XNOR gates.',
    fileType: 'JPG',
  },
];
