import { linkToCV } from './const';

const certificate = (url) => [
  'You can view the ',
  { tag: `<a href='${url}' target='_blank'>certificate</a>` },
  ' and explore my full ',
  linkToCV,
  '.',
];

const certificate1 = [
  ['📜 I completed the RS School Front-End / JavaScript course in 2019.'],
  ['It was my entry into modern web development.'],
  certificate('https://drive.google.com/file/d/1G3pBTTAl14l76X1HfqXKaaAkFCrMKU-1/view?usp=sharing'),
];

const certificate2 = [
  ['⚛️ In 2020, I completed the RS School ReactJS course.'],
  ['It deepened my knowledge of React, Redux, and component-based architecture.'],
  certificate('https://drive.google.com/file/d/18FxO5Qd2P8mY8p5A_ZKfjB0_G_0ocuAn/view?usp=sharing'),
];

const certificate3 = [
  ["🛠️ This one's fresh — NodeJS course at RS School, 2025."],
  ['It covered REST APIs, WebSockets, GraphQL, and NestJS.'],
  certificate('https://drive.google.com/file/d/1xBe9qYdNvuATVakQBQ3SeBJ-LGikdeFl/view?usp=drive_link'),
];

const workPlace = [
  ['💻 And this… this is my old desk.'],
  ['Countless cups of coffee and even more lines of code were born right here.'],
];

const homeWorkPlace = [
  ['🖥️ This desk was my command center.'],
  ['Here, I handled everything — development, consulting, and support — all in one place.'],
];

const mathIdol = [
  ['🗿 Meet the Great Mathematician Idol.'],
  ['We math students used to believe it could solve our problems… sadly, not our deadlines.'],
];

const ATS = [
  ['💻 This desk takes me back to 2021–2023.'],
  ['I worked at Accessible Travel Solutions as a Full-Stack Developer.'],
  ['I built and optimized a scalable PERN stack app, improving UX and performance.'],
  ['You can explore more details in my ', linkToCV, '.'],
];

const SI = [
  ['💻 This is where the next chapter began in 2023.'],
  ['Our Accessible Travel Solutions project moved here, to Sage Inclusion.'],
  ['Same product, same team — now independent for certification purposes.'],
  ['You can explore more details in my ', linkToCV, '.'],
];

export const interactiveDialodues = {
  certificate1,
  certificate2,
  certificate3,
  workPlace,
  homeWorkPlace,
  mathIdol,
  ATS,
  SI,
};
