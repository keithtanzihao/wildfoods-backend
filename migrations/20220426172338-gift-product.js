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
  return db.createTable("gift_product", {
    id: { type: "smallint", primaryKey: true, autoIncrement: true, unsigned: true },
    gift_id: { 
      type: "smallint",
      notNull: true,
      unsigned: true,
      foreignKey: {
        name: "gift_product_gift_fk",
        table: "gift",
        rules: {
          onDelete: "CASCADE",
          onUpdate: "RESTRICT"
        },
        mapping: "id"
      } 
    },
    product_id: { 
      type: "smallint",
      notNull: true,
      unsigned: true,
      foreignKey: {
        name: "gift_product_product_fk",
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
  return db.dropTable("gift_product");
};

exports._meta = {
  "version": 1
};
