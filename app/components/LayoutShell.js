"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutShell({ children }) {
  const pathname = usePathname();

  const isAppPanel =
    pathname.startsWith("/admin/dashboard") || pathname.startsWith("/staff");

  return (
    <body className="min-h-screen bg-[#e9fffb]">
      {!isAppPanel && <Navbar />}

      <main className="min-h-screen">{children}</main>

      {!isAppPanel && <Footer />}
    </body>
  );
}