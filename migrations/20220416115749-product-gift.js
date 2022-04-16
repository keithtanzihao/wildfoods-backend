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
  return db.createTable("product_gift", {
    product_gift_id: { type: "smallint", primaryKey: true, autoIncrement: true, unsigned: true },
    product_id: { 
      type: "smallint",
      notNull: true,
      unsigned: true,
      foreignKey: {
        name: "product_gift_product_fk",
        table: "product",
        rules: {
          onDelete: "CASCADE",
          onUpdate: "RESTRICT"
        },
        mapping: "product_id"
      }
    },
    gift_id: { 
      type: "smallint",
      notNull: true,
      unsigned: true,
      foreignKey: {
        name: "product_gift_gift_fk",
        table: "gift",
        rules: {
          onDelete: "CASCADE",
          onUpdate: "RESTRICT"
        },
        mapping: "gift_id"
      } 
    },
  });
};

exports.down = function (db) {
  return db.dropTable("product_gift");
};

exports._meta = {
  "version": 1
};
