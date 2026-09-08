import Button from "@/components/Button";
import Input from "@/components/Input";
import Label from "@/components/Label";
import Select from "@/components/Select";
import Image from "next/image";

export default function Home() {
  return (
    <div className="space-y-8 flex flex-col">
      <div>
        <h2 className="text-xl font-bold">Button</h2>
        <div className="flex flex-wrap gap-4">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold">Input</h2>
        <div className="flex gap-4">
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
        </div>
      </div>
    </div>
  );
}
