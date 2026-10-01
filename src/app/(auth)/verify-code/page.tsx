import Container from '@/components/layout/Container'
import Logo from '@/components/shared/Logo'
import SectionHeading from '@/components/shared/SectionHeading'
import Image from 'next/image'
import React from 'react'
import otp from "@/assets/auth/otp.png";
import VerifyCodeForm from '@/components/form/VerifyCodeForm'

export default function Page() {
  return (
    <Container className="lg:flex items-center">
          <div className="lg:w-1/2 md:w-[350px]  mx-auto ">
            <Logo />
            <SectionHeading
              className="mb-6 mt-2"
              title="Verify OTP!"
              subTitle="Check your email for the OTP."
            />
            <VerifyCodeForm/>
          </div>
    
          <div className="hidden lg:block lg:w-1/2">
            <Image
              src={otp}
              alt="OTP"
              width={500}
              height={500}
              className="w-full h-auto"
            />
          </div>
        </Container>
  )
}
