
import React from 'react';

interface SeatSelectorProps {
  selectedSeats: string[];
  onToggleSeat: (seatId: string) => void;
}

const SeatSelector: React.FC<SeatSelectorProps> = ({ selectedSeats, onToggleSeat }) => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const columns = Array.from({ length: 12 }, (_, i) => i + 1);

  // Simulated occupied seats (e.g., deterministic but random-looking)
  const isOccupied = (row: string, col: number) => {
    const seed = row.charCodeAt(0) + col;
    return (seed % 7 === 0 || seed % 11 === 0);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full h-8 bg-gradient-to-b from-emerald-500/20 to-transparent rounded-t-[50%] mb-12 flex items-center justify-center border-t-2 border-emerald-400/50">
        <span className="text-[10px] uppercase tracking-[0.4em] text-emerald-400 font-bold">SCREEN</span>
      </div>

      <div className="grid gap-2 mb-8 select-none">
        {rows.map(row => (
          <div key={row} className="flex gap-2 items-center">
            <span className="w-6 text-xs text-emerald-100/50 font-bold">{row}</span>
            <div className="flex gap-2">
              {columns.map(col => {
                const seatId = `${row}${col}`;
                const occupied = isOccupied(row, col);
                const selected = selectedSeats.includes(seatId);

                return (
                  <button
                    key={seatId}
                    disabled={occupied}
                    onClick={() => onToggleSeat(seatId)}
                    className={`
                      w-6 h-6 sm:w-8 sm:h-8 rounded-t-md text-[8px] sm:text-[10px] transition-all duration-200 flex items-center justify-center
                      ${occupied 
                        ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed border-b-2 border-zinc-900' 
                        : selected
                          ? 'bg-emerald-400 text-emerald-950 border-b-2 border-emerald-600 scale-110 shadow-lg shadow-emerald-500/40'
                          : 'bg-emerald-900/40 hover:bg-emerald-700 text-emerald-100/80 border-b-2 border-emerald-800 hover:scale-105'
                      }
                    `}
                  >
                    {col}
                  </button>
                );
              })}
            </div>
            <span className="w-6 text-xs text-emerald-100/50 font-bold text-right">{row}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-6 text-xs text-emerald-100/60 flex-wrap justify-center bg-[#022c22]/50 p-4 rounded-xl border border-emerald-900/30">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-emerald-900/40 border-b-2 border-emerald-800 rounded-t-sm"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-emerald-400 border-b-2 border-emerald-600 rounded-t-sm"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-zinc-800 border-b-2 border-zinc-900 rounded-t-sm"></div>
          <span>Occupied</span>
        </div>
      </div>
    </div>
  );
};

export default SeatSelector;
