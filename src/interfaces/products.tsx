export interface ProductsProps {
    productsList : {
        limit : number,
        products : Array<{
            id : number,
            thumbnail : string,
            title : string,
            price : number,
            stock : number
        }>,
        skip : number,
        total: number
    }
}
export interface Product {
        id : number,
        thumbnail : string,
        title : string,
        price : number,
        stock : number,
        discountPercentage : number,
        totalPrice : number
        rating : number
    }