'use client';

import { useState } from 'react';

export const AmountSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(0); // 0 to 100

  // Non-linear mapping: 0-75% → 0-50k, 75-100% → 50k-1M
  const positionToAmount = (position: number): number => {
    if (position <= 75) {
      // First 3 quarters: 0 to 50,000
      return Math.round((position / 75) * 50000);
    } else {
      // Last quarter: 50,000 to 1,000,000
      return Math.round(50000 + ((position - 75) / 25) * 950000);
    }
  };

  const formatAmount = (amount: number): string => {
    if (amount >= 1000000) return '1 000 000 €';
    if (amount >= 1000) {
      return `${Math.floor(amount / 1000)} ${(amount % 1000).toString().padStart(3, '0')} €`;
    }
    return `${amount} €`;
  };

  const amount = positionToAmount(sliderPosition);

  return (
    <div className="w-full px-4">
      {/* Value Display */}
      <div className="text-center mb-8">
        <div className="text-4xl font-bold text-green-500 mb-2">
          {formatAmount(amount)}
        </div>
        <div className="text-sm text-gray-500">
          Montant à investir
        </div>
      </div>

      {/* Slider Container */}
      <div className="relative w-full h-16 flex items-center touch-none">
        {/* Track */}
        <div className="absolute w-full h-2 bg-gray-200 rounded-full overflow-hidden pointer-events-none">
          {/* Progress */}
          <div
            className="h-full bg-green-500 rounded-full transition-all duration-150 ease-out"
            style={{ width: `${sliderPosition}%` }}
          />
        </div>

        {/* Thumb */}
        <input
          type="range"
          min="0"
          max="100"
          step="0.1"
          value={sliderPosition}
          onChange={(e) => setSliderPosition(parseFloat(e.target.value))}
          className="absolute w-full h-2 appearance-none bg-transparent cursor-pointer z-10 touch-none
                     [&::-webkit-slider-thumb]:appearance-none
                     [&::-webkit-slider-thumb]:w-6
                     [&::-webkit-slider-thumb]:h-6
                     [&::-webkit-slider-thumb]:rounded-full
                     [&::-webkit-slider-thumb]:bg-white
                     [&::-webkit-slider-thumb]:border-4
                     [&::-webkit-slider-thumb]:border-green-500
                     [&::-webkit-slider-thumb]:shadow-lg
                     [&::-webkit-slider-thumb]:cursor-pointer
                     [&::-webkit-slider-thumb]:transition-transform
                     [&::-webkit-slider-thumb]:hover:scale-110
                     [&::-webkit-slider-thumb]:active:scale-95
                     [&::-moz-range-thumb]:w-6
                     [&::-moz-range-thumb]:h-6
                     [&::-moz-range-thumb]:rounded-full
                     [&::-moz-range-thumb]:bg-white
                     [&::-moz-range-thumb]:border-4
                     [&::-moz-range-thumb]:border-green-500
                     [&::-moz-range-thumb]:shadow-lg
                     [&::-moz-range-thumb]:cursor-pointer
                     [&::-moz-range-thumb]:transition-transform
                     [&::-moz-range-thumb]:hover:scale-110
                     [&::-moz-range-thumb]:active:scale-95"
        />
      </div>

      {/* Scale Markers */}
      <div className="flex justify-between text-xs text-gray-400 px-1">
        <span>0 €</span>
        <span>1M €</span>
      </div>
    </div>
  );
};
