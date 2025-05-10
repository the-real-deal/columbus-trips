import CustomGlobe from "@/components/custom-globe";
import NoNavLayout from "@/components/layout/no-nav-layout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function LandingPage() {
    const navigator = useNavigate()
    return <NoNavLayout>
        <main className="z-1 absolute h-full w-full text-white flex flex-col items-center justify-center">
            <h1 className="font-bold text-4xl md:text-8xl lg:text-9xl text-shadow-lg/30 text-shadow-[--primary]-300">Columbus Trips</h1>
            <h4 className=" text-md mt-2 md:text-2xl md:mt-4">Pianifica il tuo giro del mondo in 80 tappe.</h4>
            <Button onClick={() => {
                navigator("/auth")
            }} className="uppercase mt-10" 
            size={"lg"}
            variant={"default"}>Inizia ora</Button>
        </main>
        <CustomGlobe/>
    </NoNavLayout>
}