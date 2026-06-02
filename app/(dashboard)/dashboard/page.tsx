import { getCategories } from "@/features/dashboard/actions/getCategories";
import DashboardClient from "@/features/dashboard/components/dashboardClient";
import { ensureUserExists } from "@/lib/ensureUser";

export default async function Dashboard() {
  await ensureUserExists(); 
  const categories = await getCategories();
  return (
    <DashboardClient categories={categories} /> 
  );
} 
