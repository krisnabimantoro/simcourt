import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/(user)/mahasiswa/components/app-sidebar-mahasiswa";
import GetToken from "@/lib/get-token";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const token = await GetToken()
  return (
    <SidebarProvider>
      <AppSidebar
        token={{
          token: token || "",
        }}
      />
      <main>
        {/* <SidebarTrigger /> */}
        <div className="p-2"></div>
        {children}
      </main>
    </SidebarProvider>
  );
}
