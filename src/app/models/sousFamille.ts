import { Famille } from "./famille";

export interface SousFamille {
    idSousFamille?: number;
    libelleSousFamille?: string;
    codeSousFamille?: string;
    famille?: Famille;

    // constructor(){
    //     this.idFamille=0
    //     this.libelleFamille=''
    //     this.codeFamille=''
    // }
}