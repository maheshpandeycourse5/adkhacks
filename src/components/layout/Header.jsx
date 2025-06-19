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
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
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
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAT4AAACfCAMAAABX0UX9AAAA/1BMVEXx+v81NTX0/f/5///2///w/P/r9Pn0+/8kIiEvLi4lJCNqbW7T298ZFxUfHRyprrHN1NiyuLwpKCiZnqHFzdBmaWvy9/YAAAAoJydBQEH///9KS0zk7PHw///q+P/m9/fz9O316tHc8v/25sX0795/g4X8zHLV7/9xzP6j3f9bXV52eXu7wsWa4ruHi43P8OT52qD61pBp15a16c/43q7/vT370IH07dr34rrB6f9Owv6+5f/X8+uL369526Kl5cP61YzI798AxVf9x2H7z3qK1f47vv5syv6a2v5KwP6V4bev58lI0ID/vCKRlZgeyGZx2Zxb1Iz+wk//uzP/tgCDX8lAAAAMNklEQVR4nO2dC0PiuBaA06QhDULRghUEoTxEQZAiiCjgY8XR1V1nZ+b+/99yT9qiID46ygjFfLvM1BDY9puTnCRNZxGSSCQSiUQikUgkEolEIpFInsLmfQJBhpFjIgW+l2zh6tvVTnbepxFMWOHbbnY3e/VtRwbgeyAnlc3dzd6JDL/3wCrHuxj+KdzI6HsH5Lq3e7y7c907IfM+lWDS24HGWziWjfd9kApk3oqMPT9kn+vhZOD5hO1cZRmTSeK9MFS56RVG4fY07GQYvg5jJLtzs/vtpCB+ItdZp2z0IidzPr3FhrFC5aayU6hU3PZLYKzMsr2CeGXhRf6e9xkuMIzsXPWyjBSuRvkD9LHs9c41vP7eqRyfIBl9L8IKNz3CRPJ4GKMIfb2TG2fYjLOVk4LU9wKMVCrOsh7rPeZd6Os2d642Mcw8sug6uyv1vQArXBU8bWOjFnx1clKpXO9md29g6nZ1Vdidz9ktOmzn5tkVZUwIjAJJ4fr46phgzPCnn1kQwL3X52QMHT87G5EIWK/3lhwp70XYcU+uB7wbJhdCP8SVtPd+WKUg9X2AGzkaeT+sIhehPgCTeeMDsMKbQz7Jy7BjuXngA7BeYd6nEGRYQWaOjyCbrkQiWTJCAKJTxdh946FK6JmPuSCVfNkJnRrTOOfVqXIcUaA8GhFiyIrBub6mjr8fivIRqfX9BFWnvuFLoMbCiqJo8aeXT6ocynVPHxxrT/UpD3BDS619TX+uPiX8tHhVUyb1hV/WJ4huf8mlaE+fcT8ZPdgJvjf1pYEUd75Bnwrgr4CnTzEy492/WtMVH/qSGECZmMKnvuGL8KBvovGpae5Hn9vkMcmI2uHYFwy/kT7FTbJe4Zqm+NcHFWJJSCB7X7D3c/Sl0nD1K2N6nH7Nvz4cgbbOq19VHxfRpq3iibIY968vI/StL68+5vDMG46qKIK+jqe9y8cZMZbbi2i+9ak1bTp5LwvgLde6q5+1LnLTCj19ItPqNff6SRx6Mi2z6l/fpqgw+viSwfr107NGLpfrX9QH9Qs6KdDTR5zwc0poyAkl4lcfVkkcqnqfXjIYHZx5QSeab+5iMMiNh6CrL6QmtNG8jOwbICaj+tBniKNMbUUk743EMgZf7jQ3EW5gsD5oPAr09LmKOBJZFAqS9wT70KdEAV0Tn9Riy5g42GB6nZ3Rs0enI304Aj6ScYLINgSfAgV+9I3QUksZe4jW2YixUsZubz2BI32I7ImpQ0YVGsOg0Zc+bjizE14jS2kPsdv+3cDhbqIRs9zgzjH6oA9HkiL8nCSagjf86OP7+/sp0XTXP/OaPg2GWoN/+ptO8PUHF5OdYOO0wcb0uSmDR8QQRJjyoy+sEoJS4mAJl6sYFUkiNzjrO/5yg8lekKEcGteHxIBFTNXcIYgvfeILEmJxJrp0fR9rDcAb9HOi+d7eDs6evVc7po/E3dUDzRn/+tWHVCfXpELTt0sCDIz3Wl66eCZ3PDKmD4VSTh5wp/6+9dEQn1rwcsqpVSyaM72oTwOaas7XzoBxfWpMNF/dbYe+9Xlrq9Gnc7Zux87nh9ZHr2QesNypz30V4/oQVrhirLsantGHR6DJOa+6N9V8ab5cRBRRyw5im2anfmtO6FNX00rVW3N/qk9JPaCs4gl92G2+Y8ul7NymwttWszSrS/pE2FnD756eCX1IRTDdcA+n9D2iP9HnrU4/LrlY5ZITdNRuBzH4no5RXmFS3xiv6NOe6vOar+IFrjV0/vPU7BSDaI/d9X9D34ambTyrT7zh6luPauNsJEDfhjh4qJxR4Meo12266ZbmOxYyAYxooCySwab/yplV4Lk3QuINxyuOrE4iSlcnPoed2omxPwbW/LfZbNp2s3l+3myXntlFs6i06he/sZ3RS6WvvYGf8FD2pPb4z8W2CVHngMxSe2iXAiKQDQ78N94/x4QtGEO3O/mteZ3Lb5H7neD7NChqD61AROAi2gOoNTwKhL+Zg9WZrKjQ8/zC+/sDf7kUztzHZvJFtAPTENpd4JUE1rideebASlif0RaWMpzbcCbf9Edg5O6vixnHn3MfaWM2+vJtWlrcqRy7uDv9PrjzPef1SUqbRfSJxEuH1LY+fkJ/CHb61/fv3/+qzzj8MvFZ9H12E/S1S8OFDT7o+VqD77ct/70f5FQs/h4bd41UhQPslo5SrSoqqGR0KxKOnlRxvuGh5mtQ69Kipc7itt3f7vtwJB6PkMj2elwFiYn7vb37VQKl96Nww7H4fUSNxeMJoUbFa9sre/GMuA8cjzv7SSEy487KgroGNd/YoGuWLfTvQq8B/l7mxYmovr8aNYw0wZmqngxrSX0lhEN6Mrrm3jHaSOqYVLWo2PpNaoqW1MJhPa7izEbSWZAhe7pWFXc2oSD65v5ms4wOF3sPtBj3Pfp7wyROaLyaNsL6OgkpnCvb+wpPrqtk33C3O8KBca+SdW6APjWhcy19v6LxaIzgKk+K8At528LVWpivvzm4pnn78qMXOHtyudEvSMRfrjHqXugb81/Qp3BtZS1WI3tgDEHHtsL1GomEFe6EkqGEI9jTl1F4OAZ9n3jiKEPiSWHYuc8r7iORbe5ndzg9Ly9c18fODhgiP5wNLYht3vZvnU1p4ub4wdv6jG0CvX6GK1pGxViN6HxPJWlHhggpaJmuPnVN49DGMSZxQ1sThpWQCM90mq9ApKa57ufZBLM4o4ueHezsvwvWOKizM+j3Wren/Rbq39bp3aDhR5+zyC7uV6ScddEI52nxo/AGoSh2/Xn69jjfF1UiMcPYJ2BYS6gqN+63uY5xRHvY3hs02NnFj82DRv2uhQ76A3Ta/4/+yPWhCf+gPvSlxCKxKrbkRh2gCwyJu2d6RM0Yzg0NT1+aK4ZTQ+dhiNh7w4iTiKYnamEtQWLJZFAfLGJnjdZBq18fgMBWa7PeB4GbDJ3Vf09fasVjH7s5YzMWhjAb08erXo31mopXdV4l94YGedrY36xyLajPFUH0sVvUqLfq7KJxmjtwoq/RukX/+NcXCyvpTeLi7LAK8zQ4CYvnFTx965Brx6qI3i5UTe4RUuVpHOXVgNqDmW7O2bjMWoMGa9Uvci2UG9zR+t0FbfnUJx5t8cLHvWcBsWbUuOgAH/TFjdGzL04ViLxkzNBqqngoOJY0gtp2R6M7hrx8i9y/wXtyBPgsD/pELEFDVWHelnF2uUA4cgi+tUd9kB2UcA1Sr6omIqr7WegOMxhnkjzt3RT+WjzqU2tRJbySiCT2dXfCAcmDO7vFR/pgaBdWjHgkslaNurfExYYsMWZRxfOrqYDm3Y8wFn0kDjlX0zQD5hRO+G1Dot13GqSnDyI0zA1dC/Ok4szXoIYm6oq84/upomDdNH8dnNiIcu/uNqlVdU3T+cqqt8NvI+puM0CkGt0QdjCOp0QV5T7kLBLUNqJRt+OEqqs+265t/4kLmROhTCYzOoZpWaIWCT0sOz2+BUfeHsBQpJaAKo/lbrYZ+5bXofTw5xKF32RbgrSAn33r8RCPr+o9FFOfTbLY7pbL7fy7zlRCf/776/Dw1+XWMgXg50Ht0uXh4eFluyn9vQe81YHwO/x1KPW9A/qzA/IOy+ZCL9gvLFuXvw5N87AcjL1WCwekjv8d5f+3eAvOAcG0LMysBd7jIlkq/A6oJc9B7U5nIs3SrnOvyLTmcjpBg14iBP9acAi9nuj02kVqmbRYRNTpA01z9CiDZBp6uWVeok63Ca/L0pAetbvFol22ICbb9nk+X7aHFi3P+ywXFlo+/8mKzeKw1EEd6uqjll3s5lF5iw3z7a0jO9+V3eMLQPTZxWLbxLTThjDbEvrsYtvVhztgjnZk8L0INEwKTbXdZOVmx7LtTrebP+82i/nhUdc+PxL6ioF8avWTgLQAGcOiRza289Ry/ie08Cu8qGlSOFjk3aaLA813X3guSy6e+kI20Y9iYetI/F76ereEPwqFCYdtlkviIUvbElM5GY7+ydtF87LbLudLdpfmUb6bz9ty0dQ3eVzGw6PS0Dwym1YHl4tWGVvzPqngkG9fmh3LPN8qtctH57iDKPw+75MKDNZwC0bPltmhZdo86rAhRuKHeZ9WYGhD31c0zSJMMvJWEXWRacvxsn8eV03pVIlEIpFIJBKJRCKRSCQSiUQikUgkEolEIpFIJBKJJBD8H34rIlK0nOwfAAAAAElFTkSuQmCC"
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
                <NavigationMenuLink className={navigationMenuTriggerStyle()} active={pathname === "/dashboard"} asChild>
                  <Link href="/"> Dashboard </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className={navigationMenuTriggerStyle()} active={pathname === "/files"} asChild>
                  <Link href="/files"> Files</Link>
                </NavigationMenuLink>
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
                <span className="hidden md:inline-block font-medium">John Doe</span>
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
              <DropdownMenuItem className="text-red-600 cursor-pointer" onClick={handleLogout}>
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
