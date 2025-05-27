import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/(user)/mahasiswa/components/app-sidebar-mahasiswa";
import GetToken from "@/lib/get-token";
import GetFetchingData from "@/lib/fetching-component-get";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const token = await GetToken();
  const getUser = await GetFetchingData("v1/auth/me");

  return (
    <SidebarProvider>
      <AppSidebar
        token={{
          token: token || "",
        }}
        dataUser={{
          dataUser: getUser?.data || {},
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
