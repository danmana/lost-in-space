import styles from "../styles/Execution.module.scss";
import { NextPage } from "next";
import { ResourceAvailability } from '../common/model/execution.model';
import { Stats } from '../common/model/stats.model';

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
const stats: Stats[] = [
  {
    value: 75,
    type: "Mood"
  },
  {
    value: 32,
    type: "Health"
  },
  {
    value: 55,
    type: "Aircraft"
  },

];


const Execution: NextPage = () => {
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
            stats.map((stat, index) => (
              <div key={stat.type + index}>
                <div>{stat.type}</div>
                <div className={styles.progressContainer}>
                  {progress(stat.value)}
                  <span>{stat.value}&nbsp;/&nbsp;100</span>
                </div>
              </div>
            ))
          }
        </div>
        <h4>Resources</h4>
        <div>
          {
            resources.map((resource, index) => {
              if (!resource.showInStats) {
                return null;
              }

              return (
                <div key={resource.type + index}>
                  <div>{resource.type}</div>
                  <div className={styles.progressContainer}>
                    {progress(Math.ceil(resource.remaining * 100 / resource.quantity))}
                    <span>{resource.remaining}&nbsp;/&nbsp;{resource.quantity}</span>
                  </div>
                </div>
              )
            })
          }
        </div>
      </section>
      <section className={styles.journey}></section>
      <section className={styles.info}>
        <div>Distance: 12.678 km</div>
        <div>Day 134</div>
      </section>
    </main>
  )
}

export default Execution;
