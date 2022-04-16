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
  return db.createTable("product_recipie", {
    product_recipie_id: { type: "smallint", primaryKey: true, autoIncrement: true, unsigned: true },
    product_id: { 
      type: "smallint",
      notNull: true,
      unsigned: true,
      foreignKey: {
        name: "product_recipie_product_fk",
        table: "product",
        rules: {
          onDelete: "CASCADE",
          onUpdate: "RESTRICT"
        },
        mapping: "product_id"
      }
    },
    recipie_id: { 
      type: "smallint",
      notNull: true,
      unsigned: true,
      foreignKey: {
        name: "product_recipie_recipie_fk",
        table: "recipie",
        rules: {
          onDelete: "CASCADE",
          onUpdate: "RESTRICT"
        },
        mapping: "recipie_id"
      } 
    },
  });
};

exports.down = function (db) {
  return db.dropTable("product_recipie");
};

exports._meta = {
  "version": 1
};
