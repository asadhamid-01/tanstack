"use client"
import { instance } from '@/axios-config'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export const Dashboard = () => {
    const router = useRouter();

useEffect(() => {
    const handleCheck = async () => {
        const response = await instance.get('/api/auth/get-session' , {
                withCredentials:true
    })
        if (response.data  != null) {
      router.push('/dashboard')
    } else {
      router.replace('login')
    }
         console.log(response?.data)
    }
        handleCheck() 
},[])

  return (
    <div>this is the dashboard content</div>
  )
}
