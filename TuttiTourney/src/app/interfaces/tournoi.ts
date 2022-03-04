import { Equipe } from "./equipe";

export interface Tournoi {
  nom ?: string;
  sport ?: string;
  equipes ?: Equipe;
}
