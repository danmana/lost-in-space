import styles from "../styles/Execution.module.scss";
import { NextPage } from "next";
import { useContext, useEffect, useState } from 'react';
import { WarehouseContext } from '../common/context/warehouse.context';
import { Mission } from "../common/model/mission.model";
import { events, Solution } from "../common/model/event.model";
import * as ga from '../common/google-analytics';
import { useRouter } from 'next/router';
import { UserContext } from '../common/context/user.context';

const daysToMars = 195;
const secondToMoon = 35000;

const play = true;
// const play = false;

const initialMission: Mission = {
  distance: 0,
  hours: 0
}

const shownResources = ["Fuel", "Food", "Water", "Oxygen", "Meds"];

const Execution: NextPage = () => {
  const router = useRouter();
  const {username} = useContext(UserContext);
  const [mission, setMission] = useState(initialMission);
  const [currentEvent, setCurrentEvent] = useState(null as any);
  const [animation, setAnimation] = useState(null as any);
  const [solutionEffects, setSolutionEffects] = useState();
  const [isBoom, setIsBoom] = useState(false);
  const [isDead, setIsDead] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [day, setDay] = useState(0);
  const [timeout, setTimeout] = useState(secondToMoon / 24);
  const { warehouse, setWarehouse } = useContext(WarehouseContext);

  useEffect(() => {
    if (!username) {
      router.replace('/');
    } else if (!warehouse?.resources || Object.keys(warehouse?.resources).length === 0) {
      router.replace('/planning');
    } else {
      const map = document.getElementById('map');
      if (map) {
        map.animate(
          [
            {transform: 'translateY(-93%)'},
            {transform: 'translateY(-31%)'},
          ], {
            duration: secondToMoon + (secondToMoon / 24),
            easing: 'linear',
            fill: 'both',
          })
      }
    }

  }, []);

  useEffect(() => {
    if (currentEvent && animation) {
      animation.pause();
    }
  }, [currentEvent, animation]);

  useEffect(() => {
    if (play && day > 0) {
      const event = getEvent();
      setCurrentEvent(event);
    }
  }, [day])

  useEffect(() => {
    const newWarehouse = { ...warehouse };
    newWarehouse.resources.fuel && (newWarehouse.resources.fuel.remaining -= 1);
    newWarehouse.resources.food && (newWarehouse.resources.food.remaining -= 3);
    newWarehouse.resources.water && (newWarehouse.resources.water.remaining -= 1);
    const oxygen = newWarehouse.stats.health.value < 50 ? Math.floor(Math.random() * (3 - 1) + 1): 1;
    const meds = newWarehouse.stats.health.value < 50 ? Math.floor(Math.random() * (3 - 1) + 1): 1;
    newWarehouse.resources.oxygen && (newWarehouse.resources.oxygen.remaining -= oxygen);
    newWarehouse.resources.meds && (newWarehouse.resources.meds.remaining -= meds);

    setWarehouse(newWarehouse);
  }, [day]);

  useEffect(() => {
    if (day === daysToMars) {
      const dieAnyway = Math.random() < 0.3;
      if (dieAnyway) {
        ga.event('BOOM');
        setIsBoom(true);
      } else {
        ga.event('WIN');
        setIsSuccess(true);
      }
      setCurrentEvent(null);
    }
  }, [day]);

  useEffect(() => {
    const resourceDepleted = Object.entries(warehouse.resources).some(([key, value]) => {
      return shownResources.includes(value.resource.type) && value.remaining <= 0;
    });
    const statsDepleted = Object.entries(warehouse.stats).some(([key, value]) => {
      return value.value <= 0;
    });

    if (resourceDepleted || statsDepleted) {
      ga.event('DEAD', { warehouse });
      setIsDead(true);
    }
  }, [warehouse]);

  useEffect(() => {
    if (isDead) {
      animation && animation.pause();
      setCurrentEvent(null);
    }
  }, [isDead]);

  useEffect(() => {
    if (play) {
      if (!isDead && !isBoom && !isSuccess && !currentEvent && day < daysToMars) {
        const timer = window.setInterval(() => {
          setMission(mission => {
            const newMission = { ...mission };
            let newDay = day;
            if (newMission.hours < 24) {
              newMission.hours += 1;
              newMission.distance += 1119758 / 24;
            } else {
              setTimeout(100);
              const newDay = newMission.hours / 24;
              setDay(newDay)
              newMission.hours += 24;
              newMission.distance += 1119758;
            }

            if (newDay === 1) {
              const map = document.getElementById('map');
              if (map) {
                const animatedMap = map.animate(
                  [
                    {transform: 'translateY(-31%)'},
                    {transform: 'translateY(0)'},
                  ], {
                    duration: 19400,
                    easing: 'linear',
                    fill: 'both',
                  })

                setAnimation(animatedMap);
              }
            }

            if (newDay === 175) {
              const rocket = document.getElementById('rocket');
              if (rocket) {
                rocket.animate(
                  [
                    {transform: 'translateX(-50%)', bottom: '20px'},
                    {transform: 'translateX(-50%) rotate(180deg)', bottom: '150px'},
                  ], {
                    duration: 2500,
                    easing: 'linear',
                    fill: 'both',
                  })
              }
            }

            return newMission;
          });
        }, timeout)
        return () => window.clearInterval(timer);
      }
    }

  }, [day, currentEvent, isDead, isBoom, isSuccess]);

  const getEvent = () => {
    const eventsToHappen = events.map(event => {
      const chance = Math.random();
      return { chance, event };
    }).filter(({ chance, event }) => {
      return chance < event.chance;
    });
    if (eventsToHappen.length) {
      return eventsToHappen.reduce(((previousValue, currentValue) => {
        return previousValue.chance < currentValue.chance ? currentValue : previousValue;
      })).event;
    } else {
      return null;
    }
  }

  const applySolution = (event: any) => {
    if (solutionEffects) {
      ga.event('APPLY_SOLUTION', { solution: solutionEffects });
      const newWarehouse = { ...warehouse };
      Object.entries(solutionEffects).forEach(([key, value]) => {
        if (newWarehouse.stats[key]) {
          newWarehouse.stats[key].value += (value as number);
        }
      });
      setCurrentEvent(null);
      setWarehouse(newWarehouse);
      setSolutionEffects(undefined);
      if (animation) {
        animation.play();
      }
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

  const again = () => {
    ga.event('RESTART_GAME');
    window.location.href = "/";
  }

  return (
    <>
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
          <img src={'/svg/rocket2.svg'} alt={"Rocket"} id="rocket" className={styles.rocket}/>
        </section>
        <section className={styles.info}>
          <div>
            {
              mission.hours <= 24 ? <div>Hours {mission.hours}</div>: <div>Days {day}</div>
            }
          </div>
          {day >= 3 && <div>Distance: {Math.ceil(mission.distance).toLocaleString()} km</div>}
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
                    <input type="radio" value={JSON.stringify(solution.effects)} name="solutions"/>
                    <div>
                      <div>{solution.text}</div>
                      <div className={styles.solutionEffects}>
                      ({
                          Object.entries(solution.effects).map(([res, value], i) => {
                              return <span key={res}>
                                  {i > 0 ? ', ': ''}
                                  {res}:
                                  <span className={value < 0 ? styles.effectNegative: styles.effectPositive}>
                                    {value > 0 ? '+': ''}{value}
                                  </span>
                                  </span>
                          })
                      })
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
            <div className={styles.buttonContainer}>
                <button className={`${styles.button} ${solutionEffects ? '': styles.grayedOut}`}
                        onClick={applySolution}>Proceed
                </button>
            </div>
        </section>
        }

        {isBoom &&
        <section className={`${styles.dialog} ${styles.isBoom}`}>
            <img src={"/boom.png"} alt={"You exploded!"}/>
            <div>
                <p>Damn, you missed the landing. It happens even to the best astronauts. Next time try another landing
                    spot!</p>
                <p>Good luck!</p>
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.button} onClick={again}>Start again</button>
            </div>
        </section>
        }

        {isDead &&
        <section className={`${styles.dialog} ${styles.isDead}`}>
            <img src={"/svg/dead.svg"} alt={"You died!"}/>
            <div>
                Seems like the journey didn't go so well. Make sure to plan well from the beginning next time and don't
                forget, it's up to you to keep the team safe until during your
                trip to Mars!
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.button} onClick={again}>Start again</button>
            </div>
        </section>
        }

        {isSuccess &&
        <section className={`${styles.dialog} ${styles.isSuccess}`}>
            <img src={"/success.png"} alt={"You succeeded!"}/>
            <div>
                Congrats! You made it to Mars! Enjoy your time here while preparing for your journey back to Earth!
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.button} onClick={again}>Another try</button>
            </div>
        </section>
        }
      </main>
      <img className={styles.map} src={'/map2.png'} alt={"Map"} id="map"/>
    </>
  )
}

export default Execution;
