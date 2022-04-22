import { Equipe } from "./equipe";
import { Tournoi } from "./tournoi";

export interface Match
{
  nomEquipe1 ?: string;
  nomEquipe2 ?: string;
  scoreEquipe1 ?: number;
  scoreEquipe2 ?: number;
  finis ?: boolean;
  vainqueur?:string;
}
