"use client";

import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "./ui";
import Link from "next/link";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="flex justify-between px-3 md:px-10 py-3 shadow-sm border-b">
      <p className="p-1 text-lg">
        <Link href="/">Tutor Hub</Link>
      </p>
      <NavigationMenu>
        <NavigationMenuList className="gap-5">
          <NavigationMenuItem></NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Get Started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="p-4 w-32">
                <div className="mb-4">
                  <NavigationMenuLink href="/login">Login</NavigationMenuLink>
                </div>
                <div>
                  <NavigationMenuLink href="/signup">
                    Sign Up
                  </NavigationMenuLink>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Navbar;
