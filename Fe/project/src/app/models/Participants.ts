import { Meeting } from "./Meeting";
import { User } from "./User";

export interface Participants {
    id?: number;
    joinAt?: string;
    leftAt?: string;
    meeting?: Meeting;
    user?: User;
}