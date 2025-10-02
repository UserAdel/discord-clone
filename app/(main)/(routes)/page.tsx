import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "@/components/theme-provider";

export default function Home() {
  return (
    <div className="">
      <UserButton afterSignOutUrl="/" />
      <ModeToggle />
    </div>
  );
}
