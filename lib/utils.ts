import { techMap } from "@/constants/techMap";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getDeviconClassName = (techName: string) => {
  const commonTechName = techName.replace(/[ .]/g, "").toLowerCase();
  return techMap[commonTechName]? `${techMap[commonTechName]} colored`: "devicon-devicon-plain" ;
}