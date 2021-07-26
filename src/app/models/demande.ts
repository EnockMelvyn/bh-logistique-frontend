import { DemandeArticle } from "./demandeArticle";

export interface Demande {
    idDemande: number;
    numRef: string;
    estimation: number;
    observation: string;
    dateDemande: Date;
    demandeur: string;
    statutDemande: string;
    urgent: boolean;
    justifUrgence: string;
    demandeArticles: DemandeArticle[];

    createdAt: Date;
    createdBy: string;
    modifiedAt: Date;
    modifiedBy : string

    // constructor(){
    //     this.idFamille=0
    //     this.libelleFamille=''
    //     this.codeFamille=''
    // }
}
