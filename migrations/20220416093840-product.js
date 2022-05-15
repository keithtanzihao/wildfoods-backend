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
  return db.createTable("product", {
    id: { type: "smallint", primaryKey: true, autoIncrement: true, unsigned: true },
    stock: { type: "decimal", notNull: true },
    title: { type: "char", length: 50, notNull: true },
    description: { type: "text", notNull: true },
    price: { type: "decimal", notNull: true },
    weight: { type: "smallint", notNull: true },
    energy: { type: "char", length: 50, notNull: true },
    fat: { type: "decimal", notNull: true },
    saturated_fat: { type: "decimal", notNull: true },
    carbohydrates: { type: "decimal", notNull: true },
    sugars: { type: "decimal", notNull: true },
    fiber: { type: "decimal", notNull: true },
    protein: { type: "decimal", notNull: true },
    sodium: { type: "decimal", notNull: true },
    warning: { type: "text", notNull: false },
    color_theme: { type: "char", length: 7, defaultValue: "" },
    img_url: { type: "text", notNull: true },
    bg_url: { type: "text", notNull: false },
  });
};

exports.down = function (db) {
  return db.dropTable("product");
};

exports._meta = {
  version: 1,
};
