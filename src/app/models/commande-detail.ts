import { Article } from "./article";

export interface CommandeDetail {
    idCommandeDetail?:number
    article?: Article
    quantite?: number
}
