"use client";

import { Book, ChevronDown, CircleHelp, LayoutDashboard, LogOut, Moon, Sun, User } from "lucide-react";
import { SidebarFooter, SidebarHeader, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "@/components/ui/sidebar";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useTheme } from "next-themes";
import { Collapsible, CollapsibleTrigger } from "../../../../components/ui/collapsible";
import { CollapsibleContent } from "@radix-ui/react-collapsible";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CardFooterSidebar, CardHeaderSidebar } from "./card-sidebar";
import { KategoriSidang } from "@/data/jenis-persidangan";

// Menu items.
const kemahasiswaan = [
  {
    title: "Dashboard",
    url: "/mahasiswa/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "KRS Kelas",
    url: "/mahasiswa/krskelas",
    icon: Book,
  },
];




export function AppSidebar() {
  const { setTheme } = useTheme();
  return (
    <Sidebar>
      <SidebarHeader>
        <CardHeaderSidebar />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Kemahasiswaan</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {kemahasiswaan.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Persidangan</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {KategoriSidang.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Collapsible defaultOpen={false} className="group/collapsible">
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton asChild>
                        <div className="flex items-center">
                          <item.icon />
                          <span className="">{item.title}</span>

                          <span className="ml-auto">
                            <ChevronDown />
                          </span>
                        </div>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem}>
                            <SidebarMenuSubButton asChild>
                              <a
                                  href={`/mahasiswa/${item.title.toLowerCase().replace(/\s+/g, "-")}/${subItem.toLowerCase().replace(/\s+/g, "-")}`}
                                >
                                  <span>{subItem}</span>
                                </a>
                              
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </Collapsible>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Sistem</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem key={"faq"}>
                <SidebarMenuButton>
                  <a href="/faq" className="flex justify-center items-center gap-2">
                    <CircleHelp width={16} height={16} />
                    FAQ
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <CardFooterSidebar />
          </DropdownMenuTrigger>

          <DropdownMenuContent side="right" className="w-[--radix-popper-anchor-width] mb-3">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={"/profile"} className="flex gap-1 w-full">
                <User /> Profle
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("light")}>
              {" "}
              <Sun /> Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              <Moon /> Dark
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex gap-1">
              {" "}
              <LogOut />
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
