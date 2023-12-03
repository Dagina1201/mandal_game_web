import { FC, ReactNode } from 'react'
import { VStack, Text, Box, HStack, Image, Button, } from '@chakra-ui/react'
import { logo, statistic } from '@/global/assets'
type CardType = {
    current: number

    bg?: string
    child?: ReactNode,
    setCurrent: (value: number) => void
}
const Card: FC<CardType> = ({ bg, current, setCurrent, child }) => {
    return (
        <VStack zIndex={2} w={'full'} h={'full'} borderTopLeftRadius={60} pt={8} bgImage={statistic} bgSize={'cover'} bgRepeat={'no-repeat'} pos={'relative'} overflow={'hidden'}>
            <Box pos={'absolute'} bg={'black'} inset={0} opacity={0.1} zIndex={2} />

            {child}
            <HStack alignItems={'end'} zIndex={2} bg={'white'} w={'full'} gap={4} justifyContent={'space-between'} pos={'absolute'} bottom={0} px={4} py={4}>
                {
                    ["Ажил", "Халтуур"].map((item, i) => {
                        return <Button bg={current == i ? '#B392AC' : 'brand'} color={'white'} w={'full'} key={i} onClick={() => {
                            setCurrent(i)
                        }} borderRadius={10} flex={5}>{item}</Button>
                    })
                }
                <Box flex={6} pos={'relative'}>
                    <Button height={'auto'} w={'100%'} flex={6} p={0} onClick={() => {
                        setCurrent(2)
                    }} zIndex={2} pos={'absolute'} bottom={0}>
                        <Box bg={'white'} borderRadius={'100%'}><Box bg={'brand'} p={0} m={3} borderRadius={'100%'}>
                            <Image height={'auto'} w={'auto'} src={logo} /></Box></Box></Button>
                </Box>

                {
                    ["Мэдлэг", "Хэрэгцээ"].map((item, i) => {
                        return <Button key={i} onClick={() => {
                            setCurrent(i + 3)
                        }} bg={current == i + 3 ? '#B392AC' : 'brand'} color={'white'} w={'full'} flex={5} borderRadius={10}>{item}</Button>
                    })
                }
            </HStack>


        </VStack>
    )
}

export default Card