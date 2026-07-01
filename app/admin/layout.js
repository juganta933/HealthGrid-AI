"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  const isAdminLoginPage = pathname === "/admin/login";

  if (isAdminLoginPage) {
    return <>{children}</>;
  }

  return (
    <div>
      <AdminSidebar />
      <main>{children}</main>
    </div>
  );
}