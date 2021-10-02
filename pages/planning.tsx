import styles from "../styles/Home.module.css";
import Link from "next/link"

const Planning = () => {
    return (
        <div className={styles.container}>
            <main>
                <h1>Plan your resources so that the space crew can reach mars!</h1>
                    <Link href={"/execution"}>
                        Let's see if you got everything right
                    </Link>
            </main>
        </div>
    )
}

export default Planning;
