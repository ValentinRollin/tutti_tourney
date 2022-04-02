import { Equipe } from "./equipe";
import { Tournoi } from "./tournoi";

export interface Match
{
  nomEquipe1 ?: string;
  nomEquipe2 ?: string;
  score ?: string;
  finis ?: boolean;
}
