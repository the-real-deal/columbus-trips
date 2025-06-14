import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/auth/AuthContext"
import { useCallback, useState } from "react"
import { useNavigate } from "react-router"
import { UserCog } from "lucide-react"
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

  const { user, login, logout } = useAuth()
  const [ username, setUsername ] = useState<string>("")
  const [ password, setPassword ] = useState<string>("")
  const navigator = useNavigate()
  
  const handleLogIn = useCallback((isAdmin: boolean) => {
    const success = login(isAdmin, username)
    if (!success) {
      return
    }
    navigator(isAdmin ? "/dashboard" : "/home")
  }, [username])
  
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Accedi al tuo account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Inserisci le tue credenziali nei campi sottostanti
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            onChange={(e) => setUsername(e.target.value)}
            required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input id="password" type="password" required />
        </div>
        <Button onClick={() => { handleLogIn(false) }} type="submit" className="w-full">
        Log In
      </Button>
      <small className="text-center">
        <Button variant={"link"} onClick={() => { handleLogIn(true) }}>
          <UserCog className="inline pe-1" /> Effettua accesso come admin
        </Button>
      </small>
    </div>
    </form >
  )
}
