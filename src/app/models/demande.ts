import { DemandeArticle } from "./demandeArticle";
import { Status } from "./status";

export interface Demande {
    idDemande?: number;
    numRef?: string;
    estimation?: number;
    observation?: string;
    dateDemande?: Date;
    demandeur?: string;
    directionId?: number
    statutDemande?: string;
    status?: Status;
    idCategorie?: number;
    idType?: number;

    urgent?: boolean;
    justifUrgence?: string;
    motifRejet?: string;
    demandeArticles?: DemandeArticle[];
    isDeleted?:boolean;

    createdAt?: Date;
    createdBy?: string;
    modifiedAt?: Date;
    modifiedBy?: string

    // constructor(){
    //     this.idFamille=0
    //     this.libelleFamille=''
    //     this.codeFamille=''
    // }
}
