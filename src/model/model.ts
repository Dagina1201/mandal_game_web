import { Features, Genders, ItemPriceType, ItemTypes, WorkTypes } from "@/global/enum"

export interface Talent {
    _id: string;
    name: string

    features: Features[]
}
export interface User {
    _id: string;
    username: string
}
export interface Item {
    _id: string
    uri: string

    name: string

    code: string



    priceDuration: ItemPriceType

    status: number

    price: number

    type: ItemTypes

    gender: Genders[]
}

interface Answer {

    answer: string
}


export interface Action {

    _id: string
    question: string
    answers: Answer[]

    correct: number
}

export interface Work {
    _id: string
    name: string;

    income: number

    xp: number

    features: Features[]

    type: WorkTypes

}