import { Profile } from "./profile";

export interface User {
    idUser?: number
    lastnameUser?: string
    mobileUser?: string
    emailUser?: string
    adresseUser?: string
    dateofbirthUserx?: Date
    isDeleted?: boolean
    login?: string
    matricule?: string
    directionId?:number 
    nameUser?: string
    password?: string
    profiles?: Profile[]
    updatedAt?: Date 
}
