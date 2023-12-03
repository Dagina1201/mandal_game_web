'use client'
import { api, features } from "@/global/values"
import { useToast, FormControl, Input, Button, HStack, Box, FormLabel, Select, Text, Checkbox, VStack } from '@chakra-ui/react'
import { FC, useState, useEffect } from 'react'
import axios from 'axios'
import { setCookie, getCookie } from 'cookies-next'
import { useRouter } from "next/navigation"
import { loginBg, miniGameBg } from "@/global/assets"
import { Genders } from "@/global/enum"
import { getFeature } from "@/global/functions"
import { Talent } from "@/model/model"


type GameType = {
    age: string,
    gender: Genders,

}

export const GameForm = () => {
    const [data, setData] = useState<GameType>({
        age: '18',
        gender: Genders.MALE,

    })
    const [selectedTalents, setSTalents] = useState<Talent[]>([])
    const [talents, setTalents] = useState<Talent[]>([])
    const toast = useToast()
    const router = useRouter()
    const getTalents = async () => {
        try {
            await fetch(`${api}talent`).then((d) => d.json()).then((d) => setTalents(d))
        } catch (error) {

        }
    }
    useEffect(() => {
        getTalents()
    }, []);
    const token = getCookie('token')

    const start = async (e: any) => {
        try {
            e.preventDefault()
            if (Number(data.age) > 0) {
                await axios.post(`${api}game`, {
                    age: data.age,
                    gender: data.gender,
                    talents: selectedTalents
                }, {
                    headers: {
                        Authorization: `Baerer ${token}`
                    }
                }).then((d) => {
                    if (d.data) {
                        router.push(`/game?id=${d.data}`)
                        toast({
                            status: 'success',
                            isClosable: true,
                            duration: 5000,
                            title: "Амжилт хүсэе"
                        })

                    } else {
                        toast({
                            status: 'warning',
                            isClosable: true,
                            duration: 5000,
                            title: 'Алдаа гарлаа'
                        })
                    }
                })
            } else {
                toast({

                    title: 'Нас буруу байна',
                    status: 'warning',
                    duration: 5000,
                    isClosable: true,
                })
            }

        } catch (error) {

        }
    }
    return (<HStack w={'100vw'} h={'100vh'} bgImage={miniGameBg} bgRepeat={'no-repeat'} bgSize={'cover'}>
        <FormControl onSubmit={(e) => start(e)} px={10} mx={'auto'} maxW={'500px'}>

            <Text mt={4} color={'white'}>Нас</Text>
            <Input type="number" color={'white'} value={data.age} onChange={(e) => {
                const value = Number(e.target.value)

                if (value >= 0) {

                    setData((prev: GameType) => ({ ...prev, age: e.target.value }))
                } else {
                    toast({

                        title: 'Нас буруу байна',
                        status: 'warning',
                        duration: 5000,
                        isClosable: true,
                    })
                }

            }} />
            <Text mt={4} color={'white'}>Хүйс</Text>
            <Select color={'white'} defaultValue={data.gender} onChange={(e) => {
                const value: Genders = e.target.value as Genders
                setData((prev: GameType) => ({ ...prev, gender: value }))
            }}>
                <option value={Genders.MALE} className="text-black"> Эрэгтэй</option>
                <option value={Genders.WOMAN} className="text-black">Эмэгтэй</option>

            </Select>
            <Text mt={4} color={'white'} >Авьяас</Text>
            <VStack mt={4} alignItems={'start'}>
                {
                    talents?.map((talent, i) => {
                        return <Checkbox key={i} color={'white'} colorScheme="brand" onChange={(e) => {
                            if (e.target.checked) {
                                setSTalents((prev) => [...prev, talent])
                            } else {
                                setSTalents(selectedTalents.filter((s) => s._id != talent._id))
                            }

                        }}>
                            {talent.name}
                        </Checkbox>
                    })
                }
            </VStack>
            <Button bg={'brand'} color={'white'} _hover={{
                bg: 'brand'
            }} px={16} mt={8} onClick={(e) => start(e)} w={'full'}>Эхлэх</Button>
        </FormControl>

    </HStack>)
}

type DataType = {
    username: string
    password: string
}

const Form = () => {
    const [data, setData] = useState<DataType>({
        username: '',
        password: '',
    })
    const toast = useToast()
    const router = useRouter()

    const login = async (e: any) => {
        try {
            e.preventDefault()

            if (data.username != '' && data.password != '') {
                await axios.post(`${api}auth/login`, {
                    username: data.username,
                    password: data.password
                }).then((d) => {

                    toast({
                        status: d.data.success ? 'success' : 'warning',
                        isClosable: true,
                        duration: 5000,
                        title: d.data.message
                    })

                    if (d.data.success) {
                        setCookie("token", d.data.access_token)
                        router.refresh()
                    }

                })
            } else {

                toast({

                    title: 'Нууц үг , нэвтрэх нэрээ оруулна уу',
                    status: 'warning',
                    duration: 5000,
                    isClosable: true,
                })
            }
        } catch (error) {

        }
    }
    return (<HStack w={'100vw'} h={'100vh'} >
        <FormControl flex={1} onSubmit={(e) => login(e)} px={10} mx={'auto'}>
            <Text fontSize={'24px'}>Нэвтрэх</Text>
            <Text mt={4}>Нэр</Text>
            <Input type="text" placeholder="Нэр" onChange={(e) => setData((prev: DataType) => ({ ...prev, username: e.target.value }))} />
            <Text mt={4}>Нууц үг</Text>
            <Input type="password" placeholder="Нууц үг" onChange={(e) => setData((prev: DataType) => ({ ...prev, password: e.target.value }))} />
            <Button bg={'brand'} color={'white'} _hover={{
                bg: 'brand'
            }} px={16} mt={8} onClick={(e) => login(e)} w={'full'}>submit</Button>
        </FormControl>
        <Box flex={2.5} bgImage={loginBg} h={'100vh'} bgRepeat={'no-repeat'} bgPos={'center'} bgSize={'cover'} />
    </HStack>)
}

export default Form