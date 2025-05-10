import ColumbusBrand from "./ui/columbus-brand";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "./ui/navigation-menu";
import { NavLink } from "react-router";

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
                to: "/groups"
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
    return <>
        <div className="flex flex-row justify-center p-5 gap-10">
            <ColumbusBrand />
            <NavigationMenu className={className} viewport>
                <NavigationMenuList>
                    {
                        links.map(link => <NavigationMenuItem>
                            <NavigationMenuTrigger>{link.title} </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                {link.hrefs.map(href =>
                                    <NavigationMenuLink>
                                        <NavLink to={href.to}>
                                            {href.text}
                                        </NavLink>
                                    </NavigationMenuLink>
                                )
                                }
                            </NavigationMenuContent>
                        </NavigationMenuItem>)
                    }
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    </>

}