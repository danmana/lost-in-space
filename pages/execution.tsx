import styles from "../styles/Home.module.css";
import Link from "next/link";
import {NextPage} from "next";

const Execution: NextPage = () => {
    return (
        <div className={styles.container}>
            <main>
                <h1>The moment of truth, how far can you get? ;)</h1>
                <Link href={"/"}>Restart</Link>
            </main>
        </div>
    )
}

export default Execution;
