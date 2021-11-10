import { Article } from "./article";
import { DemandeDirection } from "./demande-direction";

export interface DemandeDirectionDetails {

    id ?:number;

    quantiteDemande?: number;
    quantiteValideDir?: number;
    quantiteValideDmg?: number;

    demandeDirection?: DemandeDirection;

    article?: Article;

    createdAt?: Date;

    createdBy?: string;

    modifiedAt?: Date;

    modifiedBy?: string;
    
    isDeleted?: boolean;
}
