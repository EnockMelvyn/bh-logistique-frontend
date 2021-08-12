import { Fournisseur } from "./fournisseur";
import { LivraisonDetail } from "./livraison-detail";

export interface Livraison {
    idLivraison?: number
    fournisseur?: Fournisseur 
    dateLivraison?: Date
    numeroBl?: string
    livraisonDetails?: LivraisonDetail[]
}
