'use client'
import Form, { GameForm } from '@/components/Form'
import { host } from '@/global/values'
import axios from 'axios'
import { getCookie, deleteCookie } from 'cookies-next'
import { Box } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const token = getCookie('token')
  const router = useRouter()

  return (
    <Box h={'100vh'} w={'100vw'} >


      {token ?
        <GameForm /> : <Form />}

    </Box>
  )
}
