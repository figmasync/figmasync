const generateRandomName = (numberLength = 10): string => {
  const adjectives: string[] = [
    "happy",
    "silly",
    "brave",
    "clever",
    "gentle",
    "witty",
    "swift",
    "vibrant",
    "zealous",
  ];
  const nouns: string[] = [
    "squirrel",
    "octopus",
    "phoenix",
    "unicorn",
    "koala",
    "lion",
    "dragon",
    "jellyfish",
    "penguin",
  ];

  const random_adjective_index: number = Math.floor(
    Math.random() * adjectives.length
  );
  const random_noun_index: number = Math.floor(Math.random() * nouns.length);

  const random_adjective: string = adjectives[random_adjective_index];
  const random_noun: string = nouns[random_noun_index];

  const minNumber: number = Math.pow(10, numberLength  - 1);
  const maxNumber: number = Math.pow(10, numberLength) - 1;
  const random_number: string = Math.floor(minNumber + Math.random() * (maxNumber - minNumber + 1)).toString();


  return `${random_number}_${random_adjective}_${random_noun}`;
};

export {
  generateRandomName
}