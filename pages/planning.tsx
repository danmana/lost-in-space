import styles from "../styles/Home.module.css";
import planningStyles from "../styles/Planning.module.scss";
import React, { useContext, useEffect, useState } from "react";
import { ResourceEntry } from "../common/model/warehouse.model";
import { Resource } from "../common/model/resource.model";
import { UserContext } from "../common/context/user.context";
import { WarehouseContext } from "../common/context/warehouse.context";
import BackgroundPlanets from "../common/components/background-planets";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import * as ga from '../common/google-analytics';
import { useRouter } from 'next/router';

const MAX_UNITS = 1750;
const BUDGET = 35000;

const basicResources: { [key: string]: Resource } = {
  fuel: { type: "Fuel", price: 50, weight: 1, mandatory: true }, // 200 = 10000
  food: { type: "Food", price: 23, weight: 1, mandatory: true }, //600 = 13800
  water: { type: "Water", price: 11, weight: 1, mandatory: true }, //200 = 2200
  oxygen: { type: "Oxygen", price: 7, weight: 1, mandatory: true }, //300 = 2100
  meds: { type: "Meds", price: 17, weight: 1, mandatory: true }, //300 = 5100
  equipment: { type: "Equipment", price: 5, weight: 1 } //155 = 775
}

const miscResources: { [key: string]: Resource } = {
  sweets: { type: "Sweets", price: 100, weight: 30 },
  media: { type: "Media", price: 239, weight: 14 },
  tv: { type: "TV", price: 275, weight: 54},
  nintendo: { type: "Nintendo", price: 150, weight: 2 },
  eReader: { type: "eReader", price: 123, weight: 2 },
  ambientLights: { type: "Ambient Lights", price: 197, weight: 30 },
  fashionableHat: { type: "Fashionable Hat", price: 200, weight: 3 },
  cola: { type: "Cola", price: 540, weight: 36 },
  swimmingSuit: {type: "Swimming Suite", price: 300, weight: 3},
  winterCoat: {type: "Winter Coat", price: 600, weight: 12},
  toys: {type: "Toys", price: 600, weight: 190},
}

const Planning = () => {
  const router = useRouter();
  const { warehouse, setWarehouse } = useContext(WarehouseContext);
  const { username } = useContext(UserContext);
  const [ isValid, setIsValid ] = useState(false);
  const [ totalWeight, setTotalWeight] = useState(0);
  const [ totalPrice, setTotalPrice] = useState(0);


  useEffect(() => {
    if (!username) {
      router.replace('/');
    }
  }, []);

  useEffect(() => {
    const computedWeight = getTotalPropertyValue(warehouse.resources, 'weight');
    setTotalWeight(computedWeight);
    const computedPrice = getTotalPropertyValue(warehouse.resources, 'price');
    setTotalPrice(computedPrice);
    checkValidity(computedWeight, computedPrice);
  }, [warehouse]);

  const checkValidity = (computedWeight: number, computedPrice: number) => {
    const hasMissingResources = Object.entries(basicResources).some(([key, value]) => {
      return value.mandatory && (!warehouse?.resources?.[key] || warehouse.resources[key].quantity < 1);
    });
    const isWithinLimit = computedWeight <= MAX_UNITS && computedPrice <= BUDGET;

    setIsValid(!hasMissingResources && isWithinLimit);
  }

  const goNext = () => {
    if (isValid) {
      ga.event('START_GAME');
      router.push('/execution');
    }
  };

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
          <label className={planningStyles.label}>{value.type} {value.mandatory && ' (min 1)'}</label>
          <input className={planningStyles['basic-resource']}
                 type="number" min={0}
                 onChange={(event) => changeBasicQuantity(key, Number.parseInt(event.target.value))}/>
          <span>&nbsp;units</span>
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

  return (
    <div className={styles.container}>
      <BackgroundPlanets/>
      <main className={planningStyles.container}>
        <h3>Hey {username}, plan your resources so that the space crew can reach Mars! You have a limited cargo space of 1750 units and a budget of 35k$</h3>
        <div className={planningStyles['resources-container']}>
          <div className={planningStyles['resources-type-container']}>
            <FontAwesomeIcon icon={faInfoCircle} className={planningStyles.info} title={"Each day the crew consumes 3 units of food, the rest of the basic resources" +
            " are consumed by 1 unit/day. Oxygen and Meds drop faster depending on the crew's health status."}/>
            <span className={planningStyles['resources-type']}>BASIC</span>
            <div className={planningStyles['resource-picker']}>
              {resourceContainers}
            </div>
          </div>
          <div className={planningStyles['resources-type-container']}>
            <FontAwesomeIcon icon={faInfoCircle} className={planningStyles.info} title={"Misc resources are not consumed by default, but they may be used for getting out " +
            " from difficult and unpredictable situations. Pay attention on what you're taking with you since you have limited cargo capacity and money."}/>
            <span>MISC</span>
            <div className={planningStyles['resource-picker']}>
              {miscContainers}
            </div>
          </div>

          <span className={planningStyles.separator}/>

          <div className={planningStyles.totals}>
            <span>Total</span>
            <span>Weight:&nbsp; {totalWeight | 0}&nbsp;units</span>
            <span>Cost:&nbsp; {totalPrice | 0}&nbsp;$</span>
          </div>
        </div>

          <img src={isValid ? "/start.png" : "/start-disabled.png"}
               className={planningStyles.start}
               width={150}
               alt={"start button"}
               onClick={() => goNext()}
          />
      </main>
    </div>
  )
}

export default Planning;
