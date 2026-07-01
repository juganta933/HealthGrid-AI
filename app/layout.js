import "./globals.css";
import LayoutShell from "./components/LayoutShell";

export const metadata = {
  title: "HealthGrid AI",
  description: "Smart Health Center Management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <LayoutShell>{children}</LayoutShell>
    </html>
  );
}