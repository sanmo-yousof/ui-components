import Button from "@/components/Button";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h2 className="text-xl font-bold">Button</h2>
      <div className="flex flex-wrap gap-4">
        <Button>Primary</Button>
        <Button  variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
      </div>
    </div>
  );
}
