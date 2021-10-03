import styles from "../styles/Home.module.css";
import planningStyles from "../styles/Planning.module.scss";
import Link from "next/link"
import React, { useContext, useEffect } from "react";
import { ResourceEntry } from "../common/model/warehouse.model";
import { Resource } from "../common/model/resource.model";
import { UserContext } from "../common/context/user.context";
import { WarehouseContext } from "../common/context/warehouse.context";
import BackgroundPlanets from "../common/components/background-planets";

const basicResources: { [key: string]: Resource } = {
  fuel: { type: "Fuel", price: 10, weight: 10 },
  food: { type: "Food", price: 10, weight: 10 },
  water: { type: "Water", price: 10, weight: 10 },
  oxygen: { type: "Oxygen", price: 10, weight: 10 },
  meds: { type: "Meds", price: 10, weight: 10 },
  equipment: { type: "Equipment", price: 10, weight: 10 },
  misc: { type: "Misc", price: 10, weight: 10 },
}

const miscResources: { [key: string]: Resource } = {
  sweets: { type: "Sweets", price: 10, weight: 10 },
  media: { type: "Media", price: 10, weight: 10 },
  tv: { type: "TV", price: 10, weight: 10 },
  nintendo: { type: "Nintendo", price: 10, weight: 10 },
  eReader: { type: "eReader", price: 10, weight: 10 },
  ambientLights: { type: "Ambient Lights", price: 10, weight: 10 },
  fashionableHat: { type: "Fashionable Hat", price: 10, weight: 10 },

}

const Planning = () => {
  const { warehouse, setWarehouse } = useContext(WarehouseContext);
  const { username } = useContext(UserContext);

  useEffect(() => {
    console.log(JSON.stringify(warehouse));
  }, [warehouse]);

  const changeBasicQuantity = (key: string, quantity: number) => {
    warehouse.resources[key] = { resource: basicResources[key], quantity: quantity, remaining: quantity };
    setWarehouse({ ...warehouse });
  }

  const changeMiscQuantity = (key: string, checked: boolean) => {
    if (checked) {
      warehouse.resources[key] = { resource: miscResources[key], quantity: 1, remaining: 1 };
    } else {
      warehouse.resources[key] = { resource: miscResources[key], quantity: 0, remaining: 0 };
    }
    setWarehouse({ ...warehouse });
  }

  const getBasicResourceContainers = (resources: { [key: string]: Resource }) => {
    return Object.entries(resources).map(([key, value]) => {
      return (
        <div className={planningStyles['resource']} key={key}>
          <label className={planningStyles.label}>{value.type}</label>
          <input className={planningStyles['basic-resource']}
                 type="number" min={0}
                 onChange={(event) => changeBasicQuantity(key, Number.parseInt(event.target.value))}/>
          <span>tons</span>
          <span className={planningStyles['dotted-underline']}/>
          <span className={planningStyles.quantity}>{(warehouse.resources[key]?.quantity | 0) * resources[key].price}$</span>
        </div>
      );
    })
  }

  const getMiscResourceContainers = (resources: { [key: string]: Resource }) => {
    return Object.entries(resources).map(([key, value]) => {
      return (
        <div className={planningStyles['resource']} key={key}>
          <label className={planningStyles.label}>{value.type}</label>
          <input className={planningStyles['misc-resource']}
                 type="checkbox"
                 onChange={(event) => changeMiscQuantity(key, event.target.checked)}/>
          <span className={planningStyles['dotted-underline']}/>
          <span className={planningStyles.quantity}>{(warehouse.resources[key]?.quantity | 0) * resources[key].price}$</span>
        </div>
      );
    })
  }

  const getTotalPropertyValue = (resources: { [key: string]: ResourceEntry }, property: 'weight' | 'price') => {
    return Object.entries(resources).reduce(((previousValue, [_, resourceEntry]) => {
      const currentWeight = resourceEntry.quantity * resourceEntry.resource[property];
      return previousValue + currentWeight;
    }), 0)
  }

  const resourceContainers = getBasicResourceContainers(basicResources)
  const miscContainers = getMiscResourceContainers(miscResources)

  const totalWeight = getTotalPropertyValue(warehouse.resources, 'price');
  const totalPrice = getTotalPropertyValue(warehouse.resources, 'weight')

  return (
    <div className={styles.container}>
      <BackgroundPlanets/>
      <main className={planningStyles.container}>
        <h3>Hey {username}, plan your resources so that the space crew can reach Mars! You have a limited cargo space of 500 tons and a budget of 2mil$</h3>
        <div className={planningStyles['resources-container']}>
          <div className={planningStyles['resources-type-container']}>
            <span className={planningStyles['resources-type']}>BASIC</span>
            <div className={planningStyles['resource-picker']}>
              {resourceContainers}
            </div>
          </div>
          <div className={planningStyles['resources-type-container']}>
            <span>MISC</span>
            <div className={planningStyles['resource-picker']}>
              {miscContainers}
            </div>
          </div>

          <span className={planningStyles.separator}/>

          <div className={planningStyles.totals}>
            <span>Total </span>
            <span>weight: {totalWeight | 0}tons</span>
            <span>price: {totalPrice | 0}$</span>
          </div>
        </div>

        <Link href={"/execution"}>
          <img src={"/start.png"} className={planningStyles.start} width={150} alt={"start button"}/>
        </Link>
      </main>
    </div>
  )
}

export default Planning;
