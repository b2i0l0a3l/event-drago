import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import crypto from "crypto"
import { PrismaClient } from "@prisma/client/extension"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


