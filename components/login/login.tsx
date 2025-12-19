
"use client"
import { instance } from '@/axios-config';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Eye, EyeOff } from "lucide-react";


export const Login = () => {
        const [showPassword, setShowPassword] = useState(false);
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const router = useRouter();

    const loginUser = async () => {
        const response = await instance.post('/api/auth/sign-in/email' , {
            email,
            password,
        },{
            withCredentials:true,
        });
                console.log(response)
    }

    const loginMutatin = useMutation({
        mutationFn:loginUser,

        onSuccess :  () => {
            router.push('/dashboard')
        },

        onError: (error :any) => {
            console.log("this is error" , error.response?.data)
        }
    })


    const handleLogin = () =>{
        loginMutatin.mutate()
    }

  return (
    <div className='flex flex-col gap-4 h-screen items-center justify-center'>
                    <div className="flex gap-4 flex-col">

                    {/* Form Container */}
            <div className="flex flex-col gap-5">

                {/* Email Field */}
                <div className="flex flex-col gap-2.5">
                    <label className="text-canvas-text-contrast text-sm font-semibold">
                        Email
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john.doe@mail.com"
                       className="h-12 bg-transparent border text-canvas-solid placeholder:text-canvas-solid px-2 rounded-2xl"
                    />
                </div>

                {/* Password Field */}
                <div className="self-stretch flex flex-col gap-2.5">
                    <label className="text-canvas-text-contrast text-sm font-semibold">
                        Password
                    </label>
                    <div className="relative w-full">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                              className="h-12 bg-transparent border text-canvas-solid placeholder:text-canvas-solid px-2 rounded-2xl"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>
            </div>

                <button
                onClick={handleLogin}
                  className="border p-2 rounded-full cursor-pointer"
                >
                    {loginMutatin.isPending ? "loggin in..." : "login"}
                </button>
            </div>
    </div>
  )
}
