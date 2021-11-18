export interface OrdersRes {
    success: true;
    data: {
        count: number;
        perPage: number;
        prevPage: number;
        nextPage: number;
        totalPage: number;
        data: Order[];
    };
    message: string;
}

export interface OrderSingleRes {
    success: true;
    data: OrderSingle;
    message: string;
}

export interface OrderAddRes {
    success: true;
    data: {
        orderId: number;
        customerId: number;
        orderPrice: number;
        couponCode: string;
        shippingAddressId: string;
        status: string;
        id: number;
    };
    message: string;
}

export interface OrderSingle {
  id: number;
  orderId: string;
  customerId: number;
  orderPrice: number;
  couponCode: string | null;
  shippingAddressId: number;
  status: string;
  shipping_address: ShippingAddress;
  customer: Customer;
  orderItems: OrderItem[];
}
export interface Order {
    id: number;
    orderId: string;
    customerId: number;
    orderPrice: number;
    couponCode: string | null;
    shippingAddressId: number;
    status: string;
    shipping_address: ShippingAddress;
    customer: Customer;
};


export interface OrderItem {
    id: number;
    orderId: number;
    productId: string;
    productTitle: string;
    image: string;
    quantity: number;
    price: number;
    skuId: string;
    attribute: string;
}

export interface ShippingAddress {
    id: number;
    customerId: number;
    address: string;
    division: string;
    city: string;
    area: string;
    additional: string;
    type: string;
    default: string;
    created_at: string;
    updated_at: string;
}

export interface Customer {
    id: number;
    userId: number;
    fullName: string | null;
    gender: string | null;
    dateOfBirth: string | null;
    mobileNumber: string;
    email: string | null;
    image: string | null;
    status: string;
    created_at: string;
    updated_at: string;
}
