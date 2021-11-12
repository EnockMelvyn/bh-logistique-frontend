import { Article } from "./article";
import { Demande } from "./demande";

export interface DemandeArticle {
    idDemandeArticle?: number;
    quantite?: number;
    demande?: Demande;
    article?: Article;
    idArticle?: number;

}