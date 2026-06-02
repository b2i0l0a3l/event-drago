import Container from "@/components/layout/container/Container";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Category } from "@prisma/client";
import AddCategoryButton from "./AddCategoryButton";
import CategoryList from "./CategoryList";
import PageTitle from "@/components/pageTitle";

export default async function DashboardClient({
  categories,
}: {
  categories: Category[];
}) {
  return (
      <div className="flex flex-col w-full">
        <PageTitle title="Dashboard" >
          <AddCategoryButton />
        </PageTitle>
        <Container >
          <CategoryList categories={categories} />
        </Container>
      </div>
  );
}
