import { ReactNode } from "react";

export function TitleActionBooking({title, subtitle, subaction, action}:{title:ReactNode, subtitle:ReactNode, subaction?:ReactNode, action:ReactNode}){
  return <div className="flex flex-col-reverse md:flex-row items-center md:items-start justify-between w-full">
    <div className="w-full max-w-[495px]">
      {title}
      {subtitle}
      {subaction && subaction}
    </div>    
    <div className="w-full max-w-[310px] flex justify-center items-start pb-4 md:pb-0">
      {action}
    </div>
  </div>
}