import { Article } from "./article"

export interface LivraisonDetail {
    idLivraisonDetail?: number;
    article?: Article 
    quantite: number 
    prixUnitaire: number 
}
