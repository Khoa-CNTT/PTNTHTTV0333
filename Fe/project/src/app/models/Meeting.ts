import { User } from "./User";

export interface Meeting {
    id?: number;
    code?: string;
    title?: string;
    isActive?: Boolean;
    startTime?: string;
    LocalDateTime?: string;
    endTime?: string;
    createAt?: string;
    user?: User;
}