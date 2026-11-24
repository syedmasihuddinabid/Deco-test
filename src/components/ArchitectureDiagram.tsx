import React from 'react';
import { QuestionItem } from '../types/deco';

interface Props {
  type: NonNullable<QuestionItem['diagramType']>;
}

export const ArchitectureDiagram: React.FC<Props> = ({ type }) => {
  switch (type) {
    case 'von-neumann':
      return (
        <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
            Block Diagram · Von Neumann Stored-Program Architecture
          </div>
          <div className="grid grid-cols-1 md:grid-cols-11 gap-3 items-center text-xs">
            <div className="md:col-span-5 rounded border border-sky-300 bg-sky-50/80 p-3">
              <div className="font-bold text-sky-900 mb-2">CPU (Central Processing Unit)</div>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div className="rounded border border-sky-200 bg-white p-2">
                  <div className="font-semibold text-slate-800">Control Unit (CU)</div>
                  <div className="text-[11px] text-slate-600">Fetch · Decode · Timing</div>
                </div>
                <div className="rounded border border-sky-200 bg-white p-2">
                  <div className="font-semibold text-slate-800">ALU</div>
                  <div className="text-[11px] text-slate-600">Arithmetic &amp; Logic</div>
                </div>
              </div>
              <div className="rounded border border-sky-200 bg-white p-2 font-mono text-[11px] text-slate-700">
                Registers: PC · IR · MAR · MDR · ACC
              </div>
            </div>

            <div className="md:col-span-2 flex flex-col items-center justify-center text-center py-1">
              <div className="w-full rounded border border-amber-300 bg-amber-50 px-2 py-1.5 font-mono text-[11px] font-semibold text-amber-900">
                System Bus
              </div>
              <div className="text-[11px] text-slate-600 mt-1">Address · Data · Control</div>
              <div className="text-[10px] font-medium text-amber-700">Shared Bottleneck</div>
            </div>

            <div className="md:col-span-4 rounded border border-rose-300 bg-rose-50/70 p-3">
              <div className="font-bold text-rose-900 mb-2">Main Memory (Single Space)</div>
              <div className="space-y-1.5 text-[11px]">
                <div className="rounded border border-rose-200 bg-white px-2.5 py-1.5 text-slate-700">
                  <span className="font-semibold">Instructions:</span> Program Code, OS
                </div>
                <div className="rounded border border-rose-200 bg-white px-2.5 py-1.5 text-slate-700">
                  <span className="font-semibold">Data:</span> Variables, Arrays, Stack
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'adder-subtractor':
      return (
        <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
            Circuit Diagram · 4-Bit Binary Adder / Subtractor (Mode M)
          </div>
          <svg viewBox="0 0 680 190" className="w-full h-auto max-h-52 font-mono">
            <rect x="10" y="12" width="660" height="166" rx="8" fill="#ffffff" stroke="#cbd5e1" />
            <text x="26" y="34" fontSize="11" fill="#334155" fontWeight="600">
              Mode M = 0: ADD (B ⊕ 0 = B, C0 = 0)  |  M = 1: SUBTRACT (B ⊕ 1 = B', C0 = 1)
            </text>
            {[3, 2, 1, 0].map((bit, idx) => {
              const x = 60 + idx * 145;
              return (
                <g key={bit}>
                  <text x={x + 14} y="56" fontSize="11" fill="#0f172a">A{bit}</text>
                  <line x1={x + 20} y1="60" x2={x + 20} y2="100" stroke="#0f172a" strokeWidth="1.5" />
                  <text x={x + 62} y="56" fontSize="11" fill="#0f172a">B{bit}</text>
                  <line x1={x + 68} y1="60" x2={x + 68} y2="70" stroke="#0f172a" strokeWidth="1.5" />
                  <rect x={x + 48} y="70" width="40" height="18" rx="3" fill="#fef3c7" stroke="#d97706" />
                  <text x={x + 56} y="83" fontSize="10" fill="#92400e">XOR</text>
                  <line x1={x + 68} y1="88" x2={x + 68} y2="100" stroke="#0f172a" strokeWidth="1.5" />
                  <rect x={x} y="100" width="94" height="38" rx="4" fill="#eff6ff" stroke="#1d4ed8" strokeWidth="1.5" />
                  <text x={x + 17} y="123" fontSize="11" fill="#1e3a8a" fontWeight="700">FA {bit}</text>
                  <line x1={x + 47} y1="138" x2={x + 47} y2="158" stroke="#059669" strokeWidth="1.5" />
                  <text x={x + 40} y="170" fontSize="11" fill="#065f46" fontWeight="700">S{bit}</text>
                  {idx < 3 && (
                    <>
                      <line x1={x + 94} y1="119" x2={x + 145} y2="119" stroke="#475569" strokeWidth="1.5" />
                      <text x={x + 110} y="114" fontSize="10" fill="#475569">C{3 - idx}</text>
                    </>
                  )}
                </g>
              );
            })}
            <line x1="25" y1="119" x2="60" y2="119" stroke="#dc2626" strokeWidth="1.5" />
            <text x="16" y="113" fontSize="10" fill="#dc2626" fontWeight="700">C4</text>
            <line x1="589" y1="119" x2="638" y2="119" stroke="#d97706" strokeWidth="1.5" />
            <text x="615" y="113" fontSize="10" fill="#b45309" fontWeight="700">C0=M</text>
            <text x="495" y="170" fontSize="10" fill="#dc2626" fontWeight="700">Overflow V = C4 ⊕ C3</text>
          </svg>
        </div>
      );

    case 'rtl-bus':
      return (
        <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
            RTL Transfer · Common Bus System (T: R3 ← R1)
          </div>
          <div className="rounded border border-slate-300 bg-slate-900 text-slate-100 text-center py-2 px-3 font-mono text-xs font-semibold mb-3">
            COMMON SYSTEM BUS (Data / Control Lines)
          </div>
          <div className="grid grid-cols-3 gap-3 text-center text-xs font-mono">
            <div className="rounded border border-emerald-300 bg-emerald-50 p-2.5">
              <div className="text-[11px] text-emerald-700 font-semibold">out = 1 (active)</div>
              <div className="font-bold text-slate-900 mt-1">R1 (Source)</div>
            </div>
            <div className="rounded border border-slate-200 bg-white p-2.5">
              <div className="text-[11px] text-slate-400">idle</div>
              <div className="font-bold text-slate-700 mt-1">R2</div>
            </div>
            <div className="rounded border border-sky-300 bg-sky-50 p-2.5">
              <div className="text-[11px] text-sky-700 font-semibold">load = 1 (clk edge)</div>
              <div className="font-bold text-slate-900 mt-1">R3 (Destination)</div>
            </div>
          </div>
        </div>
      );

    case 'microprogrammed-cu':
      return (
        <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
            Control Architecture · Microprogrammed Control Unit &amp; 20-Bit Format
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5 text-xs mb-3">
            <div className="rounded border border-amber-300 bg-amber-50 p-2.5">
              <div className="font-semibold text-amber-900">1. Next-Address MUX</div>
              <div className="text-[11px] text-slate-700 mt-1">CAR+1 · AD branch · Mapping(IR) · SBR</div>
            </div>
            <div className="rounded border border-sky-300 bg-sky-50 p-2.5">
              <div className="font-semibold text-sky-900">2. CAR Register</div>
              <div className="text-[11px] text-slate-700 mt-1">Holds address of next microinstruction</div>
            </div>
            <div className="rounded border border-indigo-300 bg-indigo-50 p-2.5">
              <div className="font-semibold text-indigo-900">3. Control Memory (ROM)</div>
              <div className="text-[11px] text-slate-700 mt-1">Stores fetch/execute micro-routines</div>
            </div>
            <div className="rounded border border-emerald-300 bg-emerald-50 p-2.5">
              <div className="font-semibold text-emerald-900">4. CDR / Control Signals</div>
              <div className="text-[11px] text-slate-700 mt-1">Outputs signals to CPU datapath</div>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-1 font-mono text-[11px] text-center">
            <div className="rounded border border-slate-300 bg-white py-1.5 font-semibold">F1 (3b)</div>
            <div className="rounded border border-slate-300 bg-white py-1.5 font-semibold">F2 (3b)</div>
            <div className="rounded border border-slate-300 bg-white py-1.5 font-semibold">F3 (3b)</div>
            <div className="rounded border border-amber-300 bg-amber-50 py-1.5 font-semibold">CD (2b)</div>
            <div className="rounded border border-amber-300 bg-amber-50 py-1.5 font-semibold">BR (2b)</div>
            <div className="rounded border border-sky-300 bg-sky-50 py-1.5 font-semibold">AD (7b)</div>
          </div>
        </div>
      );

    case 'restoring-division':
      return (
        <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
            Hardware &amp; Flow · Restoring Binary Division (A, Q, M, Counter n)
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs font-mono">
            <div className="rounded border border-slate-200 bg-white p-2.5">
              <div className="font-bold text-slate-900">Init</div>
              <div className="text-slate-600 mt-1">A = 0 (n+1 bits), Q = Dividend, M = Divisor</div>
            </div>
            <div className="rounded border border-sky-200 bg-sky-50 p-2.5">
              <div className="font-bold text-sky-900">Shift &amp; Subtract</div>
              <div className="text-sky-800 mt-1">Shift left (A, Q) → A ← A − M</div>
            </div>
            <div className="rounded border border-amber-200 bg-amber-50 p-2.5">
              <div className="font-bold text-amber-900">Test &amp; Restore</div>
              <div className="text-amber-800 mt-1">If A &lt; 0: Q0=0, A←A+M | Else Q0=1</div>
            </div>
          </div>
        </div>
      );

    case 'io-organization':
      return (
        <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
            I/O Architecture · Shared I/O Bus &amp; Device Interface Registers
          </div>
          <div className="grid grid-cols-2 gap-3 mb-2.5 text-xs text-center">
            <div className="rounded border border-emerald-300 bg-emerald-50 py-2 font-bold text-emerald-950">CPU</div>
            <div className="rounded border border-sky-300 bg-sky-50 py-2 font-bold text-sky-950">Main Memory</div>
          </div>
          <div className="rounded border border-slate-300 bg-slate-900 text-white text-center py-1.5 text-xs font-mono mb-2.5">
            I/O BUS : Data Lines | Address Lines | Control Lines
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-center">
            {['Interface 1 · Keyboard', 'Interface 2 · Display', 'Interface 3 · Printer', 'Interface 4 · Disk'].map(
              (item) => (
                <div key={item} className="rounded border border-amber-200 bg-amber-50/70 p-2 text-slate-800 font-medium">
                  {item}
                  <div className="text-[10px] text-slate-500 font-mono mt-0.5">Data | Status | Ctrl</div>
                </div>
              )
            )}
          </div>
        </div>
      );

    case 'dma':
      return (
        <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
            DMA Controller Block Diagram · Direct I/O ↔ Memory Transfer
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs items-center mb-2.5">
            <div className="rounded border border-emerald-300 bg-emerald-50 p-3 text-center">
              <div className="font-bold text-emerald-950">CPU</div>
              <div className="font-mono text-[11px] text-emerald-800 mt-1">← BR / HOLD | BG / HLDA →</div>
            </div>
            <div className="rounded border border-sky-300 bg-sky-50 p-3">
              <div className="font-bold text-sky-950 text-center mb-1.5">DMA Controller (DMAC)</div>
              <div className="space-y-1 font-mono text-[11px]">
                <div className="rounded bg-white border border-sky-200 px-2 py-0.5">Address Register</div>
                <div className="rounded bg-white border border-sky-200 px-2 py-0.5">Word Count Register</div>
                <div className="rounded bg-white border border-sky-200 px-2 py-0.5">Control Register</div>
              </div>
            </div>
            <div className="rounded border border-rose-300 bg-rose-50 p-3 text-center">
              <div className="font-bold text-rose-950">I/O Device (Disk)</div>
              <div className="font-mono text-[11px] text-rose-800 mt-1">DMA Request ↔ DMA Ack</div>
            </div>
          </div>
          <div className="rounded border border-slate-300 bg-white px-3 py-1.5 text-center font-mono text-[11px] text-slate-700">
            System Bus (Address | Data | RD/WR) ───▶ Main Memory (bypasses CPU during block transfer)
          </div>
        </div>
      );

    case 'memory-hierarchy':
      return (
        <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
            Memory Hierarchy Pyramid · Speed ↑ vs. Capacity ↑
          </div>
          <div className="flex flex-col items-center space-y-1.5 text-xs font-medium">
            <div className="w-44 rounded border border-emerald-300 bg-emerald-50 py-1.5 text-center text-emerald-950">
              CPU Registers (&lt; 1 ns)
            </div>
            <div className="w-60 rounded border border-sky-300 bg-sky-50 py-1.5 text-center text-sky-950">
              Cache Memory SRAM (1–10 ns)
            </div>
            <div className="w-76 max-w-full rounded border border-indigo-300 bg-indigo-50 py-1.5 text-center text-indigo-950">
              Main Memory DRAM (50–100 ns)
            </div>
            <div className="w-96 max-w-full rounded border border-amber-300 bg-amber-50 py-1.5 text-center text-amber-950">
              Secondary Storage: SSD / HDD (0.1–10 ms)
            </div>
            <div className="w-full max-w-md rounded border border-rose-300 bg-rose-50 py-1.5 text-center text-rose-950">
              Backup: Magnetic Tape / Optical (Seconds)
            </div>
          </div>
        </div>
      );

    case 'cache-mapping':
      return (
        <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
            16-Bit Address Formats · 64K Memory, 16-Word Block, 128 Cache Lines
          </div>
          <div className="space-y-2 font-mono text-xs">
            <div className="grid grid-cols-12 gap-1 items-center">
              <span className="col-span-3 text-slate-600 font-sans font-semibold">Direct:</span>
              <span className="col-span-3 rounded border border-amber-300 bg-amber-50 py-1 text-center">Tag (5)</span>
              <span className="col-span-4 rounded border border-sky-300 bg-sky-50 py-1 text-center">Index (7)</span>
              <span className="col-span-2 rounded border border-emerald-300 bg-emerald-50 py-1 text-center">Word (4)</span>
            </div>
            <div className="grid grid-cols-12 gap-1 items-center">
              <span className="col-span-3 text-slate-600 font-sans font-semibold">Associative:</span>
              <span className="col-span-7 rounded border border-amber-300 bg-amber-50 py-1 text-center">Tag (12)</span>
              <span className="col-span-2 rounded border border-emerald-300 bg-emerald-50 py-1 text-center">Word (4)</span>
            </div>
            <div className="grid grid-cols-12 gap-1 items-center">
              <span className="col-span-3 text-slate-600 font-sans font-semibold">2-Way Set:</span>
              <span className="col-span-4 rounded border border-amber-300 bg-amber-50 py-1 text-center">Tag (6)</span>
              <span className="col-span-3 rounded border border-rose-300 bg-rose-50 py-1 text-center">Set (6)</span>
              <span className="col-span-2 rounded border border-emerald-300 bg-emerald-50 py-1 text-center">Word (4)</span>
            </div>
          </div>
        </div>
      );

    case 'pipeline-4stage':
      return (
        <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-4 overflow-x-auto">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
            Space–Time Diagram · 4-Stage Pipeline (7 Cycles vs. 16 Non-Pipelined)
          </div>
          <table className="w-full text-center font-mono text-xs border-collapse tabular-nums">
            <thead>
              <tr className="text-slate-500 border-b border-slate-200">
                <th className="py-1.5 text-left pr-3">Instr</th>
                {['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map((t) => (
                  <th key={t} className="py-1.5 px-1.5">{t}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[0, 1, 2, 3].map((row) => (
                <tr key={row} className="border-b border-slate-100 last:border-0">
                  <td className="py-1.5 text-left font-semibold text-slate-800 pr-3">I{row + 1}</td>
                  {[0, 1, 2, 3, 4, 5, 6].map((col) => {
                    const stageIdx = col - row;
                    const stages = ['IF', 'ID', 'EX', 'WB'];
                    const colors = [
                      'bg-sky-100 text-sky-900 border-sky-300',
                      'bg-emerald-100 text-emerald-900 border-emerald-300',
                      'bg-amber-100 text-amber-900 border-amber-300',
                      'bg-rose-100 text-rose-900 border-rose-300',
                    ];
                    return (
                      <td key={col} className="p-1">
                        {stageIdx >= 0 && stageIdx < 4 ? (
                          <div className={`rounded border py-1 font-semibold ${colors[stageIdx]}`}>
                            {stages[stageIdx]}
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
      );

    case 'pipeline-datapath':
      return (
        <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-4 overflow-x-auto">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
            5-Stage Pipelined Datapath · Pipeline Registers Isolate Each Stage
          </div>
          <div className="flex items-stretch gap-1.5 min-w-[540px] text-center font-mono text-[11px]">
            <div className="flex-1 rounded border border-sky-300 bg-sky-50 p-2">
              <div className="font-bold text-sky-900">IF</div>
              <div className="text-slate-600 mt-1">PC + Instr Mem</div>
            </div>
            <div className="w-7 rounded bg-slate-800 text-white flex items-center justify-center font-bold text-[10px]">
              IF/ID
            </div>
            <div className="flex-1 rounded border border-emerald-300 bg-emerald-50 p-2">
              <div className="font-bold text-emerald-900">ID</div>
              <div className="text-slate-600 mt-1">RegFile + Control</div>
            </div>
            <div className="w-7 rounded bg-slate-800 text-white flex items-center justify-center font-bold text-[10px]">
              ID/EX
            </div>
            <div className="flex-1 rounded border border-amber-300 bg-amber-50 p-2">
              <div className="font-bold text-amber-900">EX</div>
              <div className="text-slate-600 mt-1">ALU + Forward MUX</div>
            </div>
            <div className="w-8 rounded bg-slate-800 text-white flex items-center justify-center font-bold text-[10px]">
              EX/MEM
            </div>
            <div className="flex-1 rounded border border-indigo-300 bg-indigo-50 p-2">
              <div className="font-bold text-indigo-900">MEM</div>
              <div className="text-slate-600 mt-1">Data Mem</div>
            </div>
            <div className="w-8 rounded bg-slate-800 text-white flex items-center justify-center font-bold text-[10px]">
              MEM/WB
            </div>
            <div className="flex-1 rounded border border-rose-300 bg-rose-50 p-2">
              <div className="font-bold text-rose-900">WB</div>
              <div className="text-slate-600 mt-1">Write RegFile</div>
            </div>
          </div>
        </div>
      );

    case 'raw-hazard':
      return (
        <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-4 overflow-x-auto">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
            RAW Data Hazard · Stalling (2 Bubbles) vs. Data Forwarding (0 Stalls)
          </div>
          <table className="w-full text-center font-mono text-xs border-collapse tabular-nums">
            <thead>
              <tr className="text-slate-500 border-b border-slate-200">
                <th className="py-1.5 text-left pr-3">Instruction</th>
                {['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8'].map((t) => (
                  <th key={t} className="py-1.5 px-1">{t}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-1.5 text-left font-semibold pr-3">ADD R1,R2,R3</td>
                <td className="p-1"><div className="rounded bg-sky-100 border border-sky-300 py-0.5">IF</div></td>
                <td className="p-1"><div className="rounded bg-emerald-100 border border-emerald-300 py-0.5">ID</div></td>
                <td className="p-1"><div className="rounded bg-amber-100 border border-amber-300 py-0.5">EX</div></td>
                <td className="p-1"><div className="rounded bg-indigo-100 border border-indigo-300 py-0.5">MEM</div></td>
                <td className="p-1"><div className="rounded bg-rose-100 border border-rose-300 py-0.5">WB</div></td>
                <td /><td /><td />
              </tr>
              <tr>
                <td className="py-1.5 text-left font-semibold pr-3">SUB R4,R1,R5 (No Fwd)</td>
                <td />
                <td className="p-1"><div className="rounded bg-sky-100 border border-sky-300 py-0.5">IF</div></td>
                <td className="p-1"><div className="rounded bg-red-100 border border-red-300 text-red-800 py-0.5">STALL</div></td>
                <td className="p-1"><div className="rounded bg-red-100 border border-red-300 text-red-800 py-0.5">STALL</div></td>
                <td className="p-1"><div className="rounded bg-emerald-100 border border-emerald-300 py-0.5">ID</div></td>
                <td className="p-1"><div className="rounded bg-amber-100 border border-amber-300 py-0.5">EX</div></td>
                <td className="p-1"><div className="rounded bg-indigo-100 border border-indigo-300 py-0.5">MEM</div></td>
                <td className="p-1"><div className="rounded bg-rose-100 border border-rose-300 py-0.5">WB</div></td>
              </tr>
            </tbody>
          </table>
        </div>
      );
  }
};
