const certificate = (url) => [
  'You can view the ',
  { tag: `<a href='${url}' target='_blank'>certificate</a>` },
  ' and explore my full ',
  {
    tag: "<a href='https://drive.google.com/file/d/1aLBDmk-vTRyNdmSm2YFwUPrM8YxYRN_G/view?usp=drive_link' target='_blank'>CV</a>.",
  },
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
  ['🛠️ This one’s fresh — NodeJS course at RS School, 2025.'],
  ['It covered REST APIs, WebSockets, GraphQL, and NestJS.'],
  certificate('https://drive.google.com/file/d/1xBe9qYdNvuATVakQBQ3SeBJ-LGikdeFl/view?usp=drive_link'),
];

export const interactiveDialodues = { certificate1, certificate2, certificate3 };
