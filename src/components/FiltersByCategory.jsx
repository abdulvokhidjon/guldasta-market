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
import { useState } from "react";

export default function FiltersByCategory({
  categories,
  handleEnableToFilter,
}) {
  const [open, setOpen] = useState(false);

  const handleFocus = () => {
    setOpen(!open);
  };

  return (
    <div className="mb-5">
      <div className="">
        <Label onClick={handleFocus}>Turkumlash</Label>
        <Select
          open={open}
          onValueChange={handleEnableToFilter}
          onOpenChange={handleFocus}
          name="category"
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Turkum bo'yicha" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Turkumlar</SelectLabel>
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
