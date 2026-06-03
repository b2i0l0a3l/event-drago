import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

export default async function AuthButton(){
    const { userId } = await auth();
    return (
        <>
        {
            userId ?
                <UserButton />
            :
            <div className="flex items-center gap-1 sm:gap-3">
                <SignInButton>
                    <Button type="button" variant="ghost" size="sm" className="font-semibold text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm">
                        Sign In
                    </Button>
                </SignInButton>
                <SignUpButton>
                    <Button type="button" className="gap-1 sm:gap-2 px-3 sm:px-6 rounded-full font-semibold shadow-md hover:shadow-lg transition-all text-xs sm:text-sm" variant="default">
                        Sign Up <ArrowRightIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Button>
                </SignUpButton>
            </div>
        }
        </>
    )
}