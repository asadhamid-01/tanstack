"use client"
import { instance } from "@/axios-config"
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";


export const Signup = () => {

    const router = useRouter();

    const signupUser = async () => {
        const response = await instance.post('/api/auth/sign-up/email' ,{
           "name" : "test",
           "password" : "test1234",
           "email":"test@gmail.com"
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
        signupMutation.mutate();
    }



  return (
    <div>
            <button
            onClick={handleSignup}
            >
                signup
            </button>
    </div>
  )
}
