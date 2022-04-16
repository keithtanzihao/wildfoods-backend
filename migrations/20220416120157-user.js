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
  return db.createTable("user", {
    user_id: { type: "smallint", primaryKey: true, autoIncrement: true, unsigned: true },
    first_name: { type: "decimal", notNull: true },
    last_name: { type: "char", length: 45, notNull: true },
    email: { type: "char", length: 100, notNull: true },
    password: { type: "char", length: 100, notNull: true },
  });
};

exports.down = function (db) {
  return db.dropTable("user");
};

exports._meta = {
  "version": 1
};
