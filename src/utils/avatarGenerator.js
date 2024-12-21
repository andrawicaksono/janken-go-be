const avatars = [
  "https://picsum.photos/200/200",
  "https://picsum.photos/200/200",
  "https://picsum.photos/200/200",
  "https://picsum.photos/200/200",
  "https://picsum.photos/200/200",
];

const generateAvatar = () =>
  avatars[Math.floor(Math.random() * avatars.length)];

module.exports = generateAvatar;
