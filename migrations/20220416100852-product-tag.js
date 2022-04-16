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
  return db.createTable("product_tag", {
    product_tag_id: { type: "smallint", primaryKey: true, autoIncrement: true, unsigned: true },
    product_id: { 
      type: "smallint",
      unsigned: true,
      notNull: true,
      foreignKey: {
        name: "product_tag_product_fk",
        table: "product",
        rules: {
          onDelete: "CASCADE",
          onUpdate: "RESTRICT"
        },
        mapping: "product_id"
      }
    },
    tag_id: { 
      type: "smallint", 
      unsigned: true,
      notNull: true,
      foreignKey: {
        name: "product_tag_tag_fk",
        table: "tag",
        rules: {
          onDelete: "CASCADE",
          onUpdate: "RESTRICT"
        },
        mapping: "tag_id"
      } 
    },
  });
};

exports.down = function (db) {
  return db.dropTable("product_tag");
};

exports._meta = {
  "version": 1
};
