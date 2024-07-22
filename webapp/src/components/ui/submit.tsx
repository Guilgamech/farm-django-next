"use client"
import { useFormStatus } from 'react-dom'
import { Button } from './button'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from './tooltip'

export function SubmitButton({ className = "", text = "Enviar", loadingText = "Enviando", icon = null, loadingIcon = null }: { className?: string, text?: string, loadingText?: string, icon?: ReactNode | null, loadingIcon?: ReactNode | null }) {
  const { pending } = useFormStatus()
  return (
    <div className='flex'>
      <Button type="submit" className={cn(className, "submit-btn gap-2")} disabled={pending}>
        {(icon && loadingIcon) ? <>
          {pending ? <>{loadingIcon} <span>{loadingText}</span></> : <>{icon} <span>{text}</span></>}
        </> : <>
          {pending ? <span>{loadingText}</span> : <span>{text}</span>}
        </>}
      </Button>
    </div>
  )
}

export function BasicSubmit({ className = "", text = "Enviar", loadingText = "Enviando", icon = null, loadingIcon = null, pending }: { className?: string, text?: string, loadingText?: string, icon?: ReactNode | null, loadingIcon?: ReactNode | null, pending:boolean }) {
  return (
    <div className='flex'>
      <Button type="submit" className={cn(className, "submit-btn gap-2")} disabled={pending}>
        {(icon && loadingIcon) ? <>
          {pending ? <>{loadingIcon} <span>{loadingText}</span></> : <>{icon} <span>{text}</span></>}
        </> : <>
          {pending ? <span>{loadingText}</span> : <span>{text}</span>}
        </>}
      </Button>
    </div>
  )
}