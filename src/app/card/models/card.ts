import { User } from "src/app/user/models/user";

export interface Card{
    id: number;
    cardName:string;
    cardType:string;
    cardDescription:string;
    utilisateur:User;
    cardUrl:string;
 }