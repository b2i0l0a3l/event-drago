import Link from "next/link";
import { ModeToggle } from "@/components/toggle/ModeToggle";
import { Button } from "@/components/ui/button";
import AuthButton from "./authButton";


export default function NavbarRight(){
    
    return (
        <div className="flex items-center space-x-2">
            <ModeToggle />
            <Button type="button" variant={"ghost"}><Link href={"/pricing"}>Pricing</Link></Button>
            <AuthButton/>
        </div>
    )
}