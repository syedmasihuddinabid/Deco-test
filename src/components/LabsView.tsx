import React, { useEffect, useMemo, useState } from 'react';
import {
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';

interface Props {
  initialLabIndex?: number;
}

const LAB_TABS = [
  { id: 0, label: 'Base, 2’s Comp & IEEE-754' },
  { id: 1, label: 'K-Map Simplifier & Gates' },
  { id: 2, label: 'Restoring Division & Booth’s' },
  { id: 3, label: 'Pipeline & Cache Simulator' },
];

// ---------- Helpers for Lab 1 ----------
function toIEEE754Single(num: number) {
  if (!Number.isFinite(num)) {
    return { sign: '0', exp: '11111111', mantissa: '0'.repeat(23), hex: '7F800000', expVal: 255 };
  }
  const buf = new ArrayBuffer(4);
  const view = new DataView(buf);
  view.setFloat32(0, num, false);
  const intVal = view.getUint32(0, false);
  const bin = intVal.toString(2).padStart(32, '0');
  return {
    sign: bin.slice(0, 1),
    exp: bin.slice(1, 9),
    mantissa: bin.slice(9),
    hex: intVal.toString(16).toUpperCase().padStart(8, '0'),
    expVal: parseInt(bin.slice(1, 9), 2),
  };
}

function formatBaseNumber(val: number, base: number): string {
  if (!Number.isFinite(val)) return '—';
  const sign = val < 0 ? '-' : '';
  const abs = Math.abs(val);
  const intPart = Math.floor(abs);
  let fracPart = abs - intPart;
  const intStr = intPart.toString(base).toUpperCase();
  if (fracPart < 1e-9) return sign + intStr;
  let fracStr = '';
  for (let i = 0; i < 6 && fracPart > 1e-9; i++) {
    fracPart *= base;
    const digit = Math.floor(fracPart);
    fracStr += digit.toString(base).toUpperCase();
    fracPart -= digit;
  }
  return `${sign}${intStr}.${fracStr}`;
}

function binaryToGray(binStr: string): string {
  if (!binStr) return '';
  let res = binStr[0];
  for (let i = 1; i < binStr.length; i++) {
    res += binStr[i - 1] === binStr[i] ? '0' : '1';
  }
  return res;
}

// ---------- Helpers for Lab 2 (Quine-McCluskey SOP Minimizer) ----------
function minimizeKMapSOP(
  vars: string[],
  cells: ('0' | '1' | 'X')[]
): { sop: string; minterms: number[]; dontCares: number[]; groups: number[][] } {
  const n = vars.length;
  const minterms: number[] = [];
  const dontCares: number[] = [];
  cells.forEach((v, i) => {
    if (v === '1') minterms.push(i);
    if (v === 'X') dontCares.push(i);
  });

  if (minterms.length === 0) {
    return { sop: '0', minterms, dontCares, groups: [] };
  }
  if (minterms.length + dontCares.length === 1 << n) {
    return {
      sop: '1',
      minterms,
      dontCares,
      groups: [Array.from({ length: 1 << n }, (_, i) => i)],
    };
  }

  interface Implicant {
    bits: string; // e.g. '1-0-'
    covered: number[];
  }

  const allOn = [...minterms, ...dontCares];
  let current: Implicant[] = allOn.map((m) => ({
    bits: m.toString(2).padStart(n, '0'),
    covered: [m],
  }));

  const primeImplicants: Implicant[] = [];

  const combine = (a: string, b: string): string | null => {
    let diff = 0;
    let out = '';
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        if (a[i] === '-' || b[i] === '-') return null;
        diff++;
        out += '-';
      } else {
        out += a[i];
      }
      if (diff > 1) return null;
    }
    return diff === 1 ? out : null;
  };

  while (current.length > 0) {
    const used = new Set<number>();
    const nextMap = new Map<string, Implicant>();

    for (let i = 0; i < current.length; i++) {
      for (let j = i + 1; j < current.length; j++) {
        const merged = combine(current[i].bits, current[j].bits);
        if (merged) {
          used.add(i);
          used.add(j);
          if (!nextMap.has(merged)) {
            const cov = Array.from(new Set([...current[i].covered, ...current[j].covered])).sort(
              (x, y) => x - y
            );
            nextMap.set(merged, { bits: merged, covered: cov });
          }
        }
      }
    }

    current.forEach((imp, idx) => {
      if (!used.has(idx) && !primeImplicants.some((p) => p.bits === imp.bits)) {
        primeImplicants.push(imp);
      }
    });

    current = Array.from(nextMap.values());
  }

  // Greedy + essential cover over minterms
  const remaining = new Set<number>(minterms);
  const selected: Implicant[] = [];

  // Essential prime implicants first
  for (const m of minterms) {
    const covering = primeImplicants.filter((p) => p.covered.includes(m));
    if (covering.length === 1 && !selected.includes(covering[0])) {
      selected.push(covering[0]);
      covering[0].covered.forEach((c) => remaining.delete(c));
    }
  }

  while (remaining.size > 0) {
    let best: Implicant | null = null;
    let bestScore = -1;
    for (const p of primeImplicants) {
      if (selected.includes(p)) continue;
      const hitCount = p.covered.filter((c) => remaining.has(c)).length;
      if (hitCount > bestScore) {
        bestScore = hitCount;
        best = p;
      }
    }
    if (!best || bestScore <= 0) break;
    selected.push(best);
    best.covered.forEach((c) => remaining.delete(c));
  }

  const termToStr = (bits: string) => {
    let s = '';
    for (let i = 0; i < bits.length; i++) {
      if (bits[i] === '1') s += vars[i];
      else if (bits[i] === '0') s += `${vars[i]}'`;
    }
    return s || '1';
  };

  return {
    sop: selected.map((s) => termToStr(s.bits)).join(' + '),
    minterms,
    dontCares,
    groups: selected.map((s) => s.covered),
  };
}

// ---------- Helpers for Lab 3 (Division & Booth) ----------
interface DivStep {
  step: number;
  op: string;
  A: string;
  Q: string;
  n: number;
  note: string;
}

function generateRestoringDivisionTrace(dividend: number, divisor: number): DivStep[] {
  const n = 4;
  if (divisor === 0) return [];
  let A = 0;
  let Q = dividend & 0xf;
  const M = divisor & 0xf;
  const fmtA = (val: number) => ((val < 0 ? (1 << 5) + val : val) & 0x1f).toString(2).padStart(5, '0');
  const fmtQ = (val: number) => (val & 0xf).toString(2).padStart(4, '0');

  const steps: DivStep[] = [
    { step: 0, op: 'INIT', A: fmtA(A), Q: fmtQ(Q), n, note: `A=0, Q=${dividend}, M=${divisor}` },
  ];

  for (let i = 1; i <= n; i++) {
    const msbQ = (Q >> 3) & 1;
    A = ((A << 1) | msbQ) & 0x1f;
    if (A & 0x10) A -= 32; // signed 5-bit
    Q = (Q << 1) & 0xf;
    steps.push({
      step: steps.length,
      op: 'SHL (A,Q)',
      A: fmtA(A),
      Q: fmtQ(Q),
      n: n - i + 1,
      note: 'Shift (A,Q) left by 1 bit',
    });

    A = A - M;
    const isNeg = A < 0;
    steps.push({
      step: steps.length,
      op: 'A ← A − M',
      A: fmtA(A),
      Q: fmtQ(Q),
      n: n - i + 1,
      note: isNeg ? `A < 0 (${A}), needs restore` : `A ≥ 0 (${A}), keep A`,
    });

    if (isNeg) {
      A = A + M;
      Q = Q & 0xe; // Q0 = 0
      steps.push({
        step: steps.length,
        op: 'RESTORE',
        A: fmtA(A),
        Q: fmtQ(Q),
        n: n - i,
        note: `Set Q0 = 0, restore A = A + M (${A})`,
      });
    } else {
      Q = Q | 1; // Q0 = 1
      steps.push({
        step: steps.length,
        op: 'SET Q0=1',
        A: fmtA(A),
        Q: fmtQ(Q),
        n: n - i,
        note: 'Set Q0 = 1, decrement counter',
      });
    }
  }
  return steps;
}

interface BoothStep {
  cycle: number;
  op: string;
  A: string;
  Q: string;
  Q_1: number;
  note: string;
}

function generateBoothTrace(mVal: number, qVal: number): BoothStep[] {
  const bits = 5;
  const mask = (1 << bits) - 1;
  const toSigned = (v: number) => (v & (1 << (bits - 1)) ? v - (1 << bits) : v);
  const fmt = (v: number) => (v & mask).toString(2).padStart(bits, '0');

  let A = 0;
  let Q = qVal & mask;
  const M = mVal & mask;
  let Q_1 = 0;

  const steps: BoothStep[] = [
    {
      cycle: 0,
      op: 'INIT',
      A: fmt(A),
      Q: fmt(Q),
      Q_1,
      note: `M=${mVal} (${fmt(M)}), Q=${qVal} (${fmt(Q)})`,
    },
  ];

  for (let c = 1; c <= bits; c++) {
    const q0 = Q & 1;
    const pair = `${q0}${Q_1}`;
    let opDesc = '00/11: Shift only';
    if (pair === '10') {
      A = (A - toSigned(M)) & mask;
      opDesc = '10: A ← A − M';
    } else if (pair === '01') {
      A = (A + toSigned(M)) & mask;
      opDesc = '01: A ← A + M';
    }
    const afterOpA = fmt(A);
    const lsbA = A & 1;
    const signA = A & (1 << (bits - 1));
    Q_1 = Q & 1;
    Q = ((Q >> 1) | (lsbA << (bits - 1))) & mask;
    A = ((A >> 1) | signA) & mask;

    steps.push({
      cycle: c,
      op: opDesc,
      A: fmt(A),
      Q: fmt(Q),
      Q_1,
      note: `After op (${afterOpA}) → ashr(A, Q, Q-1)`,
    });
  }
  return steps;
}

