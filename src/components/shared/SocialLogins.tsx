
import React from 'react'
import facebook from "@/assets/social/facebook.png";
import google from "@/assets/social/google.png";
import instagram from "@/assets/social/instagram.png";
import linkedin from "@/assets/social/linkedin.png";
import Image from "next/image";

export default function SocialLogins() {
     const socialImages = [google, facebook, instagram, linkedin];
  return (
    <div className="flex gap-3">
        {socialImages.map((item, index) => (
          <Image
            key={index}
            width={35}
            height={35}
            alt="social"
            src={item}
            className="object-contain"
          />
        ))}
      </div>
  )
}
