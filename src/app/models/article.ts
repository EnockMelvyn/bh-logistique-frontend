import { SousFamille } from "./sousFamille";

export interface Article {
    idArticle?: number;
    libelleArticle?: string;
    codeArticle?: string;
    sousFamille?: SousFamille

    // constructor(){
    //     this.idFamille=0
    //     this.libelleFamille=''
    //     this.codeFamille=''
    // }
}