import { createContext } from "react";
import { Warehouse } from "../model/warehouse.model";

export const emptyWarehouse: Warehouse = {
  resources: {},
  stats: {
    happiness: {
      value: 100,
      type: "Mood"
    },
    health: {
      value: 100,
      type: "Health"
    },
    aircraft: {
      value: 100,
      type: "Aircraft"
    }
  }
};

export const WarehouseContext = createContext({
  warehouse: emptyWarehouse,
  setWarehouse: (_: Warehouse) => {
  }
});