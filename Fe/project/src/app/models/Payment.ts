import { User } from "./User";

export interface Payment {
    id?: number;
    status?: Boolean;
    total?: number;
    createAt?: Boolean;
    user?: User;
}