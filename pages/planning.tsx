import styles from "../styles/Home.module.css";
import Link from "next/link"
import React, { useState } from "react";
import { Warehouse } from "../common/model/warehouse.model";
import { Resource } from "../common/model/resource.model";

const emptyWarehouse: Warehouse = {
  resources: {},
  stats: {}
}

const resources: { [key: string]: Resource } = {
  food: { type: "Food", price: 10, weight: 10 },
  water: { type: "Water", price: 10, weight: 10 },
  oxygen: { type: "Oxygen", price: 10, weight: 10 },
  meds: { type: "Meds", price: 10, weight: 10 },
  equipment: { type: "Equipment", price: 10, weight: 10 },
  misc: { type: "Misc", price: 10, weight: 10 },
}

const Planning = () => {
  const [warehouse, setWarehouse] = useState(emptyWarehouse);

  const changeResourceQuantity = (key: string, quantity: number) => {
    warehouse.resources[key] = { resource: resources[key], quantity: quantity };
    setWarehouse(warehouse);
  }

  const resourcePickers = Object.entries(resources).map(([key, value], index) => {
    return (
      <div key={key}>
        <label>{value.type}</label>
        <input type="text"
               value={warehouse.resources[key]?.quantity}
               onChange={(event) => changeResourceQuantity(key, Number.parseInt(event.target.value))}/>
      </div>
    );
  })

  console.log(warehouse)

  return (
    <div className={styles.container}>
      <main>
        <h1>Plan your resources so that the space crew can reach mars!</h1>
        {resourcePickers}
        <Link href={"/execution"}>
          Let's see if you got everything right
        </Link>
      </main>
    </div>
  )
}

export default Planning;
