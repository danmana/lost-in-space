import styles from "../styles/Home.module.css";
import Link from "next/link";
import {NextPage} from "next";

const Ending: NextPage = () => {
    return (
        <div className={styles.container}>
            <main>
                <h1>It's over</h1>
                <Link href={"/"}>Yay or Nay?</Link>
            </main>
        </div>
    )
}

export default Ending;
