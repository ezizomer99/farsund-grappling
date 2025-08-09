// Information about instructors
export interface Instructor {
  id: number;
  name: string;
  title: string;
  beltLevel: string;
  bio: string;
  imagePlaceholder: string;
  imageAlt: string;
}

export const instructors: Instructor[] = [
  {
    id: 1,
    name: "Andreas",
    title: "Hovedtrener",
    beltLevel: "Brun Belte",
    bio: "Andreas har trent submission wrestling og BJJ i mange år og har omfattende erfaring fra konkurranser på nasjonalt nivå. Med sitt engasjement og pedagogiske evner skaper han et inkluderende treningsmiljø for alle ferdighetsnivåer. Andreas er dedikert til å dele sin kunnskap og teknikk med utøvere i alle aldre.",
    imagePlaceholder: "/instructors/instructorAndreas.png",
    imageAlt: "Andreas - Hovedtrener for Farsund Grappling",
  },
];
