import { Article } from "./article";
import { Inventaire } from "./inventaire";

export interface InventaireDetail {
    id?: number
    article?: Article
    qteCalcule?: number
    qteComptee?:number
    cmup?:number
}
