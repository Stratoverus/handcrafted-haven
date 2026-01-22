import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function RegisterPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Create an Account</h1>
        <p className="text-stone-500">Enter your information to create an account</p>
      </div>
      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="first-name" className="text-sm font-medium leading-none">First name</label>
            <Input id="first-name" placeholder="John" required />
          </div>
          <div className="space-y-2">
            <label htmlFor="last-name" className="text-sm font-medium leading-none">Last name</label>
            <Input id="last-name" placeholder="Doe" required />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium leading-none">Email</label>
          <Input id="email" placeholder="m@example.com" type="email" required />
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium leading-none">Password</label>
          <Input id="password" type="password" required />
        </div>
        <Button className="w-full" type="submit">Sign Up</Button>
      </form>
      <div className="text-center text-sm text-stone-500">
        Already have an account?{" "}
        <Link href="/login" className="underline underline-offset-4 hover:text-stone-900">
          Sign in
        </Link>
      </div>
    </div>
  )
}
