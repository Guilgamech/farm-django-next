"use client";

import * as React from "react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectLabel, SelectValue, SelectGroup } from "@/components/ui/select";

// Define un tipo genérico para el select
interface SelectComponentProps<T> {
  options: T[];
  value: T;
  onChange: (value: T) => void;
  label: string;
  getOptionLabel: (option: T) => string;  // Función para obtener el label de la opción
  getOptionValue: (option: T) => string;  // Función para obtener el value de la opción
}

const SelectComponent = <T,>({ options, value, onChange, label, getOptionLabel, getOptionValue }: SelectComponentProps<T>) => {
  const handleChange = (value: string) => {
    const selectedOption = options.find(option => getOptionValue(option) === value);
    if (selectedOption) {
      onChange(selectedOption);
    }
  };
  

  return (
    <Select value={getOptionValue(value)} onValueChange={handleChange}>
      <SelectTrigger>
        <SelectValue>{getOptionLabel(value)}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {options.map(option => (
            <SelectItem key={getOptionValue(option)} value={getOptionValue(option)}>
              {getOptionLabel(option)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );

  
};

export {
  SelectComponent
};
