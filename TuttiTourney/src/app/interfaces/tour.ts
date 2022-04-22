import { Equipe } from "./equipe";
import { Poule } from "./poule";

export interface Tour {
  numeroTour ?: number;
  equipes ?: Equipe[];
  poules ?: Poule[];
}
