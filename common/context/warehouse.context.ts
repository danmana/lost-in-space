import { createContext } from "react";
import { Warehouse } from "../model/warehouse.model";

export const emptyWarehouse: Warehouse = {
  resources: {},
  stats: {}
};

export const WarehouseContext = createContext({
  warehouse: emptyWarehouse,
  setWarehouse: (_: Warehouse) => {
  }
});