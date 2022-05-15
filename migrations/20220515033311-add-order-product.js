"use strict";

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.addColumn("order", "product_id", {
    type: "smallint",
    unsigned: true,
    notNull: true,
    defaultValue: 1,
    foreignKey: {
      name: "order_product_fk",
      table: "product",
      rules: {
        onDelete: "cascade",
        onUpdate: "restrict",
      },
      mapping: "id",
    },
  });
};

exports.down = function (db) {
  return null;
};

exports._meta = {
  version: 1,
};