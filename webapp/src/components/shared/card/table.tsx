import { Card } from "@/components/ui/card"
import { ReactNode } from "react"

export const CardTable = ({children}:{children:ReactNode})=>{
  return <Card className="pt-6 px-5 pb-10 max-w-6xl mx-auto shadow-lg mt-6">
    {children}
  </Card>
}