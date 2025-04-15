import { Meeting } from "./Meeting";

export interface MeetingSummaries {
    id?: number;
    summary?: string;
    createAt?: string;
    meeting?: Meeting;
}