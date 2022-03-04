import { Tournoi } from "./tournoi";

export interface Evenement {
  nom ?: string;
  date ?: Date;
  tournois ?: Tournoi;
}
