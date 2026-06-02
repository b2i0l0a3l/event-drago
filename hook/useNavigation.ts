'use client';

import { usePathname, useRouter } from "next/navigation";


export enum routerType {
    PUSH = "PUSH" , REPLACE = "REPLACE" ,REFRESH = "REFRESH"

 } 

export function useNavigation(){
    const pathName = usePathname();
    const router = useRouter();

    const handleRouter = (url : string , Type : routerType)=>{
        if(Type === routerType.REFRESH){
            router.refresh();
            return;
        }
        switch(Type){
            case routerType.PUSH : 
                router.push(url);
                break;
            case routerType.REPLACE:
                router.replace(url);
                break;
        }
    }

    return [handleRouter];
}