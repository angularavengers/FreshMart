export interface IUser {
    address: IAddress[];
    email: string;
    fName: string;
    isVerified: boolean;
    lName: string;
    phoneNumber: string
    roles: any[]
}

export interface IAddress {
    firstName: string;
    lastName: string;
    addressLine1: string;
    addressLine2: string;
    landMark:string;
    city: string;
    state: string;
    pincode: string,
    isdefault: boolean;
    phoneNumber: string;
}