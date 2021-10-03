import React from "react";
import styles from "../../styles/background-planets.module.scss";

const BackgroundPlanets =()=> {
    return (
        <>
            <img src={"/earth.gif"} width={250} height={250} alt={"earth gif"} className={styles.earth}/>
            <img src={"/mars.gif"} width={1024} height={1024} alt={"mars gif"} className={styles.mars}/>
        </>
    )
}
export default BackgroundPlanets;
