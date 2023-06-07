'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class data_kelas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      data_kelas.belongsTo(models.kelas, {
        foreignKey:"kelas_id"
      })

      data_kelas.belongsTo(models.siswa, {
        foreignKey:"siswa_id"
      })
    }
  }
  data_kelas.init({
    siswa_id: DataTypes.INTEGER,
    kelas_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'data_kelas',
  });
  return data_kelas;
};