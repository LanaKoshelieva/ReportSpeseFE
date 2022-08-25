import { ReceiptDTO } from "./receipt-dto";

export class UserDTO 
{
    id: number;
    name: string;
    surname: string;
    email: string;
    passwordHash: string;
    region: string;
    sex: string;
    birthDate: string;
    role: string;
    receipts:ReceiptDTO [];
}
