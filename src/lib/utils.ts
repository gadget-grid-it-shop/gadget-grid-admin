import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { jwtDecode } from "jwt-decode";
import { TGenericErrorResponse } from "@/interface/error.interface";
import { toast } from "sonner";
import { store } from "@/redux/store";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const verifyToken = (token: string) => {
  const decoded = jwtDecode(token);
  return decoded;
};

export const globalError = (error: unknown) => {
  const typeError = error as { data: TGenericErrorResponse };

  if (typeError?.data?.errorSources?.length > 0) {
    toast.error(typeError.data?.errorSources[0]?.message);
  } else {
    toast.error("An unknown error occurred");
  }
};

export const getAccessToken = () => {
  const { token } = store.getState().auth;
  if (token) {
    return token;
  } else {
    return null;
  }
};
