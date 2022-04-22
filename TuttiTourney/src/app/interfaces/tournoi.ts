import { Equipe } from "./equipe";
import { Tour } from "./tour";

export interface Tournoi {
  nomTournoi ?: string;
  sport ?: string;
  description?: string;
  equipes ?: Equipe[];
  tours : Tour[];
  etat ?: number;
}
