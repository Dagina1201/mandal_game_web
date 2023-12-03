'use client'
import { api, host } from '@/global/values'
import { useEffect, useState, ReactNode } from 'react'
import { io } from 'socket.io-client'
import { HStack, Box, Text, VStack, Icon, Image, useToast, Button, Modal, ModalOverlay, ModalBody, ModalContent, useDisclosure, ModalCloseButton } from '@chakra-ui/react'
import { getCookie } from 'cookies-next'
import { Item, User } from '@/model/model'
import { Game } from '@/model/game.model'
import { bg, bgBaishin, car1, male18, male36, male50, miniGameBg, miniGameBorder, woman18, woman36, woman50 } from '@/global/assets'
import { Genders, ItemTypes } from '@/global/enum'
import Bar from '@/components/Bar'
import Card from '@/components/Card'
import Current0 from '@/components/Side'
import DetaultModal, { AnswerModal, ResourceModal, UsageModal, WorkModal } from '@/components/Modal'
import { IoMdMail } from "react-icons/io";
import { useSearchParams } from 'next/navigation'

let socket: any

export default function GamePage() {
    // const [socket, setSocket] = useState(undefined)
    const token = getCookie('token')
    const [data, setData] = useState<Game>()
    const [item, setItem] = useState<Item>()
    const [car, setCar] = useState<Item>()
    const [character, setCharacter] = useState(male18)
    const [side, setSide] = useState()
    const [modal, setModal] = useState(0)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [check, setCheck] = useState(0)
    const [timer, setTimer] = useState(1)
    const [current, setCurrent] = useState(2)
    const toast = useToast()
    useEffect(() => {
        socket = io(host, {
            transports: ['websocket', 'polling'],
        })
        socket.on('events', (data: Game) => {
            if (data.health <= 0 || data.energy <= 0 || data.money <= 0) {
                toast({
                    duration: 10000,
                    status: 'error',
                    title: 'dead'
                })
            } else {
                setData(data)

                data.item.map((d) => {
                    if (d._id != item?._id || d._id != car?._id) {
                        getItem(d._id)
                    }

                })
                getCharacter(data.age, data.gender)
            }


        })
    }, [])
    const getItem = async (id: string) => {
        try {
            await fetch(`${api}item/get/${id}`).then(d => d.json()).then((d) => {
                if (d.type == ItemTypes.CAR) {

                    setCar(d)
                }
                if (d.type == ItemTypes.HOME) {
                    setItem(d)
                }
            })
        } catch (error) {

        }
    }
    const getCharacter = (age: number, gender: Genders) => {

        let char = male18
        switch (gender) {
            case Genders.MALE:
                if (age >= 50) {
                    char = male50
                    break
                }
                if (age >= 36) {
                    char = male36

                    break
                }
                char = male18
                break
            case Genders.WOMAN:
                if (age >= 50) {
                    char = woman50
                    break
                }
                if (age >= 36) {
                    char = woman36

                    break
                }
                char = woman18
                break
        }
        if (character != char) {
            setCharacter(char)
        }
    }

    const params = useSearchParams()
    useEffect(() => {

        if (socket != undefined && params.get('id')) {
            const id = setInterval(() => {
                socket.emit('events', params.get('id'))
                setCheck(check + timer)
            }, 1000);
            return () => clearInterval(id);
        }

    }, [check, socket, params])


    const getModal = (value: number,) => {
        switch (value) {
            case 0:
                return <DetaultModal onClick={onClose} text={''} />
            case 1:
                return <UsageModal onClick={onClose} text={''} items={data?.item} />
            case 2:
                return <ResourceModal onClick={onClose} text={''} />
            case 3:
                return <AnswerModal onClick={onClose} text={''} />
            case 4:
                return <WorkModal onClick={onClose} text={''} />
        }
    }
    const getSide = (value: number) => {


        return <Current0 data={data}  money={data?.money ?? 0} saving={data?.money ?? 0} />



    }
    if (data?._id != undefined) return <HStack w={'100vw'} pos={'relative'} h={'100vh'} overflow={'hidden'}>
        < Image src={item?.uri == undefined ? bgBaishin : `${bg}${item!.uri}`} pos={'absolute'} h={'full'} w={'full'} objectFit={'cover'} inset={0} zIndex={1} />

        {
            car?.status != 0 && car != undefined && < Image src={car?.uri == undefined ? car1 : `${bg}${car!.uri}`} pos={'absolute'} h={'50%'} w={'50%'} objectFit={'contain'} bottom={0} right={'40%'} zIndex={1} />
        }
        <Box pos={'absolute'} left={4} bottom={4} ><Button onClick={() => { }} bg={'transparent'}><Icon as={IoMdMail} color={'brand'} boxSize={16} zIndex={5} /></Button></Box>
        <HStack w={'full'} h={'full'}>
            <VStack flex={1} alignItems={'start'} justifyContent={'space-between'} h={'full'}>
                <VStack w={'full'} px={4} pt={4}>
                    <HStack w={'full'}>
                        <VStack flex={6} w={'full'}>
                            <Bar max={100} text='HP' value={data.health} child={(
                                <Button borderRadius={10} w={45} h={45} onClick={() => {
                                    setModal(2)
                                    onOpen()
                                }} border={'2px solid black'}>+</Button>
                            )} />
                            <Bar max={100} text='EN' value={data.energy} child={(
                                <Button borderRadius={10} w={45} h={45} onClick={() => {
                                    setModal(2)
                                    onOpen()
                                }} border={'2px solid black'}>+</Button>
                            )} />

                        </VStack>
                        <VStack flex={1} w={'full'} h={'full'} bg={'white'} p={0} py={2} zIndex={2} border={'1px solid black'} borderRadius={'10'}>
                            <Text color={'brand'} borderBottom={'1px solid black'} w={'full'} textAlign={'center'}>2024</Text>
                            <Text color={'brand'}>{data.date}</Text>
                        </VStack>
                    </HStack>
                    <Bar max={data.lifeTime} text='AGE' value={data.age} danger={data.danger} child={(
                        <Box px={4} color={'white'} bg={'brand'} whiteSpace={'nowrap'} border={'3px solid black'} pt={4} borderRadius={10}>
                            <Text>LVL {data.level}</Text>
                        </Box>
                    )} />
                </VStack>
                <Image src={character} zIndex={2} h={'80vh'} ml={'10%'} />
            </VStack>
            <VStack flex={1} h={'full'}>
                <Card
                    setCurrent={(v) => {
                        if (v != 1) {
                            if (v != 4) {
                                if (v == 0) {
                                    setCurrent(2)
                                    setModal(4)
                                    onOpen()
                                }


                            } else {
                                setCurrent(2)
                                setModal(1)
                                onOpen()
                            }
                        } else {
                            setCurrent(2)
                            setModal(3)
                            onOpen()
                        }
                    }}
                    current={current}

                    bg='lightBrand'
                    child={(
                        getSide(current)
                    )} />
            </VStack>
        </HStack>
        <Modal isOpen={isOpen} onClose={onClose} isCentered size={'xl'} >
            <ModalOverlay />
            <ModalContent bgImage={modal == 3 ? miniGameBorder : ''} bgRepeat={'no-repeat'} bgSize={'contain'} h={modal == 3 ? 383 : 'auto'} className={modal == 3 ? '' : 'linear'} py={8} px={4} borderRadius={modal == 3 ? 0 : 40}>

                <ModalCloseButton />
                <ModalBody pos={'relative'}>
                    {modal == 3 && <Box bgImage={miniGameBg} zIndex={-1} pos={'absolute'} inset={0} bgSize={'cover'} />}
                    {getModal(modal)}
                </ModalBody>


            </ModalContent>
        </Modal>
    </HStack >
    return <></>
}