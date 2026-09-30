import Container from '@/components/layout/Container'
import Logo from '@/components/shared/Logo'
import SectionHeading from '@/components/shared/SectionHeading'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Image from 'next/image'
import React from 'react'
import auth from "@/assets/auth/auth.png";

export default function Page() {
  return (
    <Container className="lg:flex items-center">
          <div className="lg:w-1/2 md:w-[390px]  mx-auto ">
            <Logo />
            <SectionHeading
              className="mb-6 mt-2"
              title="Forgot Password!"
              subTitle="Enter your email and get code"
            />
            <form className="space-y-3 lg:w-[380px]">
              <div>
                <Input
                  type="email"
                  label="Email"
                  required
                  placeholder="Enter Your Email"
                />
              </div>            
              <Button className="my-4 w-full">Send Code</Button>
             
            </form>
          </div>
    
          <div className="hidden lg:block lg:w-1/2">
            <Image
              src={auth}
              alt="Auth"
              width={500}
              height={500}
              className="w-full h-auto"
            />
          </div>
        </Container>
  )
}
