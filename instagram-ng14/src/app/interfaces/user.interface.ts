import { userProfile } from "./userProfile.interface";

export interface User {
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    mobile: string;
    userFollowers ?: any[];
    userProfile ?: userProfile;
}

