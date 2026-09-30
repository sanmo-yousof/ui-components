import Container from "@/components/layout/Container";
import auth from "@/assets/auth/auth.png";
import Image from "next/image";
import Logo from "@/components/shared/Logo";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/shared/SectionHeading";
import SectionSubTitle from "@/components/typo/SectionSubTitle";
import Checkbox from "@/components/ui/CheckBox";
import CustomLink from "@/components/shared/CustomLink";
import Divider from "@/components/ui/Divider";
import facebook from "@/assets/social/facebook.png";
import google from "@/assets/social/google.png";
import instagram from "@/assets/social/instagram.png";
import linkedin from "@/assets/social/linkedin.png";

export default function Page() {
  const socialImages = [google, facebook, instagram, linkedin];

  return (
    <Container className="lg:flex items-center">
      <div className="lg:w-1/2 md:w-[390px]  mx-auto ">
        <Logo />
        <SectionHeading
          className="mb-6 mt-2"
          title="Login Account!"
          subTitle="Welcome back login your account."
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
          <div>
            <Input
              type="password"
              label="Password"
              required
              placeholder="Enter Password"
            />
          </div>
          <div className="flex justify-between">
            <Checkbox label="Remind Me" />
            <CustomLink text="Forgot Passowrd" href="/forgot-password" />
          </div>
          <Button className="my-4 w-full">Login</Button>

          <SectionSubTitle>
            Don't have an account?{" "}
            <CustomLink className="ml-2" href="/register" text="Register" />
          </SectionSubTitle>

          <Divider className="mt-6" text="Or continue with" />
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
  );
}
