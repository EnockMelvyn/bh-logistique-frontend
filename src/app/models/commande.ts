import { CommandeDetail } from "./commande-detail";

export interface Commande {
    idCommande?:number
    numeroCommande?: string
    dateCommande?: Date
    commandeDetails?:CommandeDetail[]
    createdBy?: string
}
