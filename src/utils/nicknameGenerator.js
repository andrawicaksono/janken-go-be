// List of nickname components
const adjectives = [
  "Speedy",
  "Silent",
  "Mighty",
  "Furious",
  "Brave",
  "Clever",
  "Epic",
  "Stealthy",
  "Savage",
  "Golden",
  "Shadow",
  "Fiery",
  "Loyal",
  "Iron",
  "Electric",
];
const nouns = [
  "Tiger",
  "Wolf",
  "Dragon",
  "Phoenix",
  "Knight",
  "Hawk",
  "Warrior",
  "Ninja",
  "Viking",
  "Samurai",
  "Pirate",
  "Witch",
  "Ghost",
  "Hunter",
  "Assassin",
];

const generateNickname = () =>
  `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${
    nouns[Math.floor(Math.random() * nouns.length)]
  }`;

module.exports = generateNickname;
