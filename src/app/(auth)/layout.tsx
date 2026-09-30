import Container from "@/components/layout/Container";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen h-full flex-col flex justify-center">
      {children}
    </div>
  );
}
