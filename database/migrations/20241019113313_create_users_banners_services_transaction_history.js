/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return (
    knex.schema
      // Tabel users
      .createTable("users", (table) => {
        table.increments("id").primary(); // SERIAL PRIMARY KEY
        table.string("email", 100).unique();
        table.string("first_name", 100);
        table.string("last_name", 100);
        table.string("password", 255);
        table.integer("balance");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      })

      // Tabel banners
      .createTable("banners", (table) => {
        table.increments("id").primary(); // SERIAL PRIMARY KEY
        table.string("banner_name", 100);
        table.string("banner_image", 255);
        table.text("description");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      })

      // Tabel services
      .createTable("services", (table) => {
        table.increments("id").primary(); // SERIAL PRIMARY KEY
        table.string("service_code", 100);
        table.string("service_name", 100);
        table.string("service_icon", 255);
        table.integer("service_tarif");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      })

      // Tabel transaction_history
      .createTable("transaction_history", (table) => {
        table.increments("id").primary(); // SERIAL PRIMARY KEY
        table.string("email", 100).notNullable();
        table.string("invoice_number", 255);
        table.string("transaction_type", 100);
        table.text("description");
        table.integer("total_amount");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());

        // Relasi foreign key dengan users
        table.foreign("email").references("users.email").onDelete("CASCADE");
      })
  );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable('transaction_history')
    .dropTable('services')
    .dropTable('banners')
    .dropTable('users');
};
