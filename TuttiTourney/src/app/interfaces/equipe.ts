import { Tournoi } from "./tournoi";

export interface Equipe
{
  nom ?: string;
  nbjoueur ?: number;
  niveau?: string;
  tournoi ?: Tournoi;
}
