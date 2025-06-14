import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import ColumbusBrand from "./ui/columbus-brand";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "./ui/navigation-menu";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "@/auth/AuthContext";

type NavbarProps = {
    className?: string
}

type LinkSet = {
    title: string,
    hrefs: Array<{ text: string, to: string }>
}

const links: LinkSet[] = [
    {
        title: "Itinerari",
        hrefs: [
            {
                text: "I miei itinerari",
                to: "/my-trips"
            },
            {
                text: "Crea itinerario",
                to: "/new-trip"
            },
            {
                text: "Tutti gli itinerari",
                to: "/trips"
            },
        ]
    },
    {
        title: "Gruppi",
        hrefs: [
            {
                text: "I miei gruppi",
                to: "/my-groups"
            },
            {
                text: "Cerca gruppi",
                to: "/my-groups"
            },
        ]
    },
    {
        title: "Around the globe",
        hrefs: [
            {
                text: "Suggerisci P.O.I.",
                to: "/new-poi"
            },
            {
                text: "I miei P.O.I.",
                to: "/my-pois"
            },
        ]
    }
]

export default function Navbar({ className }: NavbarProps) {
    const { user, login, logout } = useAuth()
    const navigator = useNavigate()
    return <>
        <div className="flex flex-row justify-between px-10 p-5 gap-10">
            <ColumbusBrand />
            <NavigationMenu className={className} viewport>
                <NavigationMenuList>
                    {
                        links.map(link => <NavigationMenuItem>
                            <NavigationMenuTrigger>{link.title}</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                {
                                    link.hrefs.map(href =>
                                        <NavigationMenuLink className="min-w-75">
                                            <NavLink to={href.to}>
                                                {href.text}
                                            </NavLink>
                                        </NavigationMenuLink>)
                                }
                            </NavigationMenuContent>
                        </NavigationMenuItem>)
                    }
                </NavigationMenuList>
            </NavigationMenu>
            <div>
                <Button onClick={() => 
                {
                    logout()
                    navigator(import.meta.env.BASE_URL)
                }}><LogOut/> Log Out</Button>
            </div>
        </div>
    </>

}