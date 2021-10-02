import type { NextPage } from 'next'
import indexStyles from '../styles/Index.module.scss'
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import Image from 'next/image'
import Rocket from '../public/rocket.webp';
import Astro from '../public/happy_astronaut.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../common/context/user.context';

const Introduction = {
  messages: [
    {
      content: "Welcome to <i><b>Lost in Space</b></i>. Here is the first message from our introduction. We hope you will like our game. Enjoy!",
      resource: Rocket
    },
    {
      content: "Here you can meet the Happy astronaut. Over and over again. What is your name?",
      resource: Astro,
      inputName: true
    }
  ]
};

const Home: NextPage = () => {
  const router = useRouter();
  const [currentMessage, setCurrentMessage] = useState(0);
  const {username, setUsername} = useContext(UserContext);
  const messages = Introduction.messages;

  const goNext = () => {
    const isLast = currentMessage + 1 > messages.length - 1;
    if (isLast) {
      if (username) {
        router.push('/planning');
      }
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
    <main className={indexStyles.container}>
      <img src={'/avatars/mad.svg'} alt="Mad scientist"/>
      <section className={indexStyles.messages}>
        <div
          className={indexStyles.messageContainer}
        >
          <div
            className={indexStyles.message}
            dangerouslySetInnerHTML={{__html: messages[currentMessage].content}}
          >
          </div>
          {
            messages[currentMessage].inputName &&
            <div className={indexStyles.inputContainer}>
              <input type="text"
                     value={username}
                     onChange={(event) => setUsername(event.target.value)}/>
            </div>
          }
        </div>
        <div className={indexStyles.buttons}>
          {currentMessage > 0 &&
          <FontAwesomeIcon className={indexStyles.backButton} icon={faChevronLeft} onClick={goBack}/>}
          <FontAwesomeIcon icon={faChevronRight} onClick={goNext}/>
        </div>
      </section>
      <section className={indexStyles.resources}>
        <Image src={messages[currentMessage].resource}/>
      </section>
    </main>
  )
}

export default Home
