import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/(user)/mahasiswa/components/app-sidebar-mahasiswa";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        {/* <SidebarTrigger /> */}
        <div className="p-2"></div>
        {children}
      </main>
    </SidebarProvider>
  );
}
