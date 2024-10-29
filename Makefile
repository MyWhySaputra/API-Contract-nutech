make-migrate:
		npx knex migrate:make create_users_banners_services_transaction_history --knexfile knexfile.js

make-seed:
		npx knex seed:make create_users_banners_services_transaction_history --knexfile knexfile.js

migrate:
		npm run migrate

rollback:
		npm run rollback		

seed:
		npm run seed

run:
		npm run dev