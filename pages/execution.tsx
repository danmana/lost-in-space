import styles from "../styles/Execution.module.scss";
import { NextPage } from "next";
import { ResourceAvailability } from '../common/model/execution.model';
import { Stats } from '../common/model/stats.model';
import { useContext, useEffect } from 'react';
import { WarehouseContext } from '../common/context/warehouse.context';

const resources: ResourceAvailability[] = [
  {
    quantity: 170,
    type: "Food",
    remaining: 120,
    showInStats: true
  },
  {
    quantity: 200,
    type: "Water",
    remaining: 100,
    showInStats: true
  },
  {
    quantity: 250,
    type: "Oxygen",
    remaining: 220,
    showInStats: true
  },
  {
    quantity: 200,
    type: "Meds",
    remaining: 20,
    showInStats: true
  },
  {
    quantity: 150,
    type: "Equipment",
    remaining: 140,
    showInStats: false
  },

  // TODO check how to include this
  // {
  //   quantity: 170,
  //   type: "Misc",
  //   remaining: 120
  // }
];
const stats: { [key: string]: Stats } = {
  mood: {
    value: 75,
    type: "Mood"
  },
  health: {
    value: 32,
    type: "Health"
  },
  aircraft: {
    value: 55,
    type: "Aircraft"
  }
};

const shownResources = ["Fuel", "Food", "Water", "Oxygen", "Meds"];


const Execution: NextPage = () => {
  const {warehouse, setWarehouse} = useContext(WarehouseContext);

  useEffect(() => {
    const newWarehouse = {...warehouse};
    Object.values(newWarehouse.resources)
      .forEach((resource) => {
        resource.remaining = resource.quantity
      });

    newWarehouse.stats = stats;

    setWarehouse(newWarehouse);

    const rocket = document.getElementById('rocket');
    if (rocket) {

      const animatedRocket = rocket.animate(
        [
          {bottom: '20px', right: '50%', transform: 'translateX(-50%) rotate(5deg)'},
          {bottom: '450px', right: '44%', transform: 'translateX(-50%) rotate(17deg)'},
          {bottom: '600px', right: '41%', transform: 'translateX(-50%) rotate(35deg)'},
          {bottom: '800px', right: '35%', transform: 'translateX(-50%) rotate(200deg)'},
        ], {
          duration: 30000,
          easing: 'cubic-bezier(.4,.9,0,1)',
          // easing: 'ease-out',
          fill: 'both',
          // delay: 2000
        })

      // setTimeout(() => {
      //   animatedRocket.pause();
      // }, 5000)
    }
  }, []);

  const progress = (percentage: number) => {
    return (
      <div className={styles.loaderBar}>
        <div className={styles.blockBorder}></div>
        <div className={styles.blockBorder}></div>
        <div className={styles.blockBorder}></div>
        <div className={styles.blockBorder}></div>
        <div className={styles.blockBorder}></div>
        <div className={styles.blockBorder}></div>
        <div className={styles.blockBorder}></div>
        <div className={styles.blockBorder}></div>
        <div className={styles.blockMeter}>
          <div className={styles.progress}
               style={{width: `${percentage}%`, backgroundColor: getColor(percentage)}}></div>
        </div>
      </div>
    );
  }

  const getColor = (percentage: number) => {
    let color;
    if (percentage < 34) {
      color = '#f0401c';
    } else if (percentage < 67) {
      color = '#fffe04';
    } else {
      color = '#81ff08';
    }

    return color
  }

  return (
    <main className={styles.container}>
      <section className={styles.stats}>
        <h3>How's it going?</h3>
        <h4>Stats</h4>
        <div>
          {
            Object.values(warehouse.stats).map((stat, index) => {
              return (
                <div key={stat.type + index}>
                  <div>{stat.type}</div>
                  <div className={styles.progressContainer}>
                    {progress(stat.value)}
                    <span>{stat.value}&nbsp;/&nbsp;100</span>
                  </div>
                </div>
              )
            })

          }
        </div>
        <h4>Resources</h4>
        <div>
          {
            Object.values(warehouse.resources).map((resource, index) => {
              if (!shownResources.includes(resource.resource.type)) {
                return null;
              }

              return (
                <div key={resource.resource.type + index}>
                  <div>{resource.resource.type}</div>
                  <div className={styles.progressContainer}>
                    {progress(Math.ceil((resource.remaining || 0) * 100 / resource.quantity))}
                    <span>{resource.remaining}&nbsp;/&nbsp;{resource.quantity}</span>
                  </div>
                </div>
              )
            })
          }
        </div>
      </section>
      <section className={styles.journey}>
        <img src={'/svg/rocket2.svg'} alt={"Rocket"} id="rocket"/>
      </section>
      <section className={styles.info}>
        <div>Distance: 12.678 km</div>
        <div>Day 134</div>
      </section>
    </main>
  )
}

export default Execution;
