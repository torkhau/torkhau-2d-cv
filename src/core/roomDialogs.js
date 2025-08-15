import { linkToCV } from './const';

const belarus = [
  ['👋 Hi there!', { tag: '<br />' }, 'Welcome to my interactive CV.'],
  ['Instead of reading a boring PDF, you get to play!'],
  [
    '🕹️ Controls:',
    { tag: '<br />' },
    '- Use arrow keys to move;',
    { tag: '<br />' },
    '- Or click on paths with your mouse.',
  ],
  ['🔍 Zoom in/out:', { tag: '<br />' }, '+ / - keys or scroll the mouse wheel.'],
  ["Let's get started!"],
];

const belarusHome = [
  ['🏠 Ah, home sweet home.'],
  ['This is where I worked as an independent software developer for nearly 10 years.'],
  ['From 2012 to 2022, I provided custom solutions using 1C:Enterprise for various businesses.'],
  ['It was a time of autonomy, deep problem-solving, and helping clients optimize their workflows.'],
  ['I learned to handle everything — from development to consulting and support.'],
  ['Not just a workplace, but a place where I shaped my engineering mindset.'],
  ['Want to know more about my early projects? Check my ', linkToCV, '.'],
];

const belarusWork = [
  ['🏢 Welcome to Polesieinformatika.'],
  ['I worked here from 2007 to 2012 as a Senior Software Developer and Engineer.'],
  ['My role focused on enhancing and customizing 1C:Enterprise configurations for business clients.'],
];

const belarusCollage = [
  [
    '🎓 My academic journey began here — ',
    { tag: "<a href='https://www.brsu.by/en' target='_blank'>Brest State A.S. Pushkin University</a>" },
    '.',
  ],
  ['I studied applied mathematics from 2002 to 2007, earning the title of mathematician-programmer.'],
  ['It was a rigorous program — math, algorithms, programming theory — all the good stuff.'],
  ['These studies taught me to think analytically and build solutions that are not only functional, but elegant.'],
];

const poland = [
  ['🇵🇱 2022 was a turning point — I moved to Poland, to the city of Bialystok.'],
  ['Here, I fully transitioned into modern full-stack web development.'],
  ['New country, new tech stack, and the same passion for creating great software.'],
  ['You can read the full career story in my ', linkToCV, '.'],
];

const polandHome = [
  ['🏠 This is my home in Bialystok.'],
  ['From here, I work remotely on international projects as a Full-Stack Developer.'],
  ["It's my base for coding, learning, and building digital products."],
];

export const roomDialodues = { belarus, belarusHome, belarusWork, belarusCollage, poland, polandHome };
