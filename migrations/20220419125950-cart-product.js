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
  return db.createTable("cart", {
    id: { type: "smallint", primaryKey: true, autoIncrement: true, unsigned: true },
    quantity: {
      type:'int',
      unsigned: true,
      defaultValue: 0
    },
    product_id: { 
      type: "smallint",
      notNull: true,
      unsigned: true,
      foreignKey: {
        name: "cart_product_fk",
        table: "product",
        rules: {
          onDelete: "CASCADE",
          onUpdate: "RESTRICT"
        },
        mapping: "id"
      }
    },
    user_id: { 
      type: "smallint",
      notNull: true,
      unsigned: true,
      foreignKey: {
        name: "cart_user_id",
        table: "user",
        rules: {
          onDelete: "CASCADE",
          onUpdate: "RESTRICT"
        },
        mapping: "id"
      } 
    },
    quantity:  { type: "smallint", unsigned: true, defaultValue: 0 }
  });
};

exports.down = function (db) {
  return db.dropTable("cart");
};

exports._meta = {
  "version": 1
};
