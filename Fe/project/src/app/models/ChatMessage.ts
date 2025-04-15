import { Meeting } from "./Meeting";
import { User } from "./User";

export interface ChatMessage {
    id?: number;
    message?: string;
    sendAt?: string;
    meeting?: Meeting;
    user?: User;
}