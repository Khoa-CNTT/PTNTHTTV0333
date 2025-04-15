import { User } from "./User";

export interface Contact {
    id?: number;
    content?: string;
    dateSend?: string;
    status?: Boolean;
    user?: User;
}