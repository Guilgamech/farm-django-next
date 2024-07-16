import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Logo({ href, className }: { href: string, className?: string }) {
  return <div className="flex">
    <Link href={href} className={cn(
      "flex justify-center items-center",
      className ?? ""
    )}>
      <span className="felx relative">
      <span className="w-full text-primary uppercase">Empresa Agricola</span>
      </span>

    </Link>
  </div>
}