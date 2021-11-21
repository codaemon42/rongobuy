/* eslint-disable @typescript-eslint/naming-convention */
export class Cart{
  constructor(
    public id: number,
    public product_id: number,
    public product_title: string,
    public product_description: string,
    public unitPrice: string,
    public qty: number,
    public mainImage: string,
    public image: string[]
  ){

  }

}

export interface CartRes {
    success: boolean;
    data: {
        totalItem: number;
        subtotal: number;
        shippingTotal: number;
        grandTotal: number;
        couponCode: string;
        discount: number;
        product: CartProduct[];
    };
    message: string;
}

export interface CartAddRes {
    success: boolean;
    data: CartProduct;
    message: string;
}

export interface CartProduct {
    id: number;
    productId: number;
    productTitle: string;
    productImage: string;
    backgroundImage: string;
    quantity: number;
    orginalPrice: number;
    countedPrice: number;
    discountLabel: any;
    discountedPrice: number;
    discountAmount: number;
    skuId: string;
    attribute: {
        price: string;
        discount: string;
        discountPrice: number;
        skuPropertyImagePathLarge: string;
        skuPropertyImagePathSmall: string;
        value: [
            {
                skuPropertyName: string;
                propertyValueName: string;
            }
        ];
    };
    shippingCost: number;
}
