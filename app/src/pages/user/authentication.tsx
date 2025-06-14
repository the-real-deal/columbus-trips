// import { GalleryVerticalEnd } from "lucide-react"
import { LoginForm } from "@/components/login-form"
import ImagesCarousel from "@/components/images-carousel"
import { useState } from "react"
import { SignUpForm } from "@/components/signup-form"
import { Button } from "@/components/ui/button"
import ColumbusBrand from "@/components/ui/columbus-brand"

export default function AuthPage() {

  const [showSignUp, setShowSignUp] = useState(false)

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <ColumbusBrand />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            {
              showSignUp ? <>
                <SignUpForm />
                <div className="text-center text-sm mt-5">
                  Already have an account?{" "}
                  <Button onClick={() => setShowSignUp(false)} variant={"link"}>Log In</Button>
                </div>
              </> : <>
                <LoginForm />
                <div className="text-center text-sm mt-5">
                  Don&apos;t have an account?{" "}
                  <Button onClick={() => setShowSignUp(true)} variant={"link"}>Sign Up</Button>
                </div>
              </>
            }
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <ImagesCarousel />
      </div>
    </div>
  )
}
