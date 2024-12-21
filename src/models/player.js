class Player {
  constructor(data) {
    this.uid = data.uid;
    this.nickname = data.nickname;
    this.photoUrl = data.photoUrl;
    this.score = data.score;
    this.xp = data.xp;
    this.gamesPlayed = data.gamesPlayed;
    this.gamesWon = data.gamesWon;
    this.gamesLost = data.gamesLost;
  }
}

const playerConverter = {
  toFirestore: (player) => {
    return {
      uid: player.uid,
      nickname: player.nickname,
      photo_url: player.photoUrl,
      score: player.score,
      xp: player.xp,
      games_played: player.gamesPlayed,
      games_won: player.gamesWon,
      games_lost: player.gamesLost,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Player(data);
  },
};

module.exports = { Player, playerConverter };
