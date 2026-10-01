"use client";
import React, { useState } from "react";
import Button from "@/components/ui/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import { showApiErrorToast } from "@/utils/apiErrorToast";
import OTPInput from "../ui/OtpInput";

interface VerifyCodeForm {
  otp: string;
}

export default function VerifyCodeForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
const email = searchParams.get("email") || "";
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyCodeForm>({ defaultValues: { otp: "" } });

  const onSubmit = async (data: VerifyCodeForm) => {
    try {
      setLoading(true);
    const res = await api.post("/verify-code", { email, code: data.otp });
    const resetToken = res.data?.data?.resetToken;
    sessionStorage.setItem("resetToken", resetToken);
      router.push(`/reset-password?email=${encodeURIComponent(email)}`);
      console.log(data.otp);
      toast.success("OTP verified successfully");
  
    } catch (error) {
      showApiErrorToast(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 lg:w-[350px]">
      <div>
        <Controller
          name="otp"
          control={control}
          rules={{
            required: "OTP is required",
            minLength: {
              value: 6,
              message: "Please enter the complete 6-digit OTP",
            },
          }}
          render={({ field }) => (
            <OTPInput
              length={6}
              value={field.value}
              onChange={field.onChange}
              error={errors.otp?.message}
              label="OTP"
              required
            />
          )}
        />
      </div>
      <Button type="submit" loading={loading} className="my-4 w-full">
        Verify Code
      </Button>
    </form>
  );
}