export const LabsView: React.FC<Props> = ({ initialLabIndex = 0 }) => {
  const [activeLab, setActiveLab] = useState<number>(initialLabIndex);

  useEffect(() => {
    setActiveLab(initialLabIndex);
  }, [initialLabIndex]);

  // ===== LAB 1 STATE =====
  const [decInput, setDecInput] = useState<string>('13.625');
  const [aluA, setAluA] = useState<number>(5);
  const [aluB, setAluB] = useState<number>(3);
  const [aluMode, setAluMode] = useState<0 | 1>(1); // 0=Add, 1=Sub

  const parsedDec = Number(decInput);
  const isDecValid = decInput.trim() !== '' && Number.isFinite(parsedDec);
  const ieee = useMemo(() => toIEEE754Single(isDecValid ? parsedDec : 0), [isDecValid, parsedDec]);
  const intRounded = isDecValid ? Math.trunc(parsedDec) : 0;
  const clamped8 = Math.max(-128, Math.min(127, intRounded));
  const abs8 = Math.abs(clamped8).toString(2).padStart(7, '0');
  const signedMag8 = (clamped8 < 0 ? '1' : '0') + abs8;
  const onesComp8 =
    clamped8 >= 0
      ? signedMag8
      : abs8
          .padStart(8, '0')
          .split('')
          .map((b) => (b === '0' ? '1' : '0'))
          .join('');
  const twosComp8 = (clamped8 & 0xff).toString(2).padStart(8, '0');
  const binInt = Math.abs(intRounded).toString(2);

  // 4-bit Adder/Subtractor live flags
  const a4 = aluA & 0xf;
  const b4 = aluB & 0xf;
  const bXor = aluMode === 1 ? (~b4) & 0xf : b4;
  let c: number = aluMode;
  let c3 = 0;
  let sum4 = 0;
  for (let bit = 0; bit < 4; bit++) {
    const ai = (a4 >> bit) & 1;
    const bi = (bXor >> bit) & 1;
    const s = ai ^ bi ^ c;
    const cout = (ai & bi) | (c & (ai ^ bi));
    if (bit === 2) c3 = cout;
    sum4 |= s << bit;
    c = cout;
  }
  const c4 = c;
  const overflowV = c4 ^ c3;

  // ===== LAB 2 STATE (K-MAP) =====
  const [kVars, setKVars] = useState<3 | 4>(3);
  const [kCells, setKCells] = useState<('0' | '1' | 'X')[]>(() => {
    const arr = Array(16).fill('0') as ('0' | '1' | 'X')[];
    [3, 5, 6, 7].forEach((i) => (arr[i] = '1')); // Default Majority-of-3
    return arr;
  });

  const activeCellCount = kVars === 3 ? 8 : 16;
  const kResult = useMemo(() => {
    const vars = kVars === 3 ? ['A', 'B', 'C'] : ['A', 'B', 'C', 'D'];
    return minimizeKMapSOP(vars, kCells.slice(0, activeCellCount));
  }, [kVars, kCells, activeCellCount]);

  const toggleKCell = (idx: number) => {
    setKCells((prev) => {
      const next = [...prev];
      next[idx] = next[idx] === '0' ? '1' : next[idx] === '1' ? 'X' : '0';
      return next;
    });
  };

  const applyKPreset = (vars: 3 | 4, ones: number[], dcs: number[] = []) => {
    setKVars(vars);
    const arr = Array(16).fill('0') as ('0' | '1' | 'X')[];
    ones.forEach((i) => (arr[i] = '1'));
    dcs.forEach((i) => (arr[i] = 'X'));
    setKCells(arr);
  };

  // ===== LAB 3 STATE (DIVISION & BOOTH) =====
  const [arithMode, setArithMode] = useState<'div' | 'booth'>('div');
  const [divDividend, setDivDividend] = useState(7);
  const [divDivisor, setDivDivisor] = useState(3);
  const [boothM, setBoothM] = useState(7);
  const [boothQ, setBoothQ] = useState(-3);
  const [arithStepIdx, setArithStepIdx] = useState(0);
  const [arithPlaying, setArithPlaying] = useState(false);

  const divSteps = useMemo(
    () => generateRestoringDivisionTrace(divDividend, divDivisor),
    [divDividend, divDivisor]
  );
  const boothSteps = useMemo(() => generateBoothTrace(boothM, boothQ), [boothM, boothQ]);
  const totalArithSteps = arithMode === 'div' ? divSteps.length : boothSteps.length;

  useEffect(() => {
    setArithStepIdx(0);
    setArithPlaying(false);
  }, [arithMode, divDividend, divDivisor, boothM, boothQ]);

  useEffect(() => {
    if (!arithPlaying) return;
    if (arithStepIdx >= totalArithSteps - 1) {
      setArithPlaying(false);
      return;
    }
    const timer = setTimeout(() => setArithStepIdx((s) => s + 1), 850);
    return () => clearTimeout(timer);
  }, [arithPlaying, arithStepIdx, totalArithSteps]);

  // ===== LAB 4 STATE (PIPELINE & CACHE) =====
  const [pipeScenario, setPipeScenario] = useState<'raw' | 'load-use' | 'independent'>('raw');
  const [forwardingOn, setForwardingOn] = useState(false);
  const [pipeCycle, setPipeCycle] = useState(8);

  const [memKB, setMemKB] = useState(64);
  const [blockWords, setBlockWords] = useState(16);
  const [cacheLines, setCacheLines] = useState(128);
  const [assocMode, setAssocMode] = useState<'direct' | '2way' | '4way' | 'full'>('2way');
  const [hitRatio, setHitRatio] = useState(0.95);
  const [tcNs, setTcNs] = useState(10);
  const [tmNs, setTmNs] = useState(100);

  const addrBits = Math.round(Math.log2(memKB * 1024));
  const wordBits = Math.round(Math.log2(blockWords));
  const indexOrSetBits =
    assocMode === 'full'
      ? 0
      : assocMode === 'direct'
        ? Math.round(Math.log2(cacheLines))
        : assocMode === '2way'
          ? Math.round(Math.log2(cacheLines / 2))
          : Math.round(Math.log2(cacheLines / 4));
  const tagBits = Math.max(1, addrBits - wordBits - indexOrSetBits);
  const comparators =
    assocMode === 'full' ? cacheLines : assocMode === 'direct' ? 1 : assocMode === '2way' ? 2 : 4;
  const tEff = hitRatio * tcNs + (1 - hitRatio) * tmNs;

  const pipelineRows = useMemo(() => {
    const stages = ['IF', 'ID', 'EX', 'MEM', 'WB'];
    if (pipeScenario === 'independent') {
      return [
        { label: 'ADD R1,R2,R3', cells: ['IF', 'ID', 'EX', 'MEM', 'WB'] },
        { label: 'SUB R4,R5,R6', cells: ['', 'IF', 'ID', 'EX', 'MEM', 'WB'] },
        { label: 'AND R7,R8,R9', cells: ['', '', 'IF', 'ID', 'EX', 'MEM', 'WB'] },
      ];
    }
    if (pipeScenario === 'raw') {
      if (forwardingOn) {
        return [
          { label: 'ADD R1,R2,R3', cells: ['IF', 'ID', 'EX', 'MEM', 'WB'] },
          { label: 'SUB R4,R1,R5', cells: ['', 'IF', 'ID', 'EX', 'MEM', 'WB'] },
          { label: 'AND R6,R1,R7', cells: ['', '', 'IF', 'ID', 'EX', 'MEM', 'WB'] },
        ];
      }
      return [
        { label: 'ADD R1,R2,R3', cells: stages },
        { label: 'SUB R4,R1,R5', cells: ['', 'IF', 'STALL', 'STALL', 'ID', 'EX', 'MEM', 'WB'] },
        { label: 'AND R6,R1,R7', cells: ['', '', '', '', 'IF', 'ID', 'EX', 'MEM', 'WB'] },
      ];
    }
    // load-use
    if (forwardingOn) {
      return [
        { label: 'LW  R1,0(R2)', cells: stages },
        { label: 'ADD R4,R1,R5', cells: ['', 'IF', 'ID', 'STALL', 'EX', 'MEM', 'WB'] },
      ];
    }
    return [
      { label: 'LW  R1,0(R2)', cells: stages },
      { label: 'ADD R4,R1,R5', cells: ['', 'IF', 'STALL', 'STALL', 'ID', 'EX', 'MEM', 'WB'] },
    ];
  }, [pipeScenario, forwardingOn]);

  return (
    <div className="space-y-6">
      {/* Lab Switcher Header */}
      <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Interactive DECO Hardware &amp; Logic Labs
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Step through Unit I–V exam numericals, Karnaugh Map minimization, arithmetic register traces, and pipeline/cache trade-offs.
        </p>

        <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-200 pt-4">
          {LAB_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveLab(tab.id)}
              className={`whitespace-nowrap shrink-0 rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors cursor-pointer ${
                activeLab === tab.id
                  ? 'bg-slate-900 text-white'
                  : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Lab {tab.id + 1}: {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* ==================== LAB 1: BASE, 2's COMP & IEEE 754 ==================== */}
      {activeLab === 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Interactive Stage (Left 7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-sky-700">
                Unit I · Number Systems &amp; IEEE 754 Single Precision
              </div>
              <h2 className="mt-1 text-xl font-bold text-slate-900">
                Live Base, Complement &amp; 32-Bit Float Breakdown
              </h2>

              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono tabular-nums">
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <div className="font-sans text-xs text-slate-500">Binary (Base 2)</div>
                  <div className="mt-1 text-sm font-bold text-slate-900 break-all">
                    {isDecValid ? formatBaseNumber(parsedDec, 2) : '—'}
                  </div>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <div className="font-sans text-xs text-slate-500">Octal (Base 8)</div>
                  <div className="mt-1 text-sm font-bold text-slate-900 break-all">
                    {isDecValid ? formatBaseNumber(parsedDec, 8) : '—'}
                  </div>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <div className="font-sans text-xs text-slate-500">Hexadecimal (Base 16)</div>
                  <div className="mt-1 text-sm font-bold text-slate-900 break-all">
                    {isDecValid ? formatBaseNumber(parsedDec, 16) : '—'}
                  </div>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <div className="font-sans text-xs text-slate-500">Gray Code (|int|)</div>
                  <div className="mt-1 text-sm font-bold text-sky-800 break-all">
                    {isDecValid ? binaryToGray(binInt) : '—'}
                  </div>
                </div>
              </div>

              {/* 8-bit Signed Integer Representations */}
              <div className="mt-5">
                <div className="text-xs font-semibold text-slate-700 mb-2">
                  8-Bit Signed Integer Representations (clamped to {clamped8})
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs tabular-nums">
                  <div className="rounded-lg border border-slate-200 bg-white p-3">
                    <div className="font-sans text-slate-500">Signed Magnitude</div>
                    <div className="mt-1 text-sm font-bold text-slate-900">{signedMag8}</div>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-white p-3">
                    <div className="font-sans text-slate-500">1’s Complement</div>
                    <div className="mt-1 text-sm font-bold text-slate-900">{onesComp8}</div>
                  </div>
                  <div className="rounded-lg border border-sky-200 bg-sky-50/70 p-3">
                    <div className="font-sans text-sky-900 font-semibold">2’s Complement</div>
                    <div className="mt-1 text-sm font-bold text-sky-900">{twosComp8}</div>
                  </div>
                </div>
              </div>

              {/* IEEE 754 Single Precision */}
              <div className="mt-5 pt-5 border-t border-slate-200">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                  <span className="text-xs font-semibold text-slate-700">
                    IEEE 754 Single Precision (32-Bit)
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-800">
                    0x{ieee.hex}
                  </span>
                </div>
                <div className="grid grid-cols-12 gap-1.5 font-mono text-xs text-center tabular-nums">
                  <div className="col-span-2 rounded border border-rose-300 bg-rose-50 p-2">
                    <div className="text-[10px] text-rose-700 font-sans font-semibold">Sign (1b)</div>
                    <div className="font-bold text-rose-950 mt-0.5">{ieee.sign}</div>
                  </div>
                  <div className="col-span-4 rounded border border-amber-300 bg-amber-50 p-2">
                    <div className="text-[10px] text-amber-800 font-sans font-semibold">
                      Exp (8b · {ieee.expVal})
                    </div>
                    <div className="font-bold text-amber-950 mt-0.5 break-all">{ieee.exp}</div>
                  </div>
                  <div className="col-span-6 rounded border border-sky-300 bg-sky-50 p-2">
                    <div className="text-[10px] text-sky-800 font-sans font-semibold">Mantissa (23b)</div>
                    <div className="font-bold text-sky-950 mt-0.5 break-all">{ieee.mantissa}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4-bit Adder/Subtractor Stage */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-sky-700">
                    Unit II · 4-Bit Arithmetic Adder / Subtractor (CIE-2 LAQ #3)
                  </div>
                  <h3 className="mt-0.5 text-lg font-bold text-slate-900">
                    Mode M = {aluMode} ({aluMode === 0 ? 'ADD: A + B' : "SUBTRACT: A + B' + 1"})
                  </h3>
                </div>
                <div
                  className={`inline-flex items-center gap-1.5 text-xs font-bold ${
                    overflowV === 1 ? 'text-red-700' : 'text-emerald-700'
                  }`}
                >
                  {overflowV === 1 ? (
                    <>
                      <AlertTriangle className="w-4 h-4" /> ▲ SIGNED OVERFLOW (V = 1)
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" /> ● NO SIGNED OVERFLOW (V = 0)
                    </>
                  )}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs tabular-nums">
                <div className="rounded border border-slate-200 bg-slate-50 p-2.5">
                  <div className="font-sans text-slate-500">Operand A</div>
                  <div className="mt-1 font-bold text-slate-900">
                    {a4.toString(2).padStart(4, '0')} ({aluA})
                  </div>
                </div>
                <div className="rounded border border-slate-200 bg-slate-50 p-2.5">
                  <div className="font-sans text-slate-500">B ⊕ M</div>
                  <div className="mt-1 font-bold text-slate-900">
                    {bXor.toString(2).padStart(4, '0')} ({aluMode ? `~${aluB}` : aluB})
                  </div>
                </div>
                <div className="rounded border border-sky-200 bg-sky-50 p-2.5">
                  <div className="font-sans text-sky-800">4-Bit Sum S</div>
                  <div className="mt-1 font-bold text-sky-950">
                    {sum4.toString(2).padStart(4, '0')} ({sum4 & 8 ? sum4 - 16 : sum4} signed)
                  </div>
                </div>
                <div className="rounded border border-amber-200 bg-amber-50 p-2.5">
                  <div className="font-sans text-amber-800">Carries (C4, C3)</div>
                  <div className="mt-1 font-bold text-amber-950">
                    C4={c4}, C3={c3} → V={overflowV}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Control & Concept Deck (Right 5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
              <h3 className="text-base font-bold text-slate-900">Number Converter Controls</h3>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Enter Decimal Value (supports negatives &amp; fractions)
                </label>
                <input
                  type="text"
                  value={decInput}
                  onChange={(e) => setDecInput(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2 font-mono text-sm text-slate-900 focus:border-sky-600 focus:outline-none"
                />
              </div>

              <div>
                <div className="text-xs font-semibold text-slate-500 mb-2">Exam Presets</div>
                <div className="flex flex-wrap gap-1.5">
                  {['13.625', '12.5', '-18', '-15', '45', '520', '163.875'].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setDecInput(val)}
                      className="rounded border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
              <h3 className="text-base font-bold text-slate-900">4-Bit Adder/Subtractor Controls</h3>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setAluMode(0)}
                  className={`flex-1 rounded-lg py-2 text-xs font-semibold cursor-pointer ${
                    aluMode === 0
                      ? 'bg-slate-900 text-white'
                      : 'border border-slate-300 bg-white text-slate-700'
                  }`}
                >
                  M = 0 (ADD)
                </button>
                <button
                  type="button"
                  onClick={() => setAluMode(1)}
                  className={`flex-1 rounded-lg py-2 text-xs font-semibold cursor-pointer ${
                    aluMode === 1
                      ? 'bg-slate-900 text-white'
                      : 'border border-slate-300 bg-white text-slate-700'
                  }`}
                >
                  M = 1 (SUBTRACT)
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 tabular-nums">
                    <span>Input A (Unsigned 0–15)</span>
                    <span className="font-mono">{aluA} ({a4.toString(2).padStart(4, '0')})</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={15}
                    value={aluA}
                    onChange={(e) => setAluA(Number(e.target.value))}
                    className="w-full mt-1 accent-sky-700"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 tabular-nums">
                    <span>Input B (Unsigned 0–15)</span>
                    <span className="font-mono">{aluB} ({b4.toString(2).padStart(4, '0')})</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={15}
                    value={aluB}
                    onChange={(e) => setAluB(Number(e.target.value))}
                    className="w-full mt-1 accent-sky-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== LAB 2: K-MAP SIMPLIFIER ==================== */}
      {activeLab === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-sky-700">
                  Unit II · Karnaugh Map Minimizer
                </div>
                <h2 className="mt-0.5 text-xl font-bold text-slate-900">
                  Click Cells to Toggle 0 → 1 → X (Don’t Care)
                </h2>
              </div>
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => setKVars(3)}
                  className={`rounded-md px-3 py-1.5 text-xs font-semibold cursor-pointer ${
                    kVars === 3 ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  3-Variable (A,B,C)
                </button>
                <button
                  type="button"
                  onClick={() => setKVars(4)}
                  className={`rounded-md px-3 py-1.5 text-xs font-semibold cursor-pointer ${
                    kVars === 4 ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  4-Variable (A,B,C,D)
                </button>
              </div>
            </div>

            {/* Gray-ordered K-map Grid */}
            <div className="overflow-x-auto">
              {kVars === 3 ? (
                <table className="w-full max-w-lg mx-auto text-center font-mono text-sm border-collapse tabular-nums">
                  <thead>
                    <tr className="text-xs text-slate-500">
                      <th className="p-2 text-left">A \ BC</th>
                      <th className="p-2">00</th>
                      <th className="p-2">01</th>
                      <th className="p-2">11</th>
                      <th className="p-2">10</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { rowLabel: '0', indices: [0, 1, 3, 2] },
                      { rowLabel: '1', indices: [4, 5, 7, 6] },
                    ].map((r) => (
                      <tr key={r.rowLabel}>
                        <td className="p-2 font-bold text-slate-700 text-left">A = {r.rowLabel}</td>
                        {r.indices.map((m) => {
                          const val = kCells[m];
                          return (
                            <td key={m} className="p-1.5">
                              <button
                                type="button"
                                onClick={() => toggleKCell(m)}
                                className={`w-full rounded-lg border py-3 transition-colors cursor-pointer ${
                                  val === '1'
                                    ? 'border-sky-600 bg-sky-50 text-sky-900 font-bold'
                                    : val === 'X'
                                      ? 'border-amber-400 bg-amber-50 text-amber-900 font-bold'
                                      : 'border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100'
                                }`}
                              >
                                <div className="text-lg">{val}</div>
                                <div className="text-[10px] opacity-70">m{m}</div>
                              </button>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <table className="w-full max-w-lg mx-auto text-center font-mono text-sm border-collapse tabular-nums">
                  <thead>
                    <tr className="text-xs text-slate-500">
                      <th className="p-2 text-left">AB \ CD</th>
                      <th className="p-2">00</th>
                      <th className="p-2">01</th>
                      <th className="p-2">11</th>
                      <th className="p-2">10</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { rowLabel: '00', indices: [0, 1, 3, 2] },
                      { rowLabel: '01', indices: [4, 5, 7, 6] },
                      { rowLabel: '11', indices: [12, 13, 15, 14] },
                      { rowLabel: '10', indices: [8, 9, 11, 10] },
                    ].map((r) => (
                      <tr key={r.rowLabel}>
                        <td className="p-2 font-bold text-slate-700 text-left">{r.rowLabel}</td>
                        {r.indices.map((m) => {
                          const val = kCells[m];
                          return (
                            <td key={m} className="p-1">
                              <button
                                type="button"
                                onClick={() => toggleKCell(m)}
                                className={`w-full rounded-lg border py-2.5 transition-colors cursor-pointer ${
                                  val === '1'
                                    ? 'border-sky-600 bg-sky-50 text-sky-900 font-bold'
                                    : val === 'X'
                                      ? 'border-amber-400 bg-amber-50 text-amber-900 font-bold'
                                      : 'border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100'
                                }`}
                              >
                                <div className="text-base">{val}</div>
                                <div className="text-[10px] opacity-70">m{m}</div>
                              </button>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div className="mt-5 rounded-lg bg-slate-900 p-4 text-white">
              <div className="text-xs font-semibold uppercase tracking-wider text-sky-300">
                Minimized Sum-of-Products (SOP) Expression
              </div>
              <div className="mt-1 font-mono text-lg sm:text-xl font-bold text-white break-words">
                F({kVars === 3 ? 'A, B, C' : 'A, B, C, D'}) = {kResult.sop}
              </div>
              <div className="mt-2 font-mono text-xs text-slate-300 tabular-nums">
                Σm({kResult.minterms.join(', ') || '∅'})
                {kResult.dontCares.length > 0 ? ` + d(${kResult.dontCares.join(', ')})` : ''}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3">
              <h3 className="text-base font-bold text-slate-900">Exam &amp; Surprise Test Presets</h3>
              <div className="grid grid-cols-1 gap-2">
                <button
                  type="button"
                  onClick={() => applyKPreset(3, [3, 5, 6, 7])}
                  className="text-left rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs hover:bg-slate-100 cursor-pointer"
                >
                  <div className="font-bold text-slate-900">Surprise Test 2: 3-Input Majority / Full Adder Cout</div>
                  <div className="font-mono text-slate-600 mt-0.5">Σm(3, 5, 6, 7) → AB + AC + BC</div>
                </button>
                <button
                  type="button"
                  onClick={() => applyKPreset(3, [1, 3, 5, 7])}
                  className="text-left rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs hover:bg-slate-100 cursor-pointer"
                >
                  <div className="font-bold text-slate-900">Course File Quiz #14</div>
                  <div className="font-mono text-slate-600 mt-0.5">Σm(1, 3, 5, 7) → C</div>
                </button>
                <button
                  type="button"
                  onClick={() => applyKPreset(3, [1, 2, 7])}
                  className="text-left rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs hover:bg-slate-100 cursor-pointer"
                >
                  <div className="font-bold text-slate-900">Surprise Test 2 Q2(b)</div>
                  <div className="font-mono text-slate-600 mt-0.5">Σm(1, 2, 7)</div>
                </button>
                <button
                  type="button"
                  onClick={() => applyKPreset(4, [0, 1, 2, 5, 8, 9, 10], [3, 7])}
                  className="text-left rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs hover:bg-slate-100 cursor-pointer"
                >
                  <div className="font-bold text-slate-900">4-Variable K-Map with Don’t Cares</div>
                  <div className="font-mono text-slate-600 mt-0.5">Σm(0,1,2,5,8,9,10) + d(3,7)</div>
                </button>
                <button
                  type="button"
                  onClick={() => applyKPreset(kVars, [])}
                  className="text-left rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Clear All Cells to 0
                </button>
              </div>
            </div>

            {/* Compact Truth Table Preview */}
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="text-sm font-bold text-slate-900 mb-2.5">Truth Table ({activeCellCount} Rows)</h3>
              <div className="max-h-64 overflow-y-auto rounded border border-slate-200">
                <table className="w-full text-center font-mono text-xs border-collapse tabular-nums">
                  <thead className="sticky top-0 bg-slate-100 border-b border-slate-200">
                    <tr>
                      <th className="py-1.5">m</th>
                      <th className="py-1.5">{kVars === 3 ? 'ABC' : 'ABCD'}</th>
                      <th className="py-1.5">F</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {Array.from({ length: activeCellCount }, (_, i) => (
                      <tr key={i} className={kCells[i] === '1' ? 'bg-sky-50/60 font-bold' : 'bg-white'}>
                        <td className="py-1 text-slate-500">{i}</td>
                        <td className="py-1">{i.toString(2).padStart(kVars, '0')}</td>
                        <td className="py-1">{kCells[i]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== LAB 3: RESTORING DIVISION & BOOTH'S ==================== */}
      {activeLab === 2 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-sky-700">
                  Unit III · Computer Arithmetic Register Tracer
                </div>
                <h2 className="mt-0.5 text-xl font-bold text-slate-900">
                  {arithMode === 'div'
                    ? `4-Bit Restoring Division: ${divDividend} ÷ ${divDivisor}`
                    : `5-Bit Booth’s Multiplication: (${boothM}) × (${boothQ})`}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setArithPlaying((p) => !p)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-sky-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-sky-800 cursor-pointer"
                >
                  {arithPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  {arithPlaying ? 'Pause' : 'Play'}
                </button>
                <button
                  type="button"
                  onClick={() => setArithStepIdx((s) => Math.min(totalArithSteps - 1, s + 1))}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  <SkipForward className="w-3.5 h-3.5" /> Step
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setArithPlaying(false);
                    setArithStepIdx(0);
                  }}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset
                </button>
              </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-200">
              {arithMode === 'div' ? (
                <table className="w-full text-left font-mono text-xs border-collapse tabular-nums">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                      <th className="px-3 py-2">Step</th>
                      <th className="px-3 py-2">Operation</th>
                      <th className="px-3 py-2">A (5b)</th>
                      <th className="px-3 py-2">Q (4b)</th>
                      <th className="px-3 py-2">n</th>
                      <th className="px-3 py-2 font-sans">Action Note</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {divSteps.slice(0, arithStepIdx + 1).map((row, idx) => (
                      <tr
                        key={row.step}
                        className={idx === arithStepIdx ? 'bg-sky-50 font-semibold' : 'bg-white'}
                      >
                        <td className="px-3 py-2 text-slate-500">{row.step}</td>
                        <td className="px-3 py-2 text-slate-900">{row.op}</td>
                        <td className="px-3 py-2 text-sky-800">{row.A}</td>
                        <td className="px-3 py-2 text-emerald-800">{row.Q}</td>
                        <td className="px-3 py-2">{row.n}</td>
                        <td className="px-3 py-2 font-sans text-slate-600">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <table className="w-full text-left font-mono text-xs border-collapse tabular-nums">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                      <th className="px-3 py-2">Cycle</th>
                      <th className="px-3 py-2">Operation</th>
                      <th className="px-3 py-2">A (5b)</th>
                      <th className="px-3 py-2">Q (5b)</th>
                      <th className="px-3 py-2">Q-1</th>
                      <th className="px-3 py-2 font-sans">Action Note</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {boothSteps.slice(0, arithStepIdx + 1).map((row, idx) => (
                      <tr
                        key={row.cycle}
                        className={idx === arithStepIdx ? 'bg-sky-50 font-semibold' : 'bg-white'}
                      >
                        <td className="px-3 py-2 text-slate-500">{row.cycle}</td>
                        <td className="px-3 py-2 text-slate-900">{row.op}</td>
                        <td className="px-3 py-2 text-sky-800">{row.A}</td>
                        <td className="px-3 py-2 text-emerald-800">{row.Q}</td>
                        <td className="px-3 py-2">{row.Q_1}</td>
                        <td className="px-3 py-2 font-sans text-slate-600">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {arithStepIdx === totalArithSteps - 1 && (
              <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-3.5 text-sm font-semibold text-emerald-900 tabular-nums">
                {arithMode === 'div'
                  ? `● COMPLETED: Quotient Q = ${Math.floor(divDividend / divDivisor)} (${(
                      Math.floor(divDividend / divDivisor) & 0xf
                    )
                      .toString(2)
                      .padStart(4, '0')}) · Remainder A = ${divDividend % divDivisor}`
                  : `● COMPLETED: Product (A, Q) = ${boothM * boothQ}`}
              </div>
            )}
          </div>

          <div className="lg:col-span-4 rounded-xl border border-slate-200 bg-white p-5 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Algorithm &amp; Operands</h3>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setArithMode('div')}
                className={`flex-1 rounded-lg py-2 text-xs font-semibold cursor-pointer ${
                  arithMode === 'div' ? 'bg-slate-900 text-white' : 'border border-slate-300 text-slate-700'
                }`}
              >
                Restoring Division
              </button>
              <button
                type="button"
                onClick={() => setArithMode('booth')}
                className={`flex-1 rounded-lg py-2 text-xs font-semibold cursor-pointer ${
                  arithMode === 'booth' ? 'bg-slate-900 text-white' : 'border border-slate-300 text-slate-700'
                }`}
              >
                Booth’s Multiply
              </button>
            </div>

            {arithMode === 'div' ? (
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 tabular-nums">
                    <span>Dividend Q (1–15)</span>
                    <span className="font-mono">{divDividend}</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={15}
                    value={divDividend}
                    onChange={(e) => setDivDividend(Number(e.target.value))}
                    className="w-full mt-1 accent-sky-700"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 tabular-nums">
                    <span>Divisor M (1–15)</span>
                    <span className="font-mono">{divDivisor}</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={15}
                    value={divDivisor}
                    onChange={(e) => setDivDivisor(Number(e.target.value))}
                    className="w-full mt-1 accent-sky-700"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setDivDividend(7);
                    setDivDivisor(3);
                  }}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  Load Assignment 2 Example (7 ÷ 3)
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 tabular-nums">
                    <span>Multiplicand M (−15 to +15)</span>
                    <span className="font-mono">{boothM}</span>
                  </div>
                  <input
                    type="range"
                    min={-15}
                    max={15}
                    value={boothM}
                    onChange={(e) => setBoothM(Number(e.target.value))}
                    className="w-full mt-1 accent-sky-700"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 tabular-nums">
                    <span>Multiplier Q (−15 to +15)</span>
                    <span className="font-mono">{boothQ}</span>
                  </div>
                  <input
                    type="range"
                    min={-15}
                    max={15}
                    value={boothQ}
                    onChange={(e) => setBoothQ(Number(e.target.value))}
                    className="w-full mt-1 accent-sky-700"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setBoothM(-13);
                    setBoothQ(11);
                  }}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  Load R17 PYQ Example (−13 × +11)
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================== LAB 4: PIPELINE & CACHE SIMULATOR ==================== */}
      {activeLab === 3 && (
        <div className="space-y-6">
          {/* Pipeline Hazard Simulator */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-sky-700">
                    Unit V · 5-Stage Pipeline &amp; Hazard Simulator
                  </div>
                  <h2 className="mt-0.5 text-xl font-bold text-slate-900">
                    Space–Time Execution Grid (Clock Cycle T1–T{pipeCycle})
                  </h2>
                </div>
                <div
                  className={`text-xs font-bold ${
                    forwardingOn ? 'text-emerald-700' : 'text-amber-700'
                  }`}
                >
                  {forwardingOn ? '● DATA FORWARDING ACTIVE' : '▲ FORWARDING DISABLED (STALLS)'}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-center font-mono text-xs border-collapse tabular-nums">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500">
                      <th className="py-2 text-left pr-3">Instruction</th>
                      {Array.from({ length: 9 }, (_, i) => (
                        <th key={i} className="py-2 px-1">
                          T{i + 1}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {pipelineRows.map((row) => (
                      <tr key={row.label}>
                        <td className="py-2 pr-3 text-left font-semibold text-slate-900 whitespace-nowrap">
                          {row.label}
                        </td>
                        {Array.from({ length: 9 }, (_, col) => {
                          const stage = col < pipeCycle ? row.cells[col] : '';
                          const style =
                            stage === 'IF'
                              ? 'bg-sky-100 border-sky-300 text-sky-900'
                              : stage === 'ID'
                                ? 'bg-emerald-100 border-emerald-300 text-emerald-900'
                                : stage === 'EX'
                                  ? 'bg-amber-100 border-amber-300 text-amber-900'
                                  : stage === 'MEM'
                                    ? 'bg-indigo-100 border-indigo-300 text-indigo-900'
                                    : stage === 'WB'
                                      ? 'bg-rose-100 border-rose-300 text-rose-900'
                                      : stage === 'STALL'
                                        ? 'bg-red-100 border-red-300 text-red-800'
                                        : '';
                          return (
                            <td key={col} className="p-1">
                              {stage ? (
                                <div className={`rounded border py-1 font-semibold ${style}`}>
                                  {stage}
                                </div>
                              ) : (
                                <span className="text-slate-300">·</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="lg:col-span-4 rounded-xl border border-slate-200 bg-white p-5 space-y-4">
              <h3 className="text-base font-bold text-slate-900">Pipeline Controls</h3>
              <div className="space-y-2">
                {[
                  { id: 'raw', label: 'RAW Hazard (ADD R1 → SUB R1)' },
                  { id: 'load-use', label: 'Load-Use Hazard (LW R1 → ADD R1)' },
                  { id: 'independent', label: 'No Dependency (Ideal Overlap)' },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setPipeScenario(s.id as typeof pipeScenario)}
                    className={`w-full text-left rounded-lg px-3 py-2 text-xs font-semibold cursor-pointer ${
                      pipeScenario === s.id
                        ? 'bg-slate-900 text-white'
                        : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setForwardingOn((v) => !v)}
                className={`w-full rounded-lg py-2.5 text-xs font-bold cursor-pointer transition-colors ${
                  forwardingOn
                    ? 'bg-emerald-700 text-white hover:bg-emerald-800'
                    : 'border border-slate-300 bg-white text-slate-800 hover:bg-slate-50'
                }`}
              >
                Data Forwarding: {forwardingOn ? 'ON (EX/MEM → ALU)' : 'OFF (Stall on RAW)'}
              </button>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 tabular-nums">
                  <span>Clock Cycle Horizon</span>
                  <span className="font-mono">T{pipeCycle}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={9}
                  value={pipeCycle}
                  onChange={(e) => setPipeCycle(Number(e.target.value))}
                  className="w-full mt-1 accent-sky-700"
                />
              </div>
            </div>
          </div>

          {/* Cache Address Bit Splitter & Effective Access Time */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-sky-700">
                  Unit IV · Cache Mapping &amp; Effective Access Time
                </div>
                <h2 className="mt-0.5 text-xl font-bold text-slate-900">
                  {addrBits}-Bit Address Format &amp; t_eff = {tEff.toFixed(2)} ns
                </h2>
              </div>

              <div className="grid grid-cols-12 gap-1.5 font-mono text-xs text-center tabular-nums">
                <div
                  className={`${
                    indexOrSetBits === 0 ? 'col-span-9' : 'col-span-5'
                  } rounded border border-amber-300 bg-amber-50 p-3`}
                >
                  <div className="font-sans text-[11px] font-semibold text-amber-800">Tag Field</div>
                  <div className="mt-1 text-base font-bold text-amber-950">{tagBits} bits</div>
                </div>
                {indexOrSetBits > 0 && (
                  <div className="col-span-4 rounded border border-sky-300 bg-sky-50 p-3">
                    <div className="font-sans text-[11px] font-semibold text-sky-800">
                      {assocMode === 'direct' ? 'Line Index' : 'Set Field'}
                    </div>
                    <div className="mt-1 text-base font-bold text-sky-950">{indexOrSetBits} bits</div>
                  </div>
                )}
                <div className="col-span-3 rounded border border-emerald-300 bg-emerald-50 p-3">
                  <div className="font-sans text-[11px] font-semibold text-emerald-800">Word Offset</div>
                  <div className="mt-1 text-base font-bold text-emerald-950">{wordBits} bits</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-xs font-mono tabular-nums pt-2">
                <div className="rounded border border-slate-200 bg-slate-50 p-3">
                  <div className="font-sans text-slate-500">Comparators Needed</div>
                  <div className="mt-1 text-base font-bold text-slate-900">{comparators}</div>
                </div>
                <div className="rounded border border-slate-200 bg-slate-50 p-3">
                  <div className="font-sans text-slate-500">Total Address Bits</div>
                  <div className="mt-1 text-base font-bold text-slate-900">{addrBits} bits</div>
                </div>
                <div className="rounded border border-sky-200 bg-sky-50 p-3">
                  <div className="font-sans text-sky-800">Effective Access Time</div>
                  <div className="mt-1 text-base font-bold text-sky-950">{tEff.toFixed(2)} ns</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 rounded-xl border border-slate-200 bg-white p-5 space-y-3">
              <h3 className="text-base font-bold text-slate-900">Cache Parameters</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold text-slate-600">Main Memory</label>
                  <select
                    value={memKB}
                    onChange={(e) => setMemKB(Number(e.target.value))}
                    className="mt-1 w-full rounded border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-mono"
                  >
                    <option value={16}>16K words (14b)</option>
                    <option value={64}>64K words (16b)</option>
                    <option value={256}>256K words (18b)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600">Mapping Mode</label>
                  <select
                    value={assocMode}
                    onChange={(e) => setAssocMode(e.target.value as typeof assocMode)}
                    className="mt-1 w-full rounded border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-mono"
                  >
                    <option value="direct">Direct (1-way)</option>
                    <option value="2way">2-Way Set-Assoc</option>
                    <option value="4way">4-Way Set-Assoc</option>
                    <option value="full">Fully Associative</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600">Block Size</label>
                  <select
                    value={blockWords}
                    onChange={(e) => setBlockWords(Number(e.target.value))}
                    className="mt-1 w-full rounded border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-mono"
                  >
                    <option value={4}>4 words</option>
                    <option value={8}>8 words</option>
                    <option value={16}>16 words</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600">Cache Lines</label>
                  <select
                    value={cacheLines}
                    onChange={(e) => setCacheLines(Number(e.target.value))}
                    className="mt-1 w-full rounded border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-mono"
                  >
                    <option value={64}>64 lines</option>
                    <option value={128}>128 lines</option>
                    <option value={256}>256 lines</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 space-y-2.5">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 tabular-nums">
                    <span>Hit Ratio (h)</span>
                    <span className="font-mono">{(hitRatio * 100).toFixed(0)}% ({hitRatio.toFixed(2)})</span>
                  </div>
                  <input
                    type="range"
                    min={0.5}
                    max={0.99}
                    step={0.01}
                    value={hitRatio}
                    onChange={(e) => setHitRatio(Number(e.target.value))}
                    className="w-full mt-1 accent-sky-700"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-700 tabular-nums">
                      <span>Cache t_c</span>
                      <span className="font-mono">{tcNs} ns</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={25}
                      value={tcNs}
                      onChange={(e) => setTcNs(Number(e.target.value))}
                      className="w-full mt-1 accent-sky-700"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-700 tabular-nums">
                      <span>RAM t_m</span>
                      <span className="font-mono">{tmNs} ns</span>
                    </div>
                    <input
                      type="range"
                      min={40}
                      max={200}
                      step={5}
                      value={tmNs}
                      onChange={(e) => setTmNs(Number(e.target.value))}
                      className="w-full mt-1 accent-sky-700"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
