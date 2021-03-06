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
  return db.createTable("product_productIngredient", {
    id: { type: "smallint", primaryKey: true, autoIncrement: true, unsigned: true },
    product_id: { 
      type: "smallint",
      unsigned: true,
      notNull: true,
      foreignKey: {
        name: "product_productIngredient_product_fk",
        table: "product",
        rules: {
          onDelete: "CASCADE",
          onUpdate: "RESTRICT"
        },
        mapping: "id"
      }
    },
    productIngredient_id: { 
      type: "smallint",
      unsigned: true,
      notNull: true,
      foreignKey: {
        name: "product_productIngredient_productIngredient_fk",
        table: "productIngredient",
        rules: {
          onDelete: "CASCADE",
          onUpdate: "RESTRICT"
        },
        mapping: "id"
      } 
    },
  });
};

exports.down = function (db) {
  return db.dropTable("product_productIngredient");
};

exports._meta = {
  "version": 1
};
