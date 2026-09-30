import axios from "axios";
import { toast } from "react-hot-toast";

interface ApiErrorResponse {
  success?: boolean;
  message?: string;
  errors?: Record<string, string | string[]>;
}

export const showApiErrorToast = (error: unknown) => {
  if (!axios.isAxiosError<ApiErrorResponse>(error)) {
    toast.error("Something went wrong");
    return;
  }

  const data = error.response?.data;

  if (!data) {
    toast.error("Something went wrong");
    return;
  }

  if (data.errors && Object.keys(data.errors).length > 0) {
    const firstError = Object.values(data.errors)[0];

    toast.error(
      Array.isArray(firstError) ? firstError[0] : firstError
    );

    return;
  }

  toast.error(data.message || "Something went wrong");
};