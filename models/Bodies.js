const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Bodies extends Model {}

Bodies.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isPlanet: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    moons: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    aroundPlanet: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    discoveredBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    discoveryDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mass: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    // closest point to sun
    perihelion: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    // farthest point from sun
    aphelion: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    gravity: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // time in earth days for 1 orbit
    sideralOrbit: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    explanation: {
      type: DataTypes.STRING(1300),
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: false,
    modelName: "bodies",
  }
);

module.exports = Bodies;
