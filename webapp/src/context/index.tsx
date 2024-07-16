"use client"
import { ReactNode, useEffect } from "react";
export default function GlobalStore({ children }: { 
  children: ReactNode;
}) {
  useEffect(() => {
  }, [])
  return children;
}