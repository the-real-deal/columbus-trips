import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import CheckBoxWithText from "./checkbox-with-text"

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Sign Up to Columbus Trips!</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Join our community!
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="username">Username</Label>
          <Input id="username" type="text" placeholder="Example: giogiodix" required />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Example: m@example.com" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input id="password" type="password" required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <CheckBoxWithText 
            title="Advanced profiling" 
            description="Accept to agree to our Terms of Advanced Data Profiling." 
            onCheckedChange={() => {}}/>
          <CheckBoxWithText 
            title="Direct marketing" 
            description="Accept to receive the latest updates about the software!" 
            onCheckedChange={() => {}}/>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <CheckBoxWithText 
            title="Data sharing with social network" 
            description="Accept to share your activity on social networks!" 
            onCheckedChange={() => {}}/>
          <CheckBoxWithText 
            title="Data sharing with third party companies" 
            description="Accept to share your activity with third party companies!" 
            onCheckedChange={() => {}}/>
        </div>
        <Button type="submit" className="w-full">
          Sign Up
        </Button>
      </div>
    </form>
  )
}
