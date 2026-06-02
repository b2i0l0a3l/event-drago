import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(req:Request){
    const {id} = await req.json(); 
    const {userId} = await auth();
    if(!userId)return NextResponse.json({error:"Unauthorized"} , {status:401});
    if(!id)return NextResponse.json({error:"Category is required"} , {status:400})
    try{
        const existingCategory = await db.category.findFirst({
            where: {
                id: id,
                userId: userId,
            },
        });
        if(!existingCategory)return NextResponse.json({error:"Category not found"} , {status:404})
        const deletedCategory = await db.category.delete({
            where: {
                id: id,
            },
        });
        return NextResponse.json({message:"Category deleted"} , {status:200});
    }catch(e){
        return NextResponse.json({error:"Internal server error"} , {status:500});
    }
}