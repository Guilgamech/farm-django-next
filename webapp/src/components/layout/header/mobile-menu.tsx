import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {Menu} from "lucide-react"
import VerticalScroll from "../vertical-scroll";
import { Navigation } from "../navigation";

export default function MobileMenu(){
  return <div className="lg:hidden flex">
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="noStyle" size="noStyle" className="w-fit h-fit border-none">
          <Menu className="w-8 h-8 p-1 text-primary"/>
          <span className="sr-only">Open Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-64 px-0">
        <SheetHeader>
          <SheetTitle className="text-primary pb-5 pl-[42px] text-start">Menu</SheetTitle>
        </SheetHeader>
        <VerticalScroll>
          <Navigation />
        </VerticalScroll>
        
      </SheetContent>
    </Sheet>
  </div>
}