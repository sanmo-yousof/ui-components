"use client"

import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import FileUpload from "@/components/FileUpload";
import FilterSelect from "@/components/FilterSelect";
import Input from "@/components/Input";
import OTPInput from "@/components/OtpInput";
import Pagination from "@/components/Pagination";
import ProfileImageUpload from "@/components/ProfileImageUpload";
import RangeInput from "@/components/RangeInput";
import Search from "@/components/Search";
import Select from "@/components/Select";
import Textarea from "@/components/Textarea";
import ThemeToggle from "@/components/ThemeToggle";
import { useState } from "react";

export default function Home() {
  const [currentPage,setCurrentPage] = useState(1)
  return (
    <div className="space-y-8 flex px-4 flex-col">
      <div>
        <h2 className="text-xl font-bold border-b border-border">Button</h2>
        <div className="flex flex-wrap gap-4 py-4">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <ThemeToggle />
          <Pagination
            currentPage={currentPage}
            totalPages={10}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold border-b border-border">Input</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 py-4 flex-wrap">
          <Input label="Name" />
          <Input
            required
            type="email"
            placeholder="Enter Your Email"
            label="Email"
          />

          <Input
            required
            type="number"
            placeholder="Enter Your Age"
            label="Age"
          />

          <Input
            required
            type="password"
            placeholder="Passowrd"
            label="Password"
          />

          <Select
            label="Country"
            required
            placeholder="Select your country"
            options={[
              {
                label: "Bangladesh",
                value: "bangladesh",
              },
              {
                label: "India",
                value: "india",
              },
              {
                label: "Pakistan",
                value: "pakistan",
              },
            ]}
          />

          <DatePicker
            label="Date"
            // selectPreviousDate={true}
            // onChange={(date) => {
            //   console.log(date);
            // }}
          />

          <OTPInput />
        </div>
        <div className="flex flex-col md:items-center md:flex-row gap-4">
          <Textarea label="Description" required />
          <FileUpload label="Profile Image" accept="image/png" required />
          <FileUpload multiple label="Gallery" accept="image/png" />
          <ProfileImageUpload
            image="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=785&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            // onChange={(file) => {
            //   console.log(file);
            // }}
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold border-b border-border">Search</h2>
        <div className="flex py-4 flex-wrap gap-4">
          <RangeInput />
          <FilterSelect
            options={[
              { label: "All", value: "all" },
              { label: "Pending", value: "pending" },
              { label: "In Progress", value: "inProgress" },
              { label: "Complete", value: "complete" },
            ]}
            label="Status"
          />
          <Search label="Search" />
          <Search showButton label="Search" />
        </div>
      </div>
    </div>
  );
}
