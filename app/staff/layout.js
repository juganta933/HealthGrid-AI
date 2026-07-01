import StaffSidebar from "../components/StaffSideBar";

export default function StaffLayout({ children }) {
  return (
    <div>
      <StaffSidebar />
      <main>{children}</main>
    </div>
  );
}