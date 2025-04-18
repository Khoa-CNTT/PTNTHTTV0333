import { Meeting } from "./Meeting";

export interface MeetingRecording {
    id?: number;
    uploadAt?: string;
    recordUrl?: string;
    meeting?: Meeting;
}