import { CommandeDetail } from "./commande-detail";
import { Status } from "./status";

export interface Commande {
    idCommande?:number
    numeroCommande?: string
    dateCommande?: Date
    status?: Status
    commandeDetails?:CommandeDetail[]
    createdBy?: string
}
