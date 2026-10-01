"use client";
import React, { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import { showApiErrorToast } from "@/utils/apiErrorToast";

interface ForgotPasswordForm {
  email: string;
}

export default function UserForgotPasswordForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>();

  const onSubmit = async (data: ForgotPasswordForm) => {
    try {
      setLoading(true);
      await api.post("/forgot-password",  { email: data.email });
      toast.success("Code sent to your email");
    router.push(`/verify-code?email=${encodeURIComponent(data.email)}`);
    } catch (error) {
      showApiErrorToast(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 lg:w-[380px]">
      <div>
        <Input
          type="email"
          label="Email"
          disabled={loading}
          required
          placeholder="Enter Your Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Please enter a valid email",
            },
          })}
          error={errors.email?.message}
        />
      </div>
      <Button type="submit" loading={loading} className="my-4 w-full">Send Code</Button>
    </form>
  );
}
