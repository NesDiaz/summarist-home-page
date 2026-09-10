import SideNavbar from "@/components/SideNavbar";
import SearchNavbar from "@/components/SearchNavbar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="app-layout">
      <SearchNavbar />
      <SideNavbar />
      <main className="app-layout__content">{children}</main>
    </div>
  );
}