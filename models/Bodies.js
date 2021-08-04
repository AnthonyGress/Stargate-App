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
    },
    moons: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    aroundPlanet: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    discoveredBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    discoveryDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    mass: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // closest point to sun
    perihelion: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // farthest point from sun
    aphelion: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    gravity: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // time in earth days for 1 orbit
    sideral: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "bodies",
  }
);

module.exports = Bodies;
