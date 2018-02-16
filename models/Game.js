module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define("Game", {
    opponent: {
      type: DataTypes.STRING
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    scoreHome: {
      type: DataTypes.INTEGER
    },
    scoreAway: {
      type: DataTypes.INTEGER
    },
    plays_total: {
      type: DataTypes.INTEGER
    },
    offense_plays: {
      type: DataTypes.INTEGER
    },
    defense_plays: {
      type: DataTypes.INTEGER
    },
    run_plays: {
      type: DataTypes.INTEGER
    },
    pass_plays: {
      type: DataTypes.INTEGER
    },
    yards_total: {
      type: DataTypes.INTEGER
    },
    yards_offense: {
      type: DataTypes.INTEGER
    },
    yards_defense: {
      type: DataTypes.INTEGER
    }
  });

  Game.associate = models => {
    // models.Game.belongsTo(models.User)
  };

  return Game;
};
