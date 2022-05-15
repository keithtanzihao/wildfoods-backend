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

exports.up = function(db) {
  return db.createTable("order", {
    id: { type: "smallint", primaryKey: true, autoIncrement: true, unsigned: true },
    order_date: { type: "datetime", notNull: true },
    order_ref: { type: "char", length: 100, notNull: true },
    total_cost: { type: "decimal", notNull: true },
    quantity: {
      type:'int',
      unsigned: true,
      defaultValue: 0
    },
    user_id: { 
      type: "smallint",
      unsigned: true,
      notNull: true,
      foreignKey: {
        name: "order_user_fk",
        table: "user",
        rules: {
          onDelete: "CASCADE",
          onUpdate: "RESTRICT"
        },
        mapping: "id"
      } 
    },
    status_id: { 
      type: "smallint",
      unsigned: true,
      notNull: true,
      foreignKey: {
        name: "order_status_fk",
        table: "status",
        rules: {
          onDelete: "CASCADE",
          onUpdate: "RESTRICT"
        },
        mapping: "id"
      }
    },
  });
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
