import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Sign In</h1>
        <p className="text-stone-500">Enter your email below to login to your account</p>
      </div>
      <form className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
          <Input id="email" placeholder="m@example.com" type="email" required />
        </div>
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Password</label>
                <Link href="#" className="text-sm font-medium underline-offset-4 hover:underline">Forgot password?</Link>
            </div>
          <Input id="password" type="password" required />
        </div>
        <Button className="w-full" type="submit">Sign In</Button>
      </form>
      <div className="text-center text-sm text-stone-500">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="underline underline-offset-4 hover:text-stone-900">
          Sign up
        </Link>
      </div>
    </div>
  )
}
