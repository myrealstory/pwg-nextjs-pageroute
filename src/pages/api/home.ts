import { DecodedToken } from "@/types/HomePageTypes";
import { NextApiRequest, NextApiResponse } from "next";
import {jwtDecode} from "jwt-decode";


export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if(req.method !== "GET"){
        res.setHeader("Allow", ["GET"])
        return res.status(405).json({message: `Method ${req.method} not allowed`})
    }

    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message: "Unauthorized. Please log in."})
    }

    const currentPage = parseInt(req.query.page as string, 10) || 1;

    try {
        const decodedToken = jwtDecode<DecodedToken>(token);

        let data = null;
        let totalAccount = 0;
        let totalPosts = 0;
        let adminMode = false;

        //Fetch data based on user role
        if(decodedToken.role === "admin") {
            const [accountsResponse, postsResponse] = await Promise.all([
                fetch(`${process.env.NEXT_PUBLIC_API_URLS}`, {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                }),
                fetch(`${process.env.NEXT_PUBLIC_API_URL_Post}?page=${currentPage}&limit=12`,{
                    method:"GET",
                    headers:{
                        "Content-Type":"application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    // body: JSON.stringify({ page:1, limit: 10}),
                }),
            ]);

            
            const accounts = await accountsResponse.json();
            const posts = await postsResponse.json();
            console.log("account",accounts);
            console.log("posts",posts);
            
            totalAccount = accounts.accounts.length;
            totalPosts = posts.data.length;
            adminMode = true;
            data = posts;
            console.log("data",totalAccount,totalPosts,adminMode,data);
        }else {
            const postsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL_Post}/mypost`, {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ page:currentPage, limit: 12}),
            });

            const post = await postsResponse.json();
            data = post;
        }
        return res.status(200).json({data, totalAccount, totalPosts, adminMode});

    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}