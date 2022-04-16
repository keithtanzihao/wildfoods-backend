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
  return db.createTable("media", {
    media_id: { type: "smallint", primaryKey: true, autoIncrement: true, unsigned: true },
    media_url: { type: "text", notNull: true },
    product_id: {
      type: "smallint",
      unsigned: true,
      notNull: true,
      foreignKey: {
        name: "product_media_fk",
        table: "product",
        rules: {
          onDelete: "cascade",
          onUpdate: "restrict"
        },
        mapping: "product_id"
      }
    }
  });
};

exports.down = function (db) {
  return db.dropTable("media");
};

exports._meta = {
  "version": 1
};
