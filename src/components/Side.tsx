'use client'
import { useState } from 'react'
import { Currency } from '@/global/functions'
import { VStack, HStack, Icon, Text, Checkbox, Button, Box } from '@chakra-ui/react'
import { AiFillBank } from 'react-icons/ai'
import { FC } from 'react'
import { Game } from '@/model/game.model'
import { ItemTypes } from '@/global/enum'
type Current0Type = {
    money: number,
    saving: number

    data?: Game
}
const Mission: FC<Current0Type> = ({ money, }) => {
    return <>

        <VStack w={'full'} alignItems={'start'} overflow={'scroll'} h={'50%'} mt={4}>
            <Text mx={'auto'} color={'white'} fontSize={'24px'}>Зорилго</Text>
            <Text color={'white'} textAlign={'center'}>25 жилийн хугацаанд би 1 тэрбум төгрөгийн хөрөнгөтэй болох бөгөөд үүнийг хадгаламж, хуримтлал, хөрөнгө оруулалтын замаар бүрдүүлнэ. </Text>

        </VStack></>
}

const EMongolia: FC<Current0Type> = ({ data, }) => {
    return <>

        <VStack w={'full'} alignItems={'start'} overflow={'scroll'} h={'50%'} mt={4} >
            <Text color={'white'} fontSize={'16px'}>Нас: {Math.round(data?.age ?? 0)}</Text>
            {data?.item.map((e) => {
                if (e.type == ItemTypes.CAR) {

                    return <Text color={'white'} fontSize={'16px'}>Машинтай эсэх: {e.status != 0 ? 'байгаа' : "байхгүй"}</Text>
                }
                if (e.type == ItemTypes.HOME) {

                    return <Text color={'white'} fontSize={'16px'}>Үл хөдлөх хөрөнгө : {e.status == 0 ? 'Ноорхой байшин' : e.status == 1 ? "Шинэ байшин" : "Хаус"}</Text>
                }
            })}


        </VStack>
    </>
}
const Personal: FC<Current0Type> = ({ data, }) => {
    return <>

        <VStack w={'full'} alignItems={'start'} overflow={'scroll'} h={'50%'} mt={4} >
    
            {data?.item.map((e) => {
                if (e.type == ItemTypes.CAR) {

                    return <Text color={'white'} fontSize={'16px'}>Машины зардал: {Currency(e.price)}</Text>
                }
                if (e.type == ItemTypes.HOME) {

                    return <Text color={'white'} fontSize={'16px'}>Үл хөдлөхын зардал: {Currency(e.price)}</Text>
                }
                if (e.type == ItemTypes.FOOD) {

                    return <Text color={'white'} fontSize={'16px'}>Хүнсний зардал: {Currency(e.price)}</Text>
                }

            })}
            <Text color={'white'} fontSize={'16px'}>Орлого: {Currency(data?.income ?? 0)}</Text>


        </VStack>
    </>
}



const Current0: FC<Current0Type> = ({ money, data, saving }) => {
    const [current, setCurrent] = useState<number>(1)

    const getPage = () => {
        switch (current) {
            case 1:
                return <Mission money={money} saving={0} />
            case 0:
                return <EMongolia money={money} data={data} saving={0} />
            case 3:
                return <Personal money={money} data={data} saving={0} />
        }
    }
    return <VStack zIndex={2} alignItems={'start'} w={'full'} px={10} gap={4}>
        <Text fontSize={'48px'} mx='auto'>Үзүүлэлт</Text>
        <HStack w={'full'} justifyContent={'space-between'}>
            <HStack borderRadius={20} px={6} py={2} color={'brand'} bg={'gray'} border={'3px solid #7B2969'}>
                <Icon as={AiFillBank} boxSize={'50px'} />
                <Text fontSize={'36px'} pt={6}>{Currency(money)}</Text>
            </HStack>
            <HStack borderRadius={20} px={6} py={2} color={'brand'} bg={'gray'} border={'3px solid #7B2969'}>
                <Icon as={AiFillBank} boxSize={'50px'} />
                <Text fontSize={'36px'} pt={6}>{Currency(money)}</Text>
            </HStack>
        </HStack>
        <HStack mt={4} w={'full'} justifyContent={'space-between'} gap={4}>
            {
                ['e-mongolia', 'Зорилго', 'Түвшин', 'Хувийн санхүү', 'Хуримтлал'].map((item, i) => {
                    return <Button fontSize={'0.8vw'} borderRadius={10} color={'white'} bg={'brand'} w={'full'} onClick={() => setCurrent(i)}>{item}</Button>
                })
            }
        </HStack>
        {getPage()}

    </VStack>
}



export const Current4: FC<Current0Type> = ({ money, saving }) => {
    const [current, setCurrent] = useState(0)
    return <VStack zIndex={2} alignItems={'start'} w={'full'} px={10} gap={4}>
        <Text fontSize={'48px'} mx='auto'>{'Хэрэгцээ'}</Text>
        <HStack w={'full'} justifyContent={'space-between'} gap={10}>

            {
                ["Хоол", "Гэр", "машин"].map((item, i) => {
                    return <Button borderRadius={10} color={'white'} onClick={() => setCurrent(i)} textTransform={'uppercase'} bg={i == current ? "brand" : "#B392AC"} w={'full'}>{item}</Button>
                })
            }
        </HStack>
        <VStack w={'full'} gap={4}>
            {
                [1, 2, 3].map((item, i) => {
                    return <><HStack w={'full'} justifyContent={'space-between'}>
                        <Text color={'white'}>LVL </Text>
                        <Text color={'white'}>  </Text>
                    </HStack>
                        <Button w={'full'} bg={'brand'} color={'white'}>lorem</Button></>
                })
            }
        </VStack>

    </VStack>
}


export default Current0