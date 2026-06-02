import { Separator } from "@/components/ui/separator";
import Container from "../container/Container";
import NavbarRight from "./navbar-right";
export default function Navbar(){
    return (
        <Container className="">
            <div className=" flex justify-between items-center w-full">
                <div >
                    <h1 className="font-bold text-xl cursor-pointer">Drago<span className="text-blue-600">Event</span></h1>
                </div>
                <div className="flex items-center space-x-2">
                   <NavbarRight/> 
                </div>
            </div>
            <Separator className="w-full mt-4"/>
        </Container>
    )
}