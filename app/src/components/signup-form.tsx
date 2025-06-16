"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import CheckBoxWithText from "./checkbox-with-text"
import { Checkbox } from "./ui/checkbox"
import useDbContext from "@/lib/useDbContext"

type Theme = {
  value: string
  description: string
  interests: []
  poiThemes: []
  activities: []
  tickets: []
  users: []
}

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    profiling: false,
    marketing: false,
    socialSharing: false,
    thirdPartySharing: false,
    documentNumber: "",
    name: "",
    surname: "",
    birthDate: "2001-09-11",
    residenceCity: "",
    street: "",
    streetNumber: 0,
    preferences: [] as string[]
  })

  const dbInfo = useDbContext()
  const [themes, setThemes] = useState<Theme[]>([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // Simulazione fetch dinamico da API
    fetch(dbInfo.baseAddress().concat("/Common/categories"))
      .then(res => res.json())
      .then(data => setThemes(data))
      .catch(console.error)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleCheckbox = (field: keyof typeof formData) => (checked: boolean) => {
    setFormData(prev => ({ ...prev, [field]: checked }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const response = await fetch(dbInfo.baseAddress().concat("/User/new-user"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    if (response.ok) {
      alert("Account created successfully!")
    } else {
      alert("Failed to sign up.")
    }
  }

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Sign Up to Columbus Trips!</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Join our community!
        </p>
      </div>
      <div className="grid gap-4">
        <div className="grid grid-cols-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" type="text" required value={formData.username} onChange={handleChange} />
        </div>
        <div className="grid grid-cols-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required value={formData.email} onChange={handleChange} />
        </div>
        <div className="grid grid-cols-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required value={formData.password} onChange={handleChange} />
        </div>
        <div className="grid grid-cols-2">
          <Label htmlFor="name">Nome</Label>
          <Input id="name" type="text" required value={formData.name} onChange={handleChange} />
        </div>
        <div className="grid grid-cols-2">
          <Label htmlFor="surname">Cognome</Label>
          <Input id="surname" type="text" required value={formData.surname} onChange={handleChange} />
        </div>
        <div className="grid grid-cols-2">
          <Label htmlFor="documentNumber">Document N°</Label>
          <Input id="documentNumber" type="text" required value={formData.documentNumber} onChange={handleChange} />
        </div>
        <div className="grid grid-cols-2">
          <Label htmlFor="birthDate">Data di nascita</Label>
          <Input id="birthDate" type="date" required value={formData.birthDate} onChange={handleChange} />
        </div>
        <div className="grid grid-cols-2">
          <Label htmlFor="residenceCity">Città di residenza</Label>
          <Input id="residenceCity" type="text" value={formData.residenceCity} onChange={handleChange} />
        </div>
        <div className="grid grid-cols-2">
          <Label htmlFor="street">Via di residenza</Label>
          <Input id="street" type="text" value={formData.street} onChange={handleChange} />
        </div>
        <div className="grid grid-cols-2">
          <Label htmlFor="streetNumber">Numero civico</Label>
          <Input id="streetNumber" type="text" value={formData.streetNumber} onChange={handleChange} />
        </div>
        <div className="grid grid-cols-2">
          <Label>Preferenze</Label>
          <Select open={open} onOpenChange={() => setOpen(!open)}>
            <SelectTrigger className="w-[250px]">
              <SelectValue
                placeholder="Seleziona preferenze"
                className="text-left"
              >
                {formData.preferences.length
                  ? themes
                    .filter(t => formData.preferences.includes(t.value))
                    .map(t => t.value)
                    .join(", ")
                  : "Seleziona preferenze"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {themes.map(theme => (
                <div
                  key={theme.value}
                  className="flex items-center px-2 py-1 cursor-pointer hover:bg-accent"
                  onClick={(e) => {
                    e.stopPropagation()
                    setFormData(prev => {
                      const isSelected = prev.preferences.includes(theme.value)
                      return {
                        ...prev,
                        preferences: isSelected
                          ? prev.preferences.filter(t => t !== theme.value)
                          : [...prev.preferences, theme.value],
                      }
                    })
                  }}
                >
                  <Checkbox
                    checked={formData.preferences.includes(theme.value)}
                    onCheckedChange={() => { }} // prevent checkbox propagation
                    className="mr-2"
                  />
                  <span>{theme.value}</span>
                </div>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <CheckBoxWithText
            title="Advanced profiling"
            description="Accept to agree to our Terms of Advanced Data Profiling."
            onCheckedChange={() => handleCheckbox("profiling")}
          />
          <CheckBoxWithText
            title="Direct marketing"
            description="Accept to receive the latest updates about the software!"
            onCheckedChange={() => handleCheckbox("marketing")}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <CheckBoxWithText
            title="Data sharing with social network"
            description="Accept to share your activity on social networks!"
            onCheckedChange={() => handleCheckbox("socialSharing")}
          />
          <CheckBoxWithText
            title="Data sharing with third party companies"
            description="Accept to share your activity with third party companies!"
            onCheckedChange={() => handleCheckbox("thirdPartySharing")}
          />
        </div>
        <Button type="submit" className="w-full">
          Sign Up
        </Button>
      </div>
    </form>
  )
}
