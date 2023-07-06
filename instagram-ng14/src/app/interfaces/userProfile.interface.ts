import { User } from "./user.interface";

export interface userProfile {
    id : number;
    userId:number
    profile_img: string;
    dob ?: Date;
    gender ?: string;
    no_of_followers ?:number;
    no_of_following ?:number;
    city ?: string;
    country ?: string;
    bio ?: string;
    user ?: User;

}
