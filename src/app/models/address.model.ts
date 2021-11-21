export interface AddressRes {
    success: boolean;
    data: {
      count: number;
      perPage: number;
      prevPage: number;
      nextPage: number;
      totalPage: number;
      data: AddressSingle[];
    };
    message: string;
}
export interface AddressSingle {
    id: number;
    customerId: boolean;
    name: string;
    phone: string;
    email: string;
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
export interface AddressSingleRes {
    success: boolean;
    data: AddressSingle;
    message: string;
}
export interface AddressAdd {
    name: string;
    phone: string;
    email: string;
    address: string;
    division: string;
    city: string;
    area: string;
    additional: string;
    type: string;
    default: string;
}
