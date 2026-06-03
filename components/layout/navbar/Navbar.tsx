import { Separator } from "@/components/ui/separator";
import Container from "../container/Container";
import NavbarRight from "./navbar-right";
import Link from "next/link";
import Image from "next/image";

export default function Navbar(){
    return (
        <Container className="">
            <div className=" flex justify-between items-center w-full">
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex items-center gap-2">
                        <Image src="/icon.png" alt="DragoEvent" width={28} height={28} className="rounded-lg" />
                        <h1 className="font-bold text-xl cursor-pointer">Drago<span className="text-blue-600">Event</span></h1>
                    </Link>
                </div>
                <div className="flex items-center space-x-2">
                   <NavbarRight/> 
                </div>
            </div>
            <Separator className="w-full mt-4"/>
        </Container>
    )
}