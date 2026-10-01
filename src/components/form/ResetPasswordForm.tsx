"use client";
import React, { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import { showApiErrorToast } from "@/utils/apiErrorToast";

interface ResetPasswordForm {
  newPassword: string;
  confirmPassword: string;
}

export default function ResetPasswordForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ResetPasswordForm>();

  const onSubmit = async (data: ResetPasswordForm) => {
    try {
      setLoading(true);
      const resetToken = sessionStorage.getItem("resetToken");
      if (!email || !resetToken) {
        toast.error("Session expired. Please start again.");
        return router.replace("/forgot-password");
      }
      await api.post("/reset-password", {
        email,
        resetToken,
        newPassword: data.newPassword,
      });
      sessionStorage.removeItem("resetToken");
      toast.success("Password reset successfully");
      router.replace("/login");
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
          type="password"
          label="New Password"
          disabled={loading}
          required
          placeholder="New Password"
          {...register("newPassword", {
            required: "New password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          error={errors.newPassword?.message}
        />
      </div>
      <div>
        <Input
          type="password"
          label="Confirm Password"
          disabled={loading}
          required
          placeholder="Confirm Password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
            validate: (value) =>
              value === getValues("newPassword") || "Passwords do not match",
          })}
          error={errors.confirmPassword?.message}
        />
      </div>
      <Button type="submit" loading={loading} className="my-4 w-full">
        Save Password
      </Button>
    </form>
  );
}
