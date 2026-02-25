interface PriceOption {
    duration: string
    price: string
}

export interface IService {
    title: string
    description: string
    prices: PriceOption[]
}
