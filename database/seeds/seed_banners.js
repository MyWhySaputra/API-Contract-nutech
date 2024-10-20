/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  
  await knex('banners').del();

  await knex('banners').insert([
    {
      banner_name: "Banner 1",
      banner_image: "https://nutech-integrasi.app/dummy.jpg",
      description: "Lerem Ipsum Dolor sit amet",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      banner_name: "Banner 2",
      banner_image: "https://nutech-integrasi.app/dummy.jpg",
      description: "Lerem Ipsum Dolor sit amet",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      banner_name: "Banner 3",
      banner_image: "https://nutech-integrasi.app/dummy.jpg",
      description: "Lerem Ipsum Dolor sit amet",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      banner_name: "Banner 4",
      banner_image: "https://nutech-integrasi.app/dummy.jpg",
      description: "Lerem Ipsum Dolor sit amet",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      banner_name: "Banner 5",
      banner_image: "https://nutech-integrasi.app/dummy.jpg",
      description: "Lerem Ipsum Dolor sit amet",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      banner_name: "Banner 6",
      banner_image: "https://nutech-integrasi.app/dummy.jpg",
      description: "Lerem Ipsum Dolor sit amet",
      created_at: new Date(),
      updated_at: new Date(),
    }
  ]);
};
