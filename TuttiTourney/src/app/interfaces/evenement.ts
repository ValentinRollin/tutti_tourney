import { Tournoi } from "./tournoi";

export interface Evenement {
  nomEvenement ?: string;
  date ?: Date;
  description?: string;
  tournois ?: Tournoi[];
}
