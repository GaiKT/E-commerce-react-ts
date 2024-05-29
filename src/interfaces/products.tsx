export interface Product {
        id : number
        thumbnail : string
        title : string
        price : number
        stock : number
        discountPercentage : number
        totalPrice : number
        rating : number
        images : string[]
        description : string
        minimumOrderQuantity : number
        availabilityStatus : string
}