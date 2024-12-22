const avatars = [
  "https://lh3.googleusercontent.com/d/1E1ScXZsSMEIv0YdRJjWoiCqaSFKVePQv",
  "https://lh3.googleusercontent.com/d/1tBzDMDdAjlkIcmliHmlH2ljeuSM1QxPJ",
  "https://lh3.googleusercontent.com/d/1_fB5cyuGW8e2rFZuQf9G45ldKTTbs7Fu",
  "https://lh3.googleusercontent.com/d/13kvSext4wOSL-6u-n9LNJTrkH9zMWFVR",
  "https://lh3.googleusercontent.com/d/1lglBhXaLprO4BfhbGJhJOAwyXQJOTscB",
];

const generateAvatar = () =>
  avatars[Math.floor(Math.random() * avatars.length)];

module.exports = generateAvatar;
