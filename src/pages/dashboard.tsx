// pages/dashboard.tsx
import { UserButton } from "@clerk/nextjs";
import { Sidebar } from "~/components/sidebar";
 
export default function Dashboard() {
  return (
    <>
            <Sidebar/>
			<div>Your page's content can go here.</div>
    </>
  );
}