import styles from "../styles/Execution.module.scss";
import { NextPage } from "next";
import { Stats } from '../common/model/stats.model';
import { useContext, useEffect, useState } from 'react';
import { WarehouseContext } from '../common/context/warehouse.context';
import { Mission } from "../common/model/mission.model";
import { events } from "../common/model/event.model";

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

const initialMission: Mission = {
  distance: 0,
  day: 0
}

const shownResources = ["Fuel", "Food", "Water", "Oxygen", "Meds"];

const Execution: NextPage = () => {
  const [mission, setMission] = useState(initialMission);
  const [currentEvent, setCurrentEvent] = useState(null as any);
  const { warehouse, setWarehouse } = useContext(WarehouseContext);

  useEffect(() => {
    const newWarehouse = { ...warehouse };
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
          {bottom: '5%', right: '50%', transform: 'translateX(-50%) rotate(5deg)'},
          {bottom: '50%', right: '44%', transform: 'translateX(-50%) rotate(17deg)'},
          {bottom: '75%', right: '41%', transform: 'translateX(-50%) rotate(35deg)'},
          {bottom: '90%', right: '35%', transform: 'translateX(-50%) rotate(200deg)'},
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

  const getEvent = () => {
    const eventsToHappen = events.map(event => {
      const chance = Math.random();
      return { chance, event };
    }).filter(({ chance, event }) => {
      return chance < event.chance;
    });
    if (eventsToHappen.length) {
      return eventsToHappen.reduce(((previousValue, currentValue) => {
        return previousValue.chance < currentValue.chance ? currentValue: previousValue;
      })).event;
    } else {
      return null;
    }
  }

  useEffect(() => {
    if (currentEvent) {
      console.log(currentEvent);
    }
  }, [currentEvent]);

  useEffect(() => {
    const event = getEvent();
    setCurrentEvent(event);

    if (!event && mission.day < 700) {
      const timer = window.setInterval(() => {
        setMission(mission => {
          const newMission = { ...mission };
          newMission.day += 1;
          newMission.distance += 724427;
          return newMission;
        });
      }, 200)
      return () => window.clearInterval(timer);
    }

  }, [mission.day]);

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
               style={{ width: `${percentage}%`, backgroundColor: getColor(percentage) }}></div>
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
        <div>Day {mission.day}</div>
        <div>Distance: {mission.distance} km</div>
      </section>
    </main>
  )
}

export default Execution;
