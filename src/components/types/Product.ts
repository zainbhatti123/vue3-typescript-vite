
export interface Product {
    id: number | string;
    init_quantity: number,
    title: string;
    description: string;
    img: string;
    less_price: number;
    brand: string;
    quantity: number;
    currency: string;
    discount: string;
    item_in_cart: boolean;
    fixed_price: number;
}

export type myFilters = {
    search : string,
    brand : string,
    price :number,
  }