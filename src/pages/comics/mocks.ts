import { Chapter, Comic, Genre } from './types';

const generateRandomYear = () => {
  const minYear = 1990;
  const nowYear = new Date().getFullYear();
  return Math.floor(Math.random() * (nowYear - minYear + 1)) + minYear;
};

const dummyDescription = [
  'Bouya Harumichi is a new transfer student to Suzuran all-boys high school, a place where only the worst delinquents assemble. Due to its large amount of delinquents who are hated by the general people for their inauspiciousness, similarly to crows, it is also known as “Crows High School“. Harumichi is an insanely strong fighter but has an irresponsible personality. How will he act in this new environment where everyone is a delinquent? Due to its high popularity in Japan there are four extra manga stories related to this series and 2 live action movies.',
  'In this new action-comedy, everything about a young man named Saitama screams “AVERAGE,“ from his lifeless expression, to his bald head, to his unimpressive physique. However, this average-looking fellow doesn’t have your average problem... He’s actually a superhero that’s looking for tough opponents! The problem is, every time he finds a promising candidate he beats the snot out of them in one punch. Can Saitama finally find an evil villain strong enough to challenge him? Follow Saitama through his hilarious romps as he searches for new bad guys to challenge!',
  'The story is set in the modern day, except people with special powers have become commonplace throughout the world. A boy named Izuku Midoriya has no powers, but he still dreams. Note: Nominated for the 8th Manga Taisho Award.',
  'Gol D. Roger was known as the Pirate King, the strongest and most infamous being to have sailed the Grand Line. The capture and death of Roger by the World Government brought a change throughout the world. His last words before his death revealed the location of the greatest treasure in the world, One Piece. It was this revelation that brought about the Grand Age of Pirates, men who dreamed of finding One Piece (which promises an unlimited amount of riches and fame), and quite possibly the most coveted of titles for the person who found it, the title of the Pirate King. Enter Monkey D. Luffy, a 17-year-old boy who defies the standard definition of a pirate. Rather than the popular persona of a wicked, hardened, toothless pirate who ransacks villages for fun, Luffy’s reason for being a pirate is one of pure wonder; the thought of an exciting adventure and meeting new and intriguing people, along with finding One Piece. Following in the footsteps of his childhood hero, Luffy and his crew travel across the Grand Line, experiencing crazy adventures, unveiling dark mysteries and battling strong enemies, all in order to reach One Piece.',
  'Tanjiro is the eldest son in a family that has lost its father. Tanjiro visits another town one day to sell charcoal but ends up staying the night at someone else’s house instead of going home because of a rumor about a demon that stalks a nearby mountain at night. When he goes home the next day, tragedy is waiting for him.',
  '10 years ago, after “the Gate” that connected the real world with the monster world opened, some of the ordinary, everyday people received the power to hunt monsters within the Gate. They are known as “Hunters“. However, not all Hunters are powerful. My name is Sung Jin-Woo, an E-rank Hunter. I’m someone who has to risk his life in the lowliest of dungeons, the “World’s Weakest“. Having no skills whatsoever to display, I barely earned the required money by fighting in low-leveled dungeons… at least until I found a hidden dungeon with the hardest difficulty within the D-rank dungeons! In the end, as I was accepting death, I suddenly received a strange power, a quest log that only I could see, a secret to leveling up that only I know about! If I trained in accordance with my quests and hunted monsters, my level would rise. Changing from the weakest Hunter to the strongest S-rank Hunter!',
  'In the Clover Kingdom, magic is everything and the greatest sorcerers rule over all. Yet when Arata is born without any Magical Power, he is abandoned at a church orphanage and neglected by everyone around him. Now Arata must find his own way in a cruel world and give his all to become the most powerful sorcerer in the entire kingdom; the Wizard King! An all-time favorite young and magical fantasy drawn with a beautiful touch and moved by its passionate characters!',
  'Millions of years have passed since the times of legends, when the worlds of men and gods were still the same. In these times it was the desires of man that moved the world. It is the era of the 500 year war: The warring states period. Kingdom is the story of a young boy named Xin who grew into a great general and all the trials and bloodshed that lead him there.',
  'Yuuji is a genius at track and field. But he has zero interest running around in circles, he’s happy as a clam in the Occult Research Club. Although he’s only in the club for kicks, things get serious when a real spirit shows up at school! Life’s about to get really strange in Sugisawa Town #3 High School!',
  'A young priestess has formed her first adventuring party, but almost immediately they find themselves in distress. It’s the Goblin Slayer who comes to their rescue--a man who’s dedicated his life to the extermination of all goblins, by any means necessary. And when rumors of his feats begin to circulate, there’s no telling who might come calling next... Adaptation of the Novel “Goblin Slayer“',
];

const dummyGenres = [
  'Adventure',
  'Romance',
  'Thriller',
  'Comedy',
  'Drama',
  'Fantasy',
  'Supernatural',
  'Shoujo',
  'School Life',
];

const generateRandomRating = () => {
  const min = 0;
  const max = 10;
  return +(Math.random() * (max - min) + min).toFixed(2);
};

