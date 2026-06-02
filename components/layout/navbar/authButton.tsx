import { SignInButton, SignUpButton, UserButton , } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import {ArrowRightIcon} from 'lucide-react'
export default async function AuthButton(){
    const {userId} =  await auth()
    return (
        <>
        {
            userId ?
                <UserButton />
            :
            <div className="flex items-center space-x-3">
                <SignInButton>
                    <Button type="button" variant="ghost" className="font-semibold text-muted-foreground hover:text-primary transition-colors">
                        Sign In
                    </Button>
                </SignInButton>
                <SignUpButton>
                    <Button type="button" className="gap-2 px-6 rounded-full font-semibold shadow-md hover:shadow-lg transition-all" variant="default">
                        Sign Up <ArrowRightIcon className="w-4 h-4" />
                    </Button>
                </SignUpButton>
            </div>
        }
        </>
    )

}