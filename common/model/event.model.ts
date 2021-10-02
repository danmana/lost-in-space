import { Action } from "./action.model";

export interface Event {
  name: string;
  content: string;
  chance: number;
  chanceIncrement: number;
  actions: Action[];
}