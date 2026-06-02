import Link from "next/link";
import Container from "./layout/container/Container";
import { Separator } from "./ui/separator";
import { ArrowLeft } from "lucide-react";

export default function PageTitle({ title ,children}: { title: string,children?:React.ReactNode }) {
    return (
        <>
        <Container>
            <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-4">
                <Link href="/dashboard" className="p-2 hover:bg-accent border dark:border-slate-800 hover:text-accent-foreground transition-colors rounded-full cursor-pointer">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">{title}</h1>
                </div> 
                {children}
            </div>
        </Container>
            <Separator className="w-full bg-muted-foreground/50" /> 
        </>
    );
}   