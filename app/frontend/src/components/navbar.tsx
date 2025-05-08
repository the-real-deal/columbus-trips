import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "./ui/navigation-menu";

type NavbarProps = {
    className?: string
}

export default function Navbar({ className }: NavbarProps) {
    return <div className="w-full flex justify-center p-5">
        <NavigationMenu className={className} viewport>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Itinerari</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <NavigationMenuLink>Crea itinerario</NavigationMenuLink>
                        <NavigationMenuLink></NavigationMenuLink>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
        <NavigationMenu className={className} viewport>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Gruppi</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <NavigationMenuLink>I miei gruppi</NavigationMenuLink>
                        <NavigationMenuLink>Cerca gruppo</NavigationMenuLink>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    </div>

}