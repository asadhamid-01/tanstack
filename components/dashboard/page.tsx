"use client"
import { instance } from '@/axios-config'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export const Dashboard = () => {
    const router = useRouter();


useEffect(() => {
    const checkUser = async () => {
      const response = await instance.get('/api/auth/get-session' , {
        withCredentials:true,
      })
      if(response.data != null) {
        router.push('/dashboard')
      }else{
        router.push('/login')
      }
      console.log(response)
    }
    checkUser()
} , [])

  return (
    <div>this is the dashboard content</div>
  )
}
