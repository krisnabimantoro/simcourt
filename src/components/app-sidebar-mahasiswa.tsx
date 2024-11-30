import { Book, Calendar, Gavel, Home, Inbox, ScrollText, Search, Settings } from "lucide-react";
import { SidebarHeader } from "@/components/ui/sidebar";
import Image from "next/image";
import Typography from "./ui/typhography";
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
import { title } from "process";
import { url } from "inspector";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: Home,
  },
  {
    title: "KRS Kelas",
    url: "#",
    icon: Book,
  },
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
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

// const subItem = [
//   {
//     title: "KRS Kelas",
//     url: "",
//   },
// ];

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
        <div className="flex items-center justify-center w-full h-full">
          <Image src="/logo.png" width={60} height={250} alt="Logo Laboratorium Hukum" />
          <div className="ml-3 flex flex-col items-start">
            <Typography.H3>Sim-Court</Typography.H3>
            <Typography.P>Sistem lorem ipsum</Typography.P>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
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
      </SidebarContent>
    </Sidebar>
  );
}
