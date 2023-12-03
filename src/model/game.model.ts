import { Decree, Features, Genders, MissionTypes, SavingTypes, WorkTypes } from "@/global/enum";
import { Item, User } from "./model";
interface Saving {


    type: SavingTypes

    mission: MissionTypes

    outcome: number

    money: number

    rate: number

    total: number


}
interface Professions {

    profession: string

    decree: Decree
}

interface Talents {

    talent: string

    luck: number
}
export interface Game {
    _id: string
    user: User

    age: number;

    date: number;

    gender: Genders


    health: number

    energy: number

    lifeTime: number

    xp: number

    money: number

    saving: Saving[]

    parent: string

    child: string

    luck: number


    professions: Professions[]

    profession: Professions

    works: string[]

    work: string


    items: string[]

    item: Item[]

    talents: Talents[]


    features: Features[]


    inComingMessages: string[]

    sendMessages: string[]

    working: WorkTypes

    income: number

    workingDuration: number


    healthDuration: number

    energyDuration: number

    danger: boolean

    level: number

    studing: boolean

    studingPayment: number

    studingMoney: number

    studingDecree: Decree

    studingProfession: string
}