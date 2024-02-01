import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="inset absolute h-full w-full flex items-center justify-center">
      <SignIn />;
    </div>
  )
}