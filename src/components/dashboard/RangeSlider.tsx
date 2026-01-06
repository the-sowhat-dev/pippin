import * as SliderPrimitive from '@radix-ui/react-slider';

interface RangeSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onValueChange: (value: [number, number]) => void;
}

export const RangeSlider = ({ min, max, value, onValueChange }: RangeSliderProps) => (
  <SliderPrimitive.Root
    className="relative flex items-center select-none touch-none w-full h-5"
    value={value}
    max={max}
    min={min}
    step={1000}
    onValueChange={onValueChange}
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
