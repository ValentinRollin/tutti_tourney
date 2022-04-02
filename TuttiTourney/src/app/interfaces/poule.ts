import { Equipe } from "./equipe";
import { Match } from "./match";

export interface Poule
{
  numeroPoule ?: number;
  equipes ?: Equipe[];
  matchs ?: Match[];
}