const generateRandomSlugId = (): string => {
  const timestamp = new Date().getTime();
  const randomPart = Math.random().toString(36).substring(2, 10);
  return `${timestamp}${randomPart}`;
};

const generateRandomDescription = (): string => {
  const randomIndex = Math.floor(Math.random() * dummyDescription.length);
  return dummyDescription[randomIndex];
};

const generateRandomGenres = (): Genre[] => {
  const getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const numberOfGenres = getRandomNumber(1, dummyGenres.length);
  const randomGenres: Genre[] = [];

  for (let i = 0; i < numberOfGenres; i++) {
    const randomIndex = getRandomNumber(0, dummyGenres.length - 1);
    const genre: Genre = {
      id: String(i + 1),
      title: dummyGenres[randomIndex],
    };

    randomGenres.push(genre);
  }

  return randomGenres;
};

export const generateDummyComicList: Comic[] = [
  {
    id: 1,
    title: 'One Piece',
    author: 'Eiichiro Oda',
    updatedAt: '2023-01-01',
    thumbnail: '/comic_cover_1.jpg',
    publicationYear: generateRandomYear(),
    rating: generateRandomRating(),
    slugId: generateRandomSlugId(),
    description: generateRandomDescription(),
    genres: generateRandomGenres(),
  },
  {
    id: 2,
    title: 'Attack on Titan',
    author: 'Hajime Isayama',
    updatedAt: '2023-02-15',
    thumbnail: '/comic_cover_1.jpg',
    publicationYear: generateRandomYear(),
    rating: generateRandomRating(),
    slugId: generateRandomSlugId(),
    description: generateRandomDescription(),
    genres: generateRandomGenres(),
  },
  {
    id: 3,
    title: 'Naruto',
    author: 'Masashi Kishimoto',
    updatedAt: '2023-03-30',
    thumbnail: '/comic_cover_1.jpg',
    publicationYear: generateRandomYear(),
    rating: generateRandomRating(),
    slugId: generateRandomSlugId(),
    description: generateRandomDescription(),
    genres: generateRandomGenres(),
  },
  {
    id: 4,
    title: 'Death Note',
    author: 'Tsugumi Ohba',
    updatedAt: '2023-04-12',
    thumbnail: '/comic_cover_1.jpg',
    publicationYear: generateRandomYear(),
    rating: generateRandomRating(),
    slugId: generateRandomSlugId(),
    description: generateRandomDescription(),
    genres: generateRandomGenres(),
  },
  {
    id: 5,
    title: 'Fullmetal Alchemist',
    author: 'Hiromu Arakawa',
    updatedAt: '2023-05-25',
    thumbnail: '/comic_cover_1.jpg',
    publicationYear: generateRandomYear(),
    rating: generateRandomRating(),
    slugId: generateRandomSlugId(),
    description: generateRandomDescription(),
    genres: generateRandomGenres(),
  },
  {
    id: 6,
    title: 'My Hero Academia',
    author: 'Kohei Horikoshi',
    updatedAt: '2023-06-08',
    thumbnail: '/comic_cover_1.jpg',
    publicationYear: generateRandomYear(),
    rating: generateRandomRating(),
    slugId: generateRandomSlugId(),
    description: generateRandomDescription(),
    genres: generateRandomGenres(),
  },
  {
    id: 7,
    title: 'Demon Slayer',
    author: 'Koyoharu Gotouge',
    updatedAt: '2023-07-20',
    thumbnail: '/comic_cover_1.jpg',
    publicationYear: generateRandomYear(),
    rating: generateRandomRating(),
    slugId: generateRandomSlugId(),
    description: generateRandomDescription(),
    genres: generateRandomGenres(),
  },
  {
    id: 8,
    title: 'Dragon Ball',
    author: 'Akira Toriyama',
    updatedAt: '2023-08-03',
    thumbnail: '/comic_cover_1.jpg',
    publicationYear: generateRandomYear(),
    rating: generateRandomRating(),
    slugId: generateRandomSlugId(),
    description: generateRandomDescription(),
    genres: generateRandomGenres(),
  },
  {
    id: 9,
    title: 'Tokyo Ghoul',
    author: 'Sui Ishida',
    updatedAt: '2023-09-15',
    thumbnail: '/comic_cover_1.jpg',
    publicationYear: generateRandomYear(),
    rating: generateRandomRating(),
    slugId: generateRandomSlugId(),
    description: generateRandomDescription(),
    genres: generateRandomGenres(),
  },
  {
    id: 10,
    title: 'One Punch Man',
    author: 'ONE',
    updatedAt: '2023-10-28',
    thumbnail: '/comic_cover_1.jpg',
    publicationYear: generateRandomYear(),
    rating: generateRandomRating(),
    slugId: generateRandomSlugId(),
    description: generateRandomDescription(),
    genres: generateRandomGenres(),
  },
];

export const generateDummyChapters = () => {
  let list: Chapter[] = [];
  for (let i = 0; i < 10; i++) {
    list.push({
      id: i + 1,
      title: 'Chapter ' + (i + 1),
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    });
  }
  return list;
};
