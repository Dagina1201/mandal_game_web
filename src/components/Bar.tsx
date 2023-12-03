import { InfoOutlineIcon } from '@chakra-ui/icons'
import { HStack, Box, Text } from '@chakra-ui/react'
import { FC, ReactNode } from 'react'
type BarType = {
    text: string
    value: number
    max: number
    child: ReactNode
    danger?: boolean
}
const Bar: FC<BarType> = ({ text, value, max, child, danger }) => {
    return <HStack w={'full'} zIndex={2}>
        <Text fontSize={'24px'} mt={2} mr={2}>{text}</Text>
        <HStack w={'full'} bg={'lightBrand'} justifyContent={'center'} border={'3px black solid'} borderRadius={20} pos={'relative'}>
            <Text zIndex={4} pt={2} color={'white'} fontSize={'24px'}>{Math.round(value)} / {max}</Text>
            <Box h={'full'} top={0} bottom={0} left={0} right={`${100 - (value / max * 100)}%`} zIndex={3} bg={'brand'} borderRadius={20} border={'3px black solid'} pos={'absolute'} />
            {
                danger && <Box zIndex={3} right={2} width={30} height={30} pos={'absolute'}>
                    <InfoOutlineIcon boxSize={'full'} color={'red'} />
                </Box>
            }
        </HStack>
        {child}
    </HStack>
}

export default Bar