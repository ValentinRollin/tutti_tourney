import { Equipe } from "./equipe";

export interface Tournoi {
  nomTournoi ?: string;
  sport ?: string;
  description?: string;
  equipes ?: Equipe[];
}
