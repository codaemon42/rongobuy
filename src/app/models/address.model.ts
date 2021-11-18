
export interface Address {
    id: boolean;
    customerId: boolean;
    address: string;
    division: string;
    city: string;
    area: string;
    additional: string;
    type: string;
    default: string;
}

export interface AddressRes {
    success: boolean;
    data: {
        id: boolean;
        customerId: boolean;
        address: string;
        division: string;
        city: string;
        area: string;
        additional: string;
        type: string;
        default: string;
        created_at: string;
        updated_at: string;
    };
    message: string;
}
