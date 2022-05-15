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
  return db.createTable("recipie", {
    id: { type: "smallint", primaryKey: true, autoIncrement: true, unsigned: true },
    title: { type: "char", length: 50, notNull: true },
    time_taken: { type: "smallint", unsigned: true, notNull: true },
    difficulty: { type: "smallint", unsigned: true, notNull: true },
    recipie_url: { type: "text", notNull: false },
  });
};

exports.down = function (db) {
  return db.dropTable("recipie");
};

exports._meta = {
  "version": 1
};
