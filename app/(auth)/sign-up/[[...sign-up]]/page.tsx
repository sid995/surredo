import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="inset absolute h-full w-full flex items-center justify-center">
      <SignUp />;
    </div>
  )
}