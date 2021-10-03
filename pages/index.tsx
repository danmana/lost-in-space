import type { NextPage } from 'next'
import indexStyles from '../styles/Index.module.scss'
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import Image from 'next/image'
import Team from '../public/team.svg';
import Astro from '../public/happy_astronaut.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../common/context/user.context';
import BackgroundPlanets from "../common/components/background-planets";

const Introduction = {
  messages: [
    {
      content: "What took you so long to arrive? Err... nevermind, let's get to business, no time to waste here! <br><br>" +
          "Your new mission is to land on Mars together with your crew. We managed to get a new spaceship, THE STARSHIP! Can you believe it? " +
          "You can read all the specs <a style='color:blue' target='_blank' href='https://www.space.com/spacex-starship-super-heavy.html'>here</a>. The launch window starts from 23rd of October and will last for 4 weeks, we'll have the " +
          "lift-off and then travel in an elliptical orbit around the Sun that will eventually intersect the orbit of Mars. <br><br> Go now! Btw, plan your " +
          "resources carefully so that you can reach Mars with no problems!"
    },
    {
      content: "Oh! I forgot, this is your new crew: Meet your space colleagues Pati and Dana, they can be funny, at times... ALSO they'll " +
          "help you around for all the issues that may appear in your long \"excursion\" (communication issues, toilet breakdowns or other things like this)." +
          "<br><br> You'll also have Dr. Dreu as your own personal \"Houston\", which will aid you along the whole process. And of course me.. I'm gonna " +
          "try to give you some tips and tricks and hopefully you'll listen to some of them. What was your name again?",
      resource: Team,
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
      <div className={indexStyles.parent}>
        <BackgroundPlanets/>
        <main className={indexStyles.container}>
          <img src={'/svg/mad.svg'} alt="Mad scientist"/>
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
          <div className={indexStyles.resources}>
            {messages[currentMessage].resource && <Image src={messages[currentMessage].resource} width={400}/>}
          </div>
        </main>
      </div>

  )
}

export default Home
