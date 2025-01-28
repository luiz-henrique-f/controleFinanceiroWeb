import { Label } from "../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";

export function RadioGroupItems({ value, onChange, defaultValue }: { value: string; onChange: (value: string) => void; defaultValue: string}) {
  return (
    <RadioGroup value={value} onValueChange={onChange} defaultValue={defaultValue} className="flex space-x-2">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="E" id="r1" />
        <Label htmlFor="r1">Entrada</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="S" id="r2" />
        <Label htmlFor="r2">Saída</Label>
      </div>
    </RadioGroup>
  );
}
