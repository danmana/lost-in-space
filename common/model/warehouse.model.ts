import { Resource } from "./resource.model";
import { Stats } from "./stats.model";

export interface Warehouse {
  resources: Resource[];
  stats: Stats[];
}