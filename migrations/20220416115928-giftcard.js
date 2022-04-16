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
  return db.createTable("giftcard", {
    giftcard_id: { type: "smallint", primaryKey: true, autoIncrement: true, unsigned: true },
    amount: { type: "decimal", notNull: true },
    recipient_name: { type: "char", length: 45, notNull: true },
    recipient_email: { type: "char", length: 100, notNull: true },
    user_name: { type: "char", length: 45, notNull: true },
    user_message: { type: "text", notNull: true },
  });
};

exports.down = function (db) {
  return db.dropTable("giftcard");
};

exports._meta = {
  "version": 1
};
