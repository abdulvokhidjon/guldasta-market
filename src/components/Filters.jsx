import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";

export default function Filters({ categories, setCategory, category }) {
  return (
    <div className="mb-5">
      <div className="">
        <Label>Saralash</Label>
        <Select value={category} onValueChange={(value) => setCategory(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Turkum bo'yicha" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Turkumlar bo'yicha</SelectLabel>
              {categories.map((category) => {
                return (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
