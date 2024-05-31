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
        description:string
        minimumOrderQuantity : number
        availabilityStatus : string
        quantity : number
        reviews : {
                comment:string,
                date:string,
                rating:number,
                reviewerName:string
                } []
        brand:string
        category:string
        shippingInformation:string
        sku:string
        returnPolicy:string
        warrantyInformation:string
        weight:number
        dimensions:{
                width:number
                height:number
                depth:number
                }
}