import { Equipe } from "./equipe";
import { Poule } from "./poule";

export interface Tournoi {
  nomTournoi ?: string;
  sport ?: string;
  description?: string;
  equipes ?: Equipe[];
  poules ?: Poule[];
  etat ?: number;
}
