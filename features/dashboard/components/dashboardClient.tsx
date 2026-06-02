import Container from "@/components/layout/container/Container";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Category } from "@prisma/client";
import AddCategoryButton from "./AddCategoryButton";
import CategoryList from "./CategoryList";

export default async function DashboardClient({categories}: {categories: Category[]}) {
    return (
        <Container>
            <div className="flex flex-col w-full">
                <div className="flex items-center justify-between w-full">
                    <h1 className="text-3xl font-semibold">Dashboard</h1>
                    <AddCategoryButton />  
                </div>
                <Separator className="w-full mt-4" />
                <CategoryList categories={categories} />
            </div>  
        </Container>
    )
}