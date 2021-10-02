import { Resource } from "./resource.model";
import { Stats } from "./stats.model";

export interface Warehouse {
  resources: { [key: string]: ResourceEntry };
  stats: { [key: string]: Stats };
}

export interface ResourceEntry {
  resource: Resource,
  quantity: number
}