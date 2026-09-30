"use client"
import React from 'react'
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import SectionSubTitle from "@/components/typo/SectionSubTitle";
import CustomLink from "@/components/shared/CustomLink";
import { useForm } from "react-hook-form";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { showApiErrorToast } from "@/utils/apiErrorToast";


interface RegisterForm {
  name: string;
  email: string;
  password: string;
}


export default function UserRegisterForm() {
    const [loading,setLoading] = useState(false);
    
      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<RegisterForm>();
    
      const onSubmit = async (data: RegisterForm) => {
    
        try {
          setLoading(true)
          const response = await api.post("/register", data);
          toast.success("Account Created");
        } catch (error) {
          showApiErrorToast(error);
        }finally{
          setLoading(false)
        }
        
      };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 lg:w-[380px]">
          <div>
            <Input
              type="text"
              label="Name"
              disabled={loading}
              required
              placeholder="Enter Your Name"
              {...register("name", {
              required: "Name is required",
            })}
            error={errors.name?.message}
            />
          </div>
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
          <div>
            <Input
              type="password"
              label="Password"
              disabled={loading}
              required
              placeholder="Enter Password"
               {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            error={errors.password?.message}
            />
          </div>
          <Button loading={loading} type="submit" className="my-4 w-full">Register</Button>

          <SectionSubTitle>
            Already have an account?{" "}
            <CustomLink className="ml-2" href="/login" text="Login" />
          </SectionSubTitle>
        </form>
  )
}
