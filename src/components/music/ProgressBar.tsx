import { Slider } from "@/components/ui/slider";

interface ProgressBarProps {
  progress: number;
  onProgressChange: (value: number[]) => void;
}

export function ProgressBar({ progress, onProgressChange }: ProgressBarProps) {
  return (
    <Slider
      value={[progress]}
      onValueChange={onProgressChange}
      max={100}
      step={0.1}
      className="w-full cursor-pointer"
    />
  );
}