import { Article } from "./article";
import { Fournisseur } from "./fournisseur";

export interface MouvStock {
    idMouvementStock?: number
    dateMouvement ?: Date
    article?: Article
    qteAvant?:number
    qteMouvement?:number
    typeMouvement?: string
    fournisseur?: Fournisseur
    username?:string
    demandeur?:string
    prixUnitaire?:number
    createdAt?:Date
}
