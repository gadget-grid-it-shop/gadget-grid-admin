import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { jwtDecode } from "jwt-decode";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const verifyToken = (token: string) => {
  const decoded = jwtDecode(token)
  return decoded
}
