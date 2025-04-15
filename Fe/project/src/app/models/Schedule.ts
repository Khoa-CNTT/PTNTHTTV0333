import { User } from "./User";

export interface Schedule {
    id?: number;
    title?: string;
    description?: string;
    scheduleTime?: string;
    createAt?: string;
    user?: User;
}