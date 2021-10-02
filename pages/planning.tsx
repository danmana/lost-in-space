import styles from "../styles/Home.module.css";
import planningStyles from "../styles/Planning.module.scss";
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

  const totalWeight = Object.entries(warehouse.resources).reduce(((previousValue, [_, resourceEntry]) => {
    const currentWeight = resourceEntry.quantity * resourceEntry.resource.weight;
    return previousValue + currentWeight;
  }), 0)
  const totalPrice = Object.entries(warehouse.resources).reduce(((previousValue, [_, resourceEntry]) => {
    const currentPrice = resourceEntry.quantity * resourceEntry.resource.price;
    return previousValue + currentPrice;
  }), 0)

  const changeResourceQuantity = (key: string, quantity: number) => {
    warehouse.resources[key] = { resource: resources[key], quantity: quantity };
    setWarehouse({ ...warehouse });
  }

  const resourceContainers = Object.entries(resources).map(([key, value], index) => {
    return (
      <div className={planningStyles['resource']} key={key}>
        <label className={planningStyles.label}>{value.type}</label>
        <input type="number"
               onChange={(event) => changeResourceQuantity(key, Number.parseInt(event.target.value))}/>
        <span>t</span>
        <span className={planningStyles.quantity}>{(warehouse.resources[key]?.quantity | 0) * resources[key].price}$</span>
      </div>
    );
  })

  return (
    <div className={styles.container}>
      <main className={planningStyles.container}>
        <h1>Plan your resources so that the space crew can reach mars!</h1>
        <div className={planningStyles['resources-container']}>
          {resourceContainers}
        </div>

        <div className={planningStyles.totals}>
          <span>Total: </span>
          <span>{totalWeight}kg</span>
          <span>{totalPrice}$</span>
        </div>

        <Link href={"/execution"}>
          Let's see if you got everything right
        </Link>
      </main>
    </div>
  )
}

export default Planning;
