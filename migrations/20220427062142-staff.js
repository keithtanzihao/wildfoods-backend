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
  return db.createTable("staff", {
    id: { type: "smallint", primaryKey: true, autoIncrement: true, unsigned: true },
    email: { type: "char", length: 100, notNull: true },
    password: { type: "char", length: 100, notNull: true },
  });
};

exports.down = function (db) {
  return db.dropTable("staff");
};

exports._meta = {
  "version": 1
};
