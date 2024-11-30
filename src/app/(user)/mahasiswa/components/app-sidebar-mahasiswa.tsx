import { Book, ChevronDown, Gavel, Home, LogOut, ScrollText, User } from "lucide-react";
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

// Menu items.
const kemahasiswaan = [
  {
    title: "Dashboard",
    url: "/mahasiswa/dashboard",
    icon: Home,
  },
  {
    title: "KRS Kelas",
    url: "/mahasiswa/krskelas",
    icon: Book,
  },


];

const persidangan = [
  {
    title: "Perdata",
    url: "#",
    icon: Gavel,
  },
  {
    title: "Perdata Khusus",
    url: "#",
    icon: ScrollText,
  },
];

const subPerdata = [
  {
    title: "Gugatan",
    url: "#",
  },
  {
    title: "Bantahan",
    url: "#",
  },
  {
    title: "Gugatan Sederhana",
    url: "#",
  },
  {
    title: "Pemohonan",
    url: "#",
  },
];

const subPerdataKhusus = [
  {
    title: "Kepailitan",
    url: "#",
  },
  {
    title: "PKPU",
    url: "#",
  },
  {
    title: "Hak Kekayaan Intelektual",
    url: "#",
  },
  {
    title: "Pengadilan HUbungan Internasional",
    url: "#",
  },
  {
    title: "KPPU",
    url: "#",
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <CardHeaderSidebar/>
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
              {persidangan.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Collapsible defaultOpen={false} className="group/collapsible">
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton asChild>
                        <a href={item.url} className="flex items-center">
                          <item.icon />
                          <span className="">{item.title}</span>

                          <span className="ml-auto">
                            <ChevronDown />
                          </span>
                        </a>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      {item.title === "Perdata" && (
                        <SidebarMenuSub>
                          {subPerdata.map((subItemPerdata) => (
                            <SidebarMenuSubItem key={subItemPerdata.title}>
                              <SidebarMenuSubButton asChild>
                                <a href={subItemPerdata.url}>
                                  <span>{subItemPerdata.title}</span>
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      )}

                      {/* Submenu for "Perdata Khusus" */}
                      {item.title === "Perdata Khusus" && (
                        <SidebarMenuSub>
                          {subPerdataKhusus.map((subItemPerdataKhusus) => (
                            <SidebarMenuSubItem key={subItemPerdataKhusus.title}>
                              <SidebarMenuSubButton asChild>
                                <a href={subItemPerdataKhusus.url}>
                                  <span>{subItemPerdataKhusus.title}</span>
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      )}
                    </CollapsibleContent>
                  </Collapsible>
                </SidebarMenuItem>
              ))}
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
