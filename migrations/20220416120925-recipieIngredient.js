'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.createTable("recipieIngredient", {
    recipieIngredient_id: { type: "smallint", primaryKey: true, autoIncrement: true, unsigned: true },
    type: { type: "decimal", notNull: true },
    description: { type: "text", notNull: true },
    recipie_id: {
      type: "smallint",
      unsigned: true,
      notNull: true,
      foreignKey: {
        name: "recipie_recipieIngredient_fk",
        table: "recipie",
        rules: {
          onDelete: "cascade",
          onUpdate: "restrict"
        },
        mapping: "recipie_id"
      }
    }
  });
};

exports.down = function (db) {
  return db.dropTable("recipie");
};

exports._meta = {
  "version": 1
};
