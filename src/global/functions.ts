import { Features } from "./enum";

export function getFeature(value: Features) {
    switch (value) {
        case Features.SAVE:
            return "Хадгалах"
    }
}

export function Currency(value: number) {
    if (value > 1000000) {
        return `${(Math.round(value / 1000000 * 100) / 100)}M`
    }
    if (value > 1000) {
        return `${Math.round(value / 1000 * 100) / 100}K`
    }
    return value
}