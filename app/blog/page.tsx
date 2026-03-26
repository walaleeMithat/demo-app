'use client'
import * as string_decoder from "node:string_decoder";

interface AuthenModel {
    email: string,
    password: string,
}
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import {useEffect, useState} from 'react'


export default function BlogPage() {
    const router = useRouter()

    const [authModel, setAuthModel] = useState<AuthenModel>({email: '', password: ''})

    const handleInputChange = (event) => {
        const { value } = event.target;
        setAuthModel(prevData => ({
            ...prevData,
            [event.target.id]: value,
        }));
    };

    const handleLogin = () => {
        if (!authModel.email || !authModel.password) {
        }
        const query = new URLSearchParams({
            email: authModel.email,
            password: authModel.password,
        }).toString();

        router.push(`/resultAuth?${query}`);
    };

    const fetchUsers = async () => {
        const randomSkip = Math.floor(Math.random() * 100)

        const res = await fetch(`https://dummyjson.com/users?limit=3&skip=${randomSkip}`)
        const data = await res.json()
        console.log(JSON.stringify(authModel));
        console.log(data.users)
    }

    const  filterData  = async () => {
        try{

            alert(JSON.stringify(authModel));

        }catch(e){
            alert(e)
            console.log(e)
        }
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            console.log(JSON.stringify(authModel));

        }, 1000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [authModel])

    return (
       <div>
           <label>Email:</label>
           <input
               id="email"
            type="text"
            value={authModel.email}
            onChange={(e) => handleInputChange(e)}
           />

           <label>Password:</label>
           <input
               id="password"
            type="password"
            value={authModel.password}
            onChange={(e) => handleInputChange(e)}
           />

           <input type="button" value="Login" onClick={handleLogin}/>
       </div>
    )
}