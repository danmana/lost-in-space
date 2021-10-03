import styles from "../styles/Execution.module.scss";
import { NextPage } from "next";
import { Stats } from '../common/model/stats.model';
import { useContext, useEffect, useState } from 'react';
import { WarehouseContext } from '../common/context/warehouse.context';
import { Mission } from "../common/model/mission.model";
import { events, Solution } from "../common/model/event.model";

const stats: { [key: string]: Stats } = {
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
};

const initialMission: Mission = {
  distance: 0,
  day: 0
}

const shownResources = ["Fuel", "Food", "Water", "Oxygen", "Meds"];

const Execution: NextPage = () => {
  const [mission, setMission] = useState(initialMission);
  const [currentEvent, setCurrentEvent] = useState(null as any);
  const [animation, setAnimation] = useState(null as any);
  const [solutionEffects, setSolutionEffects] = useState();
  const [failedMission, setFailedMission] = useState(false);
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
          { bottom: '5%', right: '50%', transform: 'translateX(-50%) rotate(5deg)' },
          { bottom: '50%', right: '44%', transform: 'translateX(-50%) rotate(17deg)' },
          { bottom: '75%', right: '41%', transform: 'translateX(-50%) rotate(35deg)' },
          { bottom: '90%', right: '35%', transform: 'translateX(-50%) rotate(200deg)' },
        ], {
          duration: 300000,
          easing: 'cubic-bezier(.4,.9,0,1)',
          fill: 'both',
        })

      setAnimation(animatedRocket);
    }
  }, []);

  useEffect(() => {
    if (currentEvent) {
      animation.pause();
    }
  }, [currentEvent]);

  useEffect(() => {
    const event = getEvent();
    setCurrentEvent(event);
  }, [mission.day])

  useEffect(() => {
    const newWarehouse = { ...warehouse };
    newWarehouse.resources.fuel && (newWarehouse.resources.fuel.remaining -= 0.5);
    newWarehouse.resources.water && (newWarehouse.resources.water.remaining -= 0.5);
    newWarehouse.resources.oxygen && (newWarehouse.resources.oxygen.remaining -= 0.5);
    newWarehouse.resources.meds && (newWarehouse.resources.meds.remaining -= 0.5);

    const resourceDepleted = Object.entries(newWarehouse.resources).some(([key, value]) => {
      return value.remaining === 0;
    });

    if (resourceDepleted) {
      setFailedMission(true);
    }
  }, [mission.day]);

  useEffect(() => {
    animation && animation.pause();
  }, [failedMission]);

  useEffect(() => {
    if (!failedMission && !currentEvent && mission.day < 300) {
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

  }, [mission.day, currentEvent, failedMission]);

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

  const applySolution = (event: any) => {
    if (solutionEffects) {
      const newWarehouse = { ...warehouse };
      Object.entries(solutionEffects).forEach(([key, value]) => {
        if (newWarehouse.stats[key]) {
          newWarehouse.stats[key].value += (value as number);
        }
      });
      setCurrentEvent(null);
      setWarehouse(newWarehouse);
      setSolutionEffects(undefined);
      animation.play();
    }
  };

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

  const onChangeValue = (event: any) => {
    setSolutionEffects(JSON.parse(event.target.value));
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

      {currentEvent &&
      <section className={styles.dialog}>
          <h3>{currentEvent.name}</h3>
          <div
              dangerouslySetInnerHTML={{ __html: currentEvent.content }}
          ></div>
          <div onChange={onChangeValue} className={styles.inputContainer}>
            {currentEvent.solutions.map((solution: Solution, index: number) => {
              return (
                <label key={index}>
                  <input type="radio" value={JSON.stringify(solution.effects)} name="solutions"/> {solution.text}
                </label>
              );
            })}
          </div>
          <div className={styles.buttonContainer}>
              <button className={`${styles.button} ${solutionEffects ? '': styles.grayedOut}`} onClick={applySolution}>Proceed</button>
          </div>
      </section>
      }
    </main>
  )
}

export default Execution;
