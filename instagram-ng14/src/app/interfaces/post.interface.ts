import { postImages } from "./postImage.interface";
import { User } from "./user.interface";

export interface Post {
  id: number;
  userId: number;
  content: string;
  user ?: User;
  postImages ?: postImages[];
  cmtPosts ?: any[];
  likedPosts ?: any[];
  createdAt ?: "2023-05-01T13:33:19.000Z";
  updatedAt ?: "2023-05-01T13:33:19.000Z";
  imageObject ?: any;
  isAlreadyLiked ?:boolean;
}
