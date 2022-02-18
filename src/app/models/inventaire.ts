import { Famille } from "./famille";
import { InventaireDetail } from "./inventaire-detail";
import { SousFamille } from "./sousFamille";
import { Status } from "./status";

export interface Inventaire {
    id?:number
    libelle?:string
    famille?:Famille
    sousFamille?:SousFamille
    dateInventaire?: Date
    valeurEcart?:number
    status?: Status
    details?: InventaireDetail[]

    createdBy?:string
    createdAt?:Date
    modifiedBy?:string
    modifiedAt?:Date
}
