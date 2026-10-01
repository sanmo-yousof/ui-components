import Container from "@/components/layout/Container";
import auth from "@/assets/auth/auth.png";
import Image from "next/image";
import Logo from "@/components/shared/Logo";
import SectionHeading from "@/components/shared/SectionHeading";
import UserLoginForm from "@/components/form/UserLoginForm";

export default function Page() {
  return (
    <Container className="lg:flex items-center">
      <div className="lg:w-1/2 md:w-[390px]  mx-auto ">
        <Logo />
        <SectionHeading
          className="mb-6 mt-2"
          title="Login Account!"
          subTitle="Welcome back login your account."
        />
        <UserLoginForm/>
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
