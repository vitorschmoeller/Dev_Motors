import {redirect} from 'next/navigation'
export async function getDataHome(){
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/objects/669eb427d70e5c5cd3fa4ea3?read_key=f6dL7AsovS0C4YUcL3VJxGzF2RU8lea5OZJxeINcAlOIfYJiTY&depth=1&props=slug,title,metadata,`, {next: {revalidate: 120}})
        const [res] = await Promise.all([response])

        if(!res.ok) {
            throw new Error("Faleid to fetch data in CMS")
        }

        return res.json();
    }catch(err){
        throw new Error("Faleid to fetch data in CMS")
    }
}

export async function getSubMenu(){
    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/objects?pretty=true&query=%7B%22type%22:%22pages%22%7D&limit=10&read_key=f6dL7AsovS0C4YUcL3VJxGzF2RU8lea5OZJxeINcAlOIfYJiTY&depth=1&props=slug,title,`, {next: {revalidate: 120}})
    
        if(!res.ok){
            throw new Error("Failed to fetch Menu");
        }

        return res.json()
    }catch(err){
        throw new Error("Failed to fetch Menu");
        
    }
}


export async function getItemBySlug(itemSlug: string){
    const baseUrl= `${process.env.NEXT_PUBLIC_API_URL}/objects`

    //Definindo o objeto de consulta pelo slug
    const queryParams = new URLSearchParams({
        query: JSON.stringify({
            slug: itemSlug
        }),
        props: 'slug,title,content,metadata',
        read_key: process.env.READ_KEY as string
    })
    const url = `${baseUrl}?${queryParams.toString()}`;
    
    try {
        const res = await fetch(url, { next: {revalidate: 120}})
        if(!res.ok){
            throw new Error("Failed get item by slug")
        }

        return res.json();
    }catch(err){
        console.log(err)
        redirect("/")
        throw new Error("Failed get item by slug")
    }
}