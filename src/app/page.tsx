import Index from "@/components/Dashboard";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

import { Metadata } from "next"; //will help in SEO

export const metadata: Metadata = {
  title:
    "Welcome to Molecule-Forge",
  description: "This is Next.js Home for Molecule-Forge Dashboard Template",
};

export default function Home() {
  return (
    <>
      {/* <DefaultLayout children={<h1>Welcome to the Home Page</h1>}/> */}

      <DefaultLayout>
        <Index/>
      </DefaultLayout>
    </>
  );
}
