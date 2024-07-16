"use client"
import { Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";

export const a11yProps = (text: string) => {
  return {
    id: `appoinments-tab-${text}`,
    'aria-controls': `appoinments-tabpanel-${text}`,
  };
}
export function SectionTabs({
  tabs,
  handleSelected,
  containerLabel,
  className
}:{
  tabs:{ [key in number]: {value:string, label?:string} };
  handleSelected: (value:string)=>void;
  containerLabel?: string
  className?:string
}) {
  if(Object.keys(tabs).length === 0){
    throw new Error("Please enter at least one tab")
  }
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    handleSelected(tabs[newValue].value)
  };
  useEffect(()=>{
    handleSelected(tabs[value].value)
  },[])
  
  return <Tabs value={value} onChange={handleChange} aria-label={containerLabel ?? "Tabs"}
    variant="scrollable"
    scrollButtons="auto"
    className={className ?? "tabs-appoinment"}
  >
    {Object.keys(tabs).map((el)=>{
      let index = Number(el);
      return <Tab key={`tab-${tabs[index].value}`} label={tabs[index].label ?? tabs[index].value } {...a11yProps(tabs[index].value)} className="capitalize"/>
    })}
  </Tabs>
}