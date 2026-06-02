import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    const {name,icon,color} =  await req.json();
    const {userId} = await auth();
    if(!userId)return NextResponse.json({error:"Unauthorized"} , {status:401});
    if(!name)return NextResponse.json({error:"Category is required"} , {status:400})
    try{
        const existingCategory = await db.category.findFirst({
            where: {
                name: name,
                userId: userId,
            },
        });
        if(existingCategory)return NextResponse.json({error:"Category already exists"} , {status:400})
        const newCategory = await db.category.create({
            data: {
                name: name,
                userId: userId,
                color: color || "#98FB98",
                icon: icon || "💰",
            },
        });
        return NextResponse.json({message:"Category created"} , {status:200})
    }catch(e){
        console.log(e)
        return NextResponse.json({error:"Internal server error"} , {status:500})
    }
}