import { Article } from "./article";
import { Demande } from "./demande";

export interface DemandeArticle {
    idDemandeArticle: number;
    quantite: number;
    demande: Demande;
    article: Article;
    

    createdAt: Date;
    createdBy: string;
    modifiedAt: Date;
    modifiedBy : string;

}