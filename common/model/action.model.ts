export interface Action {
  resourceConsumption: { type: string, value: number };
  statsModification: { type: string, value: number };
}