import Button from "@/components/Button";
import FilterSelect from "@/components/FilterSelect";
import Input from "@/components/Input";
import OTPInput from "@/components/OtpInput";
import RangeInput from "@/components/RangeInput";
import Search from "@/components/Search";
import Select from "@/components/Select";
import Textarea from "@/components/Textarea";
import ThemeToggle from "@/components/ThemeToggle";


export default function Home() {
  return (
    <div className="space-y-8 flex flex-col">
      <div>
        <h2 className="text-xl font-bold border-b border-border">Button</h2>
        <div className="flex flex-wrap gap-4 py-4">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <ThemeToggle/>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold border-b border-border">Input</h2>
        <div className="flex gap-4 py-4 flex-wrap">
          <Input  label="Name" />
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

          <OTPInput />
         
        </div>
         <Textarea  label="Description" required/>
      </div>

      <div>
        <h2 className="text-xl font-bold border-b border-border">Search</h2>
        <div className="flex py-4 flex-wrap gap-4">
          <RangeInput/>
          <FilterSelect
          
            options={[
              { label: "All", value: "all" },
              { label: "Pending", value: "pending" },
              { label: "In Progress", value: "inProgress" },
              { label: "Complete", value: "complete" },
            ]}
            label="Status"
          />
          <Search  label="Search"/>
          <Search  showButton label="Search"/>
        </div>

      </div>  
    </div>
  );
}
