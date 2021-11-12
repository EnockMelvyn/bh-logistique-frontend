import { SousFamille } from "./sousFamille";

export interface Article {
    idArticle?: number;
    libelleArticle?: string;
    codeArticle?: string;
    sousFamille?: SousFamille;
    cmup?: number;
    quantiteStock?: number;

    // constructor(){
    //     this.idFamille=0
    //     this.libelleFamille=''
    //     this.codeFamille=''
    // }
}