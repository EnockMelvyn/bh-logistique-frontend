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
    createdAt: Date;
    createdBy: string;
    modifiedAt: Date;
    modifiedBy : string
    codeArticle: string;

    // constructor(){
    //     this.idFamille=0
    //     this.libelleFamille=''
    //     this.codeFamille=''
    // }
}
