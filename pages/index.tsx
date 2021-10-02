import type { NextPage } from 'next'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>Hello! Look at the space wonders! Wanna go out for a ride?</h1>
          <Link href={"/planning"}>
              Let's plan this trip!
          </Link>
      </main>
    </div>
  )
}

export default Home
