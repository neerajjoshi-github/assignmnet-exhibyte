import { DateRange } from "react-day-picker";
import { DatePicker } from "./DatePicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const sortOptions = [
  {
    value: "total:des",
    label: "Twubric : High to Low",
  },
  {
    value: "total:asc",
    label: "Twubric : Low to High",
  },
  {
    value: "friends:des",
    label: "Friends : High to Low",
  },
  {
    value: "friends:asc",
    label: "Friends : Low to High",
  },
  {
    value: "influence:des",
    label: "Influence : High to Low",
  },
  {
    value: "influence:asc",
    label: "Influence : Low to High",
  },
  {
    value: "chirpiness:des",
    label: "Chirpiness : High to Low",
  },
  {
    value: "chirpiness:asc",
    label: "Chirpiness : Low to High",
  },
];

interface FiltersProps {
  date: DateRange;
  setDate: (date: DateRange) => void;
  sortBy: string;
  setSortBy: (sortOption: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
  date,
  setDate,
  sortBy,
  setSortBy,
}) => {
  return (
    <div className="w-full flex flex-col md:flex-row gap-10 items-center justify-between">
      <DatePicker date={date} setDate={setDate} />
      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="w-[300px]">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filters;
