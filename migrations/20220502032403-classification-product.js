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
  return db.createTable("classification_product", {
    id: { type: "smallint", primaryKey: true, autoIncrement: true, unsigned: true },
    classification_id: { 
      type: "smallint", 
      unsigned: true,
      notNull: true,
      foreignKey: {
        name: "classification_product_classification_fk",
        table: "classification",
        rules: {
          onDelete: "CASCADE",
          onUpdate: "RESTRICT"
        },
        mapping: "id"
      } 
    },
    product_id: { 
      type: "smallint",
      unsigned: true,
      notNull: true,
      foreignKey: {
        name: "classification_product_product_fk",
        table: "product",
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
  return db.dropTable("classification_product");
};

exports._meta = {
  "version": 1
};
