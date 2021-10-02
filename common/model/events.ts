export interface Event {
  name: string;
  content: string;
  chance: number;
  chanceIncrement?: number;

  // effects: Effects;
  // solutions: Solution[];
}

// export interface Effects {
//   [key: string]: number;
// }

// export interface Solution {
//   text: string;
//   effects: Effects;
// }

// Stats:
// - Hapiness [0-100]
// - Health [0-100]
// - Spacecraft Health [0-100]

export const events: Event[] = [
  {
    name: "Spoiled food",
    content: "Your astronauts ate some spoiled food. It turns out that the entire batch is spoiled.",
    chance: 0.01,
    chanceIncrement: 0,
    // Effect: Food -100 kg
    // Solution: Throw it away: Food -100 kg, Health -2, Hapiness -2
    // Solution: Take medicine: Food -100 kg, Medicine -1, Hapiness -1
  },
  {
    name: "Bad dream",
    content: "I had a bad dream last night. I dreamt I was falling towards Mars, but I didn't have anything to slow me down. I woke up just before I hit the ground, covered in sweat and with my heart racing. I know it's just a dream, but I can't shake the feeling something bad is going to happen",
    chance: 0.01,
    chanceIncrement: 0,
    // Effect: Hapiness -10
    // Solution: Try to forget it: Hapiness -10
    // Solution: Talk with a therapist: Hapiness -4
  },
  {
    name: "Homesick",
    content: "One of the astonauts had a dream about his family last night and is feeling homesick today.",
    chance: 0.01,
    chanceIncrement: 0,
    // Effect: Hapiness -4
    // Solution: Look at family photos: Hapiness -4
    // Solution: Call a friend (only if communication array is working): Hapiness +1
    // Solution: Call family (only if communication array is working): Hapiness +1
  },
  {
    name: "Solar flare",
    content: "The Parker Solar Probe, while doing a flyby of the sun, has detected a massive solar flare heading your way.\n" +
      "Solar flares pose a risk to both the crew due to radiation and the spaceship because they can overload electical equipment.",
    // http://www.nasa.gov/content/goddard/parker-solar-probe
    chance: 0.01,
    chanceIncrement: 0,
    // Furthere info about solar radiation and effects of solar flares: https://en.wikipedia.org/wiki/Solar_flare
    // Effect: Health -20, Spacecraft Health -20
    // Solution: I've been to the beach before and I'm fine: Health -20, Spacecraft Health -20 // info: Earths magnetic field protects against solar radiation. Radiation in space is much stronger than on the surface of the earth.
    // Solution: Take shelter in the core of the ship, turn off electronic devices: Hapiness -5, Spacecraft Health -1
    // Solution: Change course to avoid the flare: Fuel -100, Hapiness -2, (Delay +7 days?)
  },
  {
    name: "Minor accident",
    content: "John forgot to strap himself while sleeping, again ... He floated while asleep and banged his head on something sharp.",
    chance: 0.01,
    chanceIncrement: 0,
    // Effect: Health -5, Hapiness -2
    // Solution: Be more careful next time: Health -5, Hapiness -2 
    // Solution: Take painkillers: Health: -2, Medicine -1, Hapiness -1
  },
  {
    name: "Minor accident",
    content: "Jane hit her toe on the bulkhead door. It's not broken, but probably has a hairline fracture (astronauts loose bone mass in microgravity).",
    chance: 0.01,
    chanceIncrement: 0,
    // Effect: Health -10, Hapiness -2
    // Solution: Be more careful next time: Health -10, Hapiness -2
    // Solution: Take painkillers: Health: -5, Medicine -1, Hapiness -1
  },
  {
    name: "Bone and muscle loss",
    content: "Your astronauts have lost some of their bones and muscles due to lack of exercise in microgravity.\nThey are now much weaker than before.\nAt this rate serious medical problems would happen before you reach Mars, and they might not make it through the high G forces during landing.",
    chance: 0,
    chanceIncrement: 0.01,
    // Effect: Health -10, Hapiness -2
    // Solution: Take steroids: Health: -5, Medicine -1, Hapiness -1
    // Solution: Exercise (only if they have exercise equipment): Health: +2, Hapiness +5
  },
  {
    name: "It's so booring",
    content: "The monotony of the long flight is sinking in. The astronauts are bored and this is affecting their mood.",
    chance: 0,
    chanceIncrement: 0.01,
    // Effect: Hapiness -5
    // Solution: Take a nap: Hapiness -3
    // Solution: Throw a party: Hapiness +5, Music -2, Food -20, Water -10
    // Solution: Play a game: Hapiness +2, Games -2
    // Solution: Read a book: Hapiness +1
    // Solution: Watch a movie: Hapiness +2, Movies -2
  },
  {
    name: "Spacecraft malfunction",
    content: "The spacecraft has malfunctioned. One of the manuvering thrusters has failed and is firing sporadically.\n" +
      "If you leave it like this it could seriously affect your trajectory.\n" +
      "One of the astronauts will have to do an EVA and fix it.",
    chance: 0.005,
    chanceIncrement: 0.001,
    // Effect: Spacecraft Health -10, Hapiness -5
    // Solution: Do nothing: Spacecraft Health -20, Hapiness -5
    // Solution: Compensate with other thrusters: Spacecraft Health -5, Hapiness -2, Fuel -100
    // Solution: Fix the thruster (EVA): Hapiness -1, Spare Parts -5
  },
  {
    name: "Spacecraft malfunction",
    content: "The pumps in the cooling system stoped working.\n" +
      "In space radiative cooling is one of the few ways by which a spacecraft can loose heat.\n" +
      "If the pumps are not working the radiators can't dissipate the heat fast enough and the temperature in the crew module will keep rising.",
    // https://en.wikipedia.org/wiki/Spacecraft_thermal_control
    chance: 0.01,
    chanceIncrement: 0,
    // Effect: Health -20, Spacecraft Health -20, Hapiness -20
    // Solution: A bit of heat never hurt anyone before: Health -20, Spacecraft Health -20, Hapiness -20
    // Solution: Vent the heat: Spacecraft Health -10, Hapiness -5, Oxygen -20
    // Solution: Fix the heat pump: Spare parts -20
  },
  {
    name: "Surprise",
    content: "You open today's dinner and find that the ground crew prepared a surprise for you: Chocolate cake",
    chance: 0.001,
    chanceIncrement: 0.001,
    // Effect: Hapiness +5
    // Solution: Eat it: Hapiness +5
  },
  {
    name: "Air Quality",
    content: "The air quality is so bad that the astronauts are not able to breathe properly.\n" +
      "After further investigation you find out that the small particulate filter has some water damage and needs to be replaced.",
    chance: 0.01,
    chanceIncrement: 0,
    // Effect: Health -10, Hapiness -5
    // Solution: Just ignore it: Health -10, Hapiness -5
    // Solution: Vent the bad air: Hapiness -5, Oxygen -20
    // Solution: Replace the filter: Spare parts -20    
  },
  {
    name: "Air Quality",
    content: "The CO2 scrubber is not working at 100% efficiency. The astronauts are having trouble concentrating and some are experiencing headaches.",
    chance: 0.01,
    chanceIncrement: 0,
    // Effect: Health -10, Hapiness -5
    // Solution: Just ignore it: Health -10, Hapiness -5
    // Solution: Take painkillers: Health -8, Hapiness -2, Medicine -2
    // Solution: Vent the bad air: Hapiness -5, Oxygen -20
    // Solution: Replace the filter: Spare parts -20
  },
  {
    name: "Insomnia",
    content: "The lack of dark light cycles is messing with the astronauts circadian rithms. Some of them are having trouble sleeping.",
    chance: 0.01,
    chanceIncrement: 0,
    // Effect: Health -10, Hapiness -5
    // Solution: Ignore it, they will get used to it: Health -10, Hapiness -5
    // Solution: Take sleeping pills: Health -2, Hapiness -1, Medicine -1
    // Solution: Use ambient lights: Hapiness +2
  },
  {
    name: "Spacecraft malfunction",
    content: "The toilet is malfunctioning and is not providing enough suction.\n" +
      "Using a toilet in space is hard enough when everything works fine, but this is really affecting the mood and health of the astronauts.",
      // https://www.cnet.com/news/spacex-inspiration4-crew-had-challenges-with-the-spacecrafts-toilet-elon-musk-says/
      chance: 0.01,
      chanceIncrement: 0,
      // Effect: Health -10, Hapiness -5
      // Solution: Just ignore it: Health -10, Hapiness -5
      // Solution: Replace the toilet: Spare parts -20
  },
  {
    name: "Space dust",
    content: "An unexpected cloud of dust damaged the communication array. You will need to replace it, otherwise you won't be able to talk with Earth",
    chance: 0.01,
    chanceIncrement: 0,
    // Effect: Spacecraft Health -10, Hapiness -5, No Communication
    // Solution: Who needs Earth anyway?: Spacecraft Health -10, Hapiness -5, No Communication
    // Solution: Fix the antenna: Spare parts -20
  },
  {
    name: "Solar flare",
    content: "A small undetected solar flare caused a surge in the communication array. The communication array is malfunctioning and is not providing any signal.",
    chance: 0.01,
    chanceIncrement: 0,
    // Effect: Spacecraft Health -10, Hapiness -5, No Communication
    // Solution: Who needs Earth anyway?: Spacecraft Health -10, Hapiness -5, No Communication
    // Solution: Fix the antenna: Spare parts -20
  },
  {
    name: "Wrong trajectory",
    content: "During launch one of the engines underperformed and now the spacecraft is headed on the wrong trajectory",
    chance: 0.6, // high risk on first day
    chanceIncrement: -0.1, // risk decreases with time
    // Effect: Health -100, Hapiness -100 // Die
    // Solution: Fix the trajectory: Fuel -100
  },
  {
    name: "Hull breach",
    content: "A micrometeorite caused a small puncture in the hull. You are loosing air pressure.",
    chance: 0.01,
    chanceIncrement: 0,
    // Effect: Spacecraft Health -10, Health -30, Hapiness -30, Oxygen -30
    // Solution: It's just a small hole we can live with it: Spacecraft Health -10, Health -30, Hapiness -30, Oxygen -30
    // Solution: Use reserve tank: Spacecraft Health -10, Hapiness -10, Oxygen -100
    // Solution: Patch the hole: Spare parts -20
  },
  {
    // TODO: this is only for landing on Mars!
    name: "Mars dust storm",
    content: "A massive dust storm is raging on Mars. You can't land in this weather, you will have to wait until it dies down",
    chance: 0.01,
    chanceIncrement: 0,
    // Effect: Hapiness -10, Duration +14 days, Food -100, Oxygen -100, Water -100
    // Solution: Wait for the storm to pass
    // Solution: Risk the landing (50% chance of death)
  },
  {
    name: "I like this song",
    content: "One of your crew was playing a song that you like. Sharing this made the bond between you stronger.",
    chance: 0.01,
    chanceIncrement: 0,
    // Effect: Hapiness +5
  },
  {
    name: "Can you please turn that down?",
    content: "One of your crew was playing a song that you hate on repeat. You told them to skip the song, but they ignored you and turned the volume up",
    chance: 0.01,
    chanceIncrement: 0,
    // Effect: Hapiness -5
    // Solution: Yell at them to turn it down: Hapiness -5
    // Solution: Play your own music louder: Hapiness -4, Music -2
  },
  {
    name: "Water leak",
    content: "One of the water pipes burst and you have a leak in the crew module.",
    chance: 0.01,
    chanceIncrement: 0,
    // Effect: Spacecraft Health -10, Hapiness -5, Water -30
    // Solution: Close the valve: Spacecraft Health -10, Hapiness -5, Water -30
    // Solution: Replace the pipes: Water -20, Spare parts -20
  },
  {
    name: "Water or Ice",
    content: "Water in the main tank has frozen due to an insulator that fell of during launch.",
    chance: 0.01,
    chanceIncrement: 0,
    // Effect: Spacecraft Health -10, Hapiness -5, Water -30
    // Solution: Ignore it, we still have a reserve: Spacecraft Health -10, Hapiness -5, Water -30
    // Solution: Create a heater and melt the ice: Spare parts -10
  },
  {
    name: "Movie night",
    content: "One of the astronauts proposes you do a movie night.",
    chance: 0.01,
    chanceIncrement: 0,
    // Effect: Hapiness +5, Movies -2
    // Solution: We have work to do: Hapiness -2
    // Solution: Movie night: Hapiness +5, Movies -2
    // Solution: Bring out the pizza: Hapiness +10, Movies -2, Food -10
  },
  {
    name: "Green or Gray",
    //https://99designs.com/blog/tips/how-color-impacts-emotions-and-behaviors/
    content: "Seeing green plants and taking care of them can be a great mood booster. The color green can make you feel optimistic and refreshed. When everything around is gray the mood of the crew will be more bland.",
    chance: 0.01,
    chanceIncrement: 0,
    // Effect: Hapiness +5, Movies -2
    // Solution: Let's plant some plants: Hapiness +5, Water -5
    // Solution: We can't waste the water: Hapiness -5
  },
  {
    name: "Fire",
    // https://www.space.com/13766-international-space-station-flex-fire-research.html
    content: "Fire is a different beast in space than it is on the ground. \nWhen flames burn on Earth, heated gases rise from the fire, drawing oxygen in and pushing combustion products out. In microgravity, hot gases don't rise. So an entirely different process, called molecular diffusion, drives flame behavior.\n" + 
    "Space flames can also burn at a lower temperature and with less oxygen than fires on Earth. As a result, the material used to put out space fires must be more concentrated",
    chance: 0.01,
    chanceIncrement: 0,
    // Effect: Health -10, Hapiness -10, Spacecraft Health -10
    // Solution: Let it die out: Health -10, Hapiness -10, Spacecraft Health -10
    // Solution: Use water: Hapiness -2, Spacecraft Health -1, Water -20
    // Solution: Use fire extiguisher: Fire estinguisher -1
  },
  {
    name: "Sick",
    content: "Even though all astronauts were in quarantine before the flight, it seems one of them has caught the flue.",
    chance: 0.01,
    chanceIncrement: 0,
    // Effect: Health -10, Hapiness -10
    // Solution: It's just the flue: Health -30, Hapiness -7
    // Solution: Isolate him: Health -10, Hapiness -10
    // Solution: Isolate him and give medicine: Hapiness -3, Medicine -2
    // Solution: Give everybody medicine: Hapiness -2, Medicine -10
  }


];
