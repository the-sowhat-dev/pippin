import * as SliderPrimitive from '@radix-ui/react-slider';
import React from 'react';

interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onValueChange: (value: [number, number]) => void;
  breakPoint?: {
    value: number;
    percentage: number; // 0-100
  };
}

export const RangeSlider = ({
  min,
  max,
  step = 10000,
  value,
  onValueChange,
  breakPoint,
}: RangeSliderProps) => {
  const isNonLinear = !!breakPoint;

  const toSlider = React.useCallback(
    (val: number) => {
      if (!isNonLinear || !breakPoint) return val;
      const { value: bpValue, percentage: bpPercent } = breakPoint;

      if (val <= bpValue) {
        // Map min..bpValue to 0..bpPercent
        return ((val - min) / (bpValue - min)) * bpPercent;
      }
      // Map bpValue..max to bpPercent..100
      return bpPercent + ((val - bpValue) / (max - bpValue)) * (100 - bpPercent);
    },
    [isNonLinear, breakPoint, min, max]
  );

  const fromSlider = React.useCallback(
    (sliderVal: number) => {
      if (!isNonLinear || !breakPoint) return sliderVal;
      const { value: bpValue, percentage: bpPercent } = breakPoint;

      if (sliderVal <= bpPercent) {
        // Map 0..bpPercent to min..bpValue
        return min + (sliderVal / bpPercent) * (bpValue - min);
      }
      // Map bpPercent..100 to bpValue..max
      return bpValue + ((sliderVal - bpPercent) / (100 - bpPercent)) * (max - bpValue);
    },
    [isNonLinear, breakPoint, min, max]
  );

  const sliderValue = isNonLinear
    ? ([toSlider(value[0]), toSlider(value[1])] as [number, number])
    : value;

  const handleValueChange = (newValues: number[]) => {
    const realValues = isNonLinear ? newValues.map(fromSlider) : newValues;
    onValueChange([realValues[0], realValues[1]]);
  };

  return (
    <SliderPrimitive.Root
      className="relative flex items-center select-none touch-none w-full h-5"
      value={sliderValue}
      max={isNonLinear ? 100 : max}
      min={isNonLinear ? 0 : min}
      step={isNonLinear ? 0.1 : step}
      onValueChange={handleValueChange}
    >
      <SliderPrimitive.Track className="bg-gray-200 relative grow rounded-full h-[3px]">
        <SliderPrimitive.Range className="absolute bg-blue-600 rounded-full h-full" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className="block w-5 h-5 bg-white border border-gray-200 shadow-sm rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-transform hover:scale-110"
        aria-label="Min"
      />
      <SliderPrimitive.Thumb
        className="block w-5 h-5 bg-white border border-gray-200 shadow-sm rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-transform hover:scale-110"
        aria-label="Max"
      />
    </SliderPrimitive.Root>
  );
};
