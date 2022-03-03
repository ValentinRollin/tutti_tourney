import { Tournois } from "./tournois";

export interface Evenement {
  nom ?: string;
  date ?: Date;
  tournois ?: Tournois;
}
