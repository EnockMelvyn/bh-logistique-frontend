import { Direction } from "@angular/cdk/bidi";
import { DemandeDirectionDetails } from "./demande-direction-details";
import { Status } from "./status";

export interface DemandeDirection {
    
    id?: number;

    numRef?: string;
    dateDemande?: Date;
    direction?: Direction;
    status?: Status;
    
    demandeDirectionDetails?: DemandeDirectionDetails[]
    observationDirecteur?: string;
    observationDmg?: string;

    demandeur?: string;
    
    typeDemande?: number;

    createdAt?: Date;
    createdBy?: string;
    modifiedAt?: Date;

    modifiedBy?: string
    isDeleted?: boolean;

}
