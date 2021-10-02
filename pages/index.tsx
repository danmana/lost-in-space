import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import indexStyles from '../styles/Index.module.scss'
import { useRouter } from 'next/router';
import { useState } from 'react';
import Image from 'next/image'
import Rocket from '../public/rocket.webp';
import Astro from '../public/happy_astronaut.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Introduction = {
  messages: [
    {
      content: "Welcome to <i><b>Lost in Space</b></i>. Here is the first message from our introduction. We hope you will like our game. Enjoy!",
      resource: Rocket
    },
    {
      content: "Here you can meet the Happy astronaut. Over and over again. What is your name? Here you can meet the Happy astronaut. Over and over again. What is your name?",
      resource: Astro,
      inputs: [{
        name: "username",
        placeholder: "Enter your name"
      }]
    }
  ]
};

const Home: NextPage = () => {
  const router = useRouter();
  const [currentMessage, setCurrentMessage] = useState(0);
  const messages = Introduction.messages;

  const goNext = () => {
    const isLast = currentMessage + 1 > messages.length - 1;
    if (isLast) {
      router.push('/planning');
      return;
    }
    setCurrentMessage(currentMessage + 1);
  }

  const goBack = () => {
    if (currentMessage > 0) {
      setCurrentMessage(currentMessage - 1);
    }
  }

  return (
    <div className={styles.container}>
      <main className={indexStyles.container}>
        <section className={indexStyles.messages}>
          <div
            className={indexStyles.message}
            dangerouslySetInnerHTML={{__html: messages[currentMessage].content}}
          >
          </div>
          <div className={indexStyles.buttons}>
            {currentMessage > 0 && <FontAwesomeIcon icon={faChevronLeft} onClick={goBack} />}
            <FontAwesomeIcon icon={faChevronRight} onClick={goNext} />
            {(currentMessage === messages.length - 1) && <div>Start here</div>}
          </div>
        </section>
        <section className={indexStyles.resources}>
          <Image src={messages[currentMessage].resource}/>
        </section>
      </main>
    </div>
  )
}

export default Home
