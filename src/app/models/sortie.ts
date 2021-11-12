import { Article } from "./article";
import { Demande } from "./demande";
import { DemandeDirection } from "./demande-direction";

export interface Sortie {
    idSortie?:number
    article?: Article
    demande?: Demande
    demandeDirection?: DemandeDirection
    reference?: string
    quantite?: number
    dateSortie?: Date
}
