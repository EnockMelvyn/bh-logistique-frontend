import { CommandeDetail } from "./commande-detail";
import { Fournisseur } from "./fournisseur";
import { Status } from "./status";

export interface Commande {
    idCommande?:number
    numeroCommande?: string
    dateCommande?: Date
    fournisseur?: Fournisseur
    status?: Status
    commandeDetails?:CommandeDetail[]
    createdBy?: string
}
