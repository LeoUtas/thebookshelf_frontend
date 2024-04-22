export type User = {
    _id: string;
    auth0Id: string;
    email: string;
    firstName: string;
    lastName: string;
    addressLine1?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
    phone?: string;
};
