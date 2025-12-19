"use client"
import { instance } from "@/axios-config"
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";


export const Signup = () => {
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("")
    const [name , setName] = useState("")
    const router = useRouter();

    const signupUser = async ({name,email,password} : {name:string;email:string;password:string;}) => {
        const response = await instance.post('/api/auth/sign-up/email' ,{
            name,
            password,
            email,
        },{
            withCredentials:true,
        }
        )
        console.log(response)
    }

    const signupMutation = useMutation({
        mutationFn:signupUser,

        onSuccess : () => {
            router.push('/login')
        },
        onError : (error : any) => {
            console.log(error.response?.data)
        }

    })

    const handleSignup = () => {
        signupMutation.mutate({email,password,name});
    }



  return (
    <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
                <input
                 type="text"
                 value={name}
                 onChange={(e) => setName(e.target.value)} 
                    className="h-12 bg-transparent border text-canvas-solid placeholder:text-canvas-solid px-2 rounded-2xl"
                    placeholder="enter name"
                />

               <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john.doe@mail.com"
                        className="h-12 bg-transparent border text-canvas-solid placeholder:text-canvas-solid px-2 rounded-2xl"
                    />

                    <input
                     type="text"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     placeholder="password"
                     className="h-12 bg-transparent border text-canvas-solid placeholder:text-canvas-solid px-2 rounded-2xl"
                     />
        </div>
            <button
            onClick={handleSignup}
            className="border p-2 rounded-full cursor-pointer"
            >
                signup
            </button>
    </div>
  )
}
