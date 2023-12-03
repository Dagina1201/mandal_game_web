'use client'
import { FC, useState, useEffect } from 'react'

import { VStack, Button, Text, HStack, Box, useToast } from '@chakra-ui/react'
import { Action, Item, Work } from '@/model/model'
import { api } from '@/global/values'
import { ItemTypes } from '@/global/enum'
import { useSearchParams } from 'next/navigation'
import { Currency } from '@/global/functions'
import { getCookie } from 'cookies-next'
type DetaulModalType = {
    onClick: () => void
    text: string

}
type UsageModalType = {
    onClick: () => void
    text: string
    items?: Item[]
}

const DetaultModal: FC<DetaulModalType> = ({ onClick, text }) => {
    return (
        <VStack w={'full'}>
            <Text>{text}</Text>
            <Button bg={'brand'} w={'200px'} color={'white'} onClick={onClick}>Ok</Button>
        </VStack>
    )
}


export const UsageModal: FC<UsageModalType> = ({ onClick, items }) => {
    const [current, setCurrent] = useState(0)
    const [data, setData] = useState<Item[]>([])
    const getData = async () => {
        try {
            let type = ItemTypes.HOME
            switch (current) {
                case 0:
                    type = ItemTypes.FOOD
                    break
                case 2:
                    type = ItemTypes.CAR
                    break
            }
            await fetch(`${api}item/type/${type}`).then((d) => d.json()).then((d) => (setData(d)))
        } catch (error) {

        }
    }
    useEffect(() => {
        getData()
    }, [current]);
    const query = useSearchParams()
    const token = getCookie('token')
    const toast = useToast()
    const buy = async (id: string) => {
        try {
            await fetch(`${api}game/item/${query.get('id')}/${id}`, {
                headers: {
                    'Authorization': `Baerer ${token}`
                }
            }).then((d) => {
                toast({
                    status: 'success',
                    duration: 3000,
                    title: "Амжилттай"
                })
                onClick()
            })
        } catch (error) {

        }
    }
    return <VStack w={'full'}>
        <Text color={'white'}>Хэрэгцээ</Text>
        <HStack w={'full'} justifyContent={'space-between'} gap={6}>
            {
                ["Хоол", "Гэр", "машин"].map((item, i) => {
                    return <Button borderRadius={10} color={'white'} onClick={() => setCurrent(i)} textTransform={'uppercase'} bg={i == current ? "brand" : "#B392AC"} w={'full'}>{item}</Button>
                })
            }
        </HStack>
        {
            data.sort((a, b) => a.status - b.status)?.map((d, i) => {
                let disable = false
                items?.map((e) => {
                    if (d._id == e._id) {
                        if (d.status == i) {
                            disable = true
                        }
                    }
                })
                return <HStack w={'full'} gap={2} px={2} key={i}>
                    <Box flex={1} bg={'white'} h={'full'} w={'full'} borderRadius={8} />
                    <VStack flex={3.5} w={'full'} alignItems={'start'}>
                        <Text>LVL {d.status + 1}</Text>
                        <Text>{d.name}</Text>
                    </VStack>
                    <VStack flex={2.5} w={'full'} alignItems={'start'}>
                        <Text>{Currency(d.price)} / 1 {d.priceDuration}</Text>
                        <Button disabled={disable} bg={disable ? 'gray' : '#E915AE'} onClick={() => {
                            if (!disable) {
                                buy(d._id)
                            }
                        }} color={'white'}>Идэвхжүүлэх</Button>
                    </VStack>
                </HStack>

            })
        }
    </VStack>
}
export const ResourceModal: FC<UsageModalType> = ({ onClick, }) => {
    const [current, setCurrent] = useState<number>(0)
    const [data, setData] = useState<Item[]>([])
    const toast = useToast()
    const params = useSearchParams()
    const token = getCookie('token')
    const add = async (t: string, value: number, money: number) => {
        try {
            console.log(t, value, money)
            await fetch(`${api}game/${t}/${query.get('id')}/${value}/${money}`, {
                headers: {
                    'Authorization': `Baerer ${token}`
                }
            }).then((d) => d.json()).then((d) => {

                toast({
                    status: 'success',
                    duration: 3000,
                    title: "Амжилттай"
                })
            })
            onClick()
        } catch (error) {

        }
    }
    // useEffect(() => {
    //     getData()
    // }, [current]);
    const query = useSearchParams()
    const health = [
        {
            money: 0,
            value: 0.02
        },
        {
            money: 5000,
            value: 0.03,
        },
        {
            money: 8000,
            value: 0.07,
        },
        {
            money: 15000,
            value: 0.1,
        },
        {
            money: 40000,
            value: 0.3
        },
    ]
    const energy = [
        {
            money: 0,
            value: 0.01,
        },
        {
            money: 15000,
            value: 0.03,
        },
        {
            money: 25000,
            value: 0.07,
        },
        {
            money: 40000,
            value: 0.1,
        },
        {
            money: 80000,
            value: 0.25,
        },]
    return <VStack w={'full'}>
        <Text color={'white'}>Хэрэгцээ</Text>
        <HStack w={'full'} justifyContent={'space-between'} gap={6}>
            {
                ["HEALTH", "Energy"].map((item, i) => {
                    return <Button borderRadius={10} color={'white'} onClick={() => setCurrent(i)} textTransform={'uppercase'} bg={i == current ? "brand" : "#B392AC"} w={'full'}>{item}</Button>
                })
            }
        </HStack>
        {
            current == 0 ? health.map((d, i) => {
                return <HStack w={'full'} gap={2} px={2} key={i}>
                    <Box flex={1} bg={'white'} h={'full'} w={'full'} borderRadius={8} />

                    <Text flex={3.5}>LVL {i + 1}</Text>


                    <VStack flex={2.5} w={'full'} alignItems={'start'}>
                        <Text>{Currency(d.money)} /  {Math.round(d.value * 100)} %</Text>
                        <Button bg={'#E915AE'} onClick={() => {
                            add('health', d.value, d.money)
                        }} color={'white'}>Идэвхжүүлэх</Button>
                    </VStack>
                </HStack>
            }) :
                energy.map((d, i) => {
                    return <HStack w={'full'} gap={2} px={2} key={i}>
                        <Box flex={1} bg={'white'} h={'full'} w={'full'} borderRadius={8} />

                        <Text flex={3.5}>LVL {i + 1}</Text>


                        <VStack flex={2.5} w={'full'} alignItems={'start'}>
                            <Text>{Currency(d.money)} /  {Math.round(d.value * 100)} %</Text>
                            <Button bg={'#E915AE'} onClick={() => {
                                add('energy', d.value, d.money)
                            }} color={'white'}>Идэвхжүүлэх</Button>
                        </VStack>
                    </HStack>
                })
        }
    </VStack>
}
export const AnswerModal: FC<DetaulModalType> = ({ onClick, }) => {

    const [data, setData] = useState<Action>()
    const getData = async () => {
        try {

            await fetch(`${api}action/random`).then((d) => d.json()).then((d) => (setData(d)))
        } catch (error) {

        }
    }
    useEffect(() => {
        getData()
    }, []);

    const toast = useToast()
    const token = getCookie('token')
    const params = useSearchParams()
    const check = async (value: number) => {
        try {
            if (value == data?.correct) {
                toast({
                    duration: 3000,
                    status: 'success',
                    title: 'Баяр хүргэе'
                })
                await fetch(`${api}game/answer/${params.get('id')}`, {
                    headers: {
                        'Authorization': `Baerer ${token}`
                    }
                })
                onClick()
            } else {
                toast({
                    duration: 3000,
                    status: 'warning',
                    title: 'Буруу байлаа'
                })
                onClick()
            }
        } catch (error) {

        }
    }
    return <VStack w={'full'}>
        <Text color={'white'}>Халтуур</Text>
        <Text mt={4} color={'white'}>{data?.question}</Text>
        <HStack mt={8} gap={10}>{
            data?.answers.map((a, i) => {
                return <Button onClick={() => check(i)} w={200} bg={'white'} borderRadius={10} key={i}>{a.answer}</Button>
            })
        }</HStack>


    </VStack>
}
export const WorkModal: FC<DetaulModalType> = ({ onClick, }) => {

    const [data, setData] = useState<Work[]>([])
    const getData = async () => {
        try {

            await fetch(`${api}work/start`).then((d) => d.json()).then((d) => {
                console.log(d)
                setData(d)
            })
        } catch (error) {

        }
    }
    useEffect(() => {
        getData()
    }, []);

    const toast = useToast()
    const token = getCookie('token')
    const params = useSearchParams()
    const working = async (id: string, income: number) => {
        try {

            await fetch(`${api}game/working/${params.get('id')}/${id}/${income}`, {
                headers: {
                    'Authorization': `Baerer ${token}`
                }
            })
            toast({
                duration: 3000,
                title: 'Ажил орлоо. Баяр хүргэе',
                status: 'success'
            })
            onClick()

        } catch (error) {

        }
    }
    return <VStack w={'full'}>
        <Text >Боломжит ажил</Text>
        {/* <HStack w={'full'} justifyContent={'space-between'} gap={6}>
        {
            ["Хоол", "Гэр", "машин"].map((item, i) => {
                return <Button borderRadius={10} color={'white'} onClick={() => setCurrent(i)} textTransform={'uppercase'} bg={i == current ? "brand" : "#B392AC"} w={'full'}>{item}</Button>
            })
        }
    </HStack> */}
        {
            data?.map((d, i) => {
                let disable = false

                return <HStack w={'full'} gap={2} px={2} key={i}>
                    <Box flex={1} bg={'white'} h={'full'} w={'full'} borderRadius={8} />
                    <VStack flex={3.5} w={'full'} alignItems={'start'}>
                        {/* <Text>LVL {d + 1}</Text> */}
                        <Text>{d.name}</Text>
                    </VStack>
                    <VStack flex={2.5} w={'full'} alignItems={'start'}>
                        <Text>{Currency(d.income)} / 1 сар</Text>
                        <Button disabled={disable} bg={disable ? 'gray' : '#E915AE'} onClick={() => {
                            if (!disable) {
                                working(d._id, d.income)
                            }
                        }} color={'white'}>Идэвхжүүлэх</Button>
                    </VStack>
                </HStack>

            })
        }
    </VStack>
}
export default DetaultModal