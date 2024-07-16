import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-primary bg-white hover:bg-white",
        account: "sm:border sm:border-primary sm:bg-white sm:hover:bg-white",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        tableSort: "bg-transparent px-0 transition-[unset] hover:bg-transparent",
        tableOption: "bg-white border border-blueSemidarkAccent hover:bg-white hover:cursor-pointer text-[15px] text-blueSemidarkAccent",
        pagination: "text-primary fw-[700] border-0 hover:bg-primary hover:text-white",
        noStyle:"w-fit h-fit p-0 m-0 border-none",
        option: "bg-transparent border border-transparent hover:border-primary rounded-full"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        tableSort: "h-10 px-0 py-2",
        tableOption: "h-[43px] w-[110px] flex items-center justify-between pl-[18px] pr-[10px]",
        pagination: "h-fit px-2 py-1",
        paginationIcon: "px-1 h-[28px] flex items-center",
        account: "flex sm:w-[178px] sm:h-[38px] items-center justify-center sm:justify-between sm:px-3 ",
        noStyle:""
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }), "")}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
