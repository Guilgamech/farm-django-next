"use client"

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { useEffect, useMemo, useState } from "react"
import { Search } from "lucide-react"

interface SelectComponentProps<T> {
  classes?: {
    trigger?: string;
    menuContainer?: string;
    menu?: string;
    option?: string;
  };
  options: T[];
  value: T | null;
  onChange: (value: T | null) => void;
  emptyOption: string; 
  placeHolderFilter?: string;
  getOptionLabel: (option: T) => string;
  getOptionValue: (option: T) => string;
}

export const SelectFilterComponent = <T,>({
  classes,
  options = [], // Ensure options is initialized to an empty array
  value,
  onChange,
  emptyOption,
  placeHolderFilter,
  getOptionLabel,
  getOptionValue
}: SelectComponentProps<T>) => {
  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState("");
  
  const selectedOptions = useMemo(() => {
    if (filter.length > 0) {
      return options.filter(option => getOptionLabel(option).toLowerCase().includes(filter.toLowerCase()))
    } else {
      return options
    }
  }, [options, filter, getOptionLabel])

  const handleFilter = (newValue: string) => {
    setFilter(newValue)
  }

  const handleChange = (newValue: string) => {
    if (value && getOptionValue(value) === newValue) {
      onChange(null)
    } else {
      const selectedOption = options.find(option => getOptionValue(option) === newValue);
      if (selectedOption) {
        onChange(selectedOption);
      }
    }
    setOpen(false);
  };


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-[200px] justify-between",
            classes?.trigger ?? ""
          )}
        >
          {value ? getOptionLabel(value) : emptyOption}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn(
        "w-[200px] p-0",
        classes?.menuContainer ?? ""
      )} align="start">
        <div className="flex items-center py-1 relative border-b px-2">
          <Input
            placeholder={placeHolderFilter ?? "Filtrar ..."}
            value={filter}
            onChange={event => handleFilter(event.target.value)}
            className="fw-[700] text-[14px] text-[#5B7556] placeholder:text-[#5B7556] pl-2 pr-9"
          />
          <div className="absolute right-3 bg-[#789C74] rounded w-8 h-8 flex justify-center items-center">
            <Search className="h-5 w-5 text-white" />
          </div>
        </div>
        {selectedOptions.length > 0 ? (
          <ul className={cn(
            "flex flex-col gap-1 max-h-[250px] px-2 py-2 mt-1 overflow-x-hidden overflow-y-auto scroll-thin",
            classes?.menu ?? ""
          )}>
            {selectedOptions.map(el => (
              <Button className={cn(
                "link-menu",
                classes?.option ?? ""
              )} key={`option-${getOptionValue(el)}`}
                aria-selected={getOptionValue(el) === (value ? getOptionValue(value) : "") ? "true" : "false"}
                onClick={() => handleChange(getOptionValue(el))}
              >
                <CheckIcon
                  className={cn(
                    "h-4 w-4 icon-select",
                    getOptionValue(el) === (value ? getOptionValue(value) : "") ? "opacity-100" : "opacity-0"
                  )}
                />
                <span>{getOptionLabel(el)}</span>
              </Button>
            ))}
          </ul>
        ) : (
          <div className="px-2 py-2 mt-1 text-center">
            No hay resultados
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
