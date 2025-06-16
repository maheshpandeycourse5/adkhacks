"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  // Handle logout function
  const handleLogout = () => {
    // Add your logout logic here
    console.log("User logged out");
  };

  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className=" w-full p-2 flex h-16 items-center justify-between">
        <div className="flex items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <Image
                src="data:image/png;base64,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"
                alt="Logo"
                width={120}
                height={16}
                className="dark:invert"
                priority
              />
            </Link>
          </div>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/dashboard">
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    active={pathname === "/dashboard"}
                  >
                    Dashboard
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/files">
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    active={pathname === "/files"}
                  >
                    Files
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center ">
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatar.png" alt="User" />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:inline-block font-medium">
                  John Doe
                </span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/profile" className="flex w-full items-center">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600 cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
