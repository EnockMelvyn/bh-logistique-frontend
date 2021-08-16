import { Article } from "./article";
import { Demande } from "./demande";

export interface Sortie {
    idSortie?:number
    article?: Article
    demande?: Demande
    reference?: string
    quantite?: number
    dateSortie?: Date
}
