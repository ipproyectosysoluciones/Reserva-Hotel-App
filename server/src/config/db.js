require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DATABASE, DB_INTERNAL_URL } = process.env;

// const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DATABASE}`, {
// 	logging: false,
// 	native: false,
// });
const sequelize = new Sequelize(`${DB_INTERNAL_URL}`, {
  logging: false,
  native: false,
});

const basename = path.basename(__filename);
const modelDefiners = [];

fs
	.readdirSync(path.join(__dirname, "../models"))
	.filter(file => file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js")
	.forEach(file => {
		modelDefiners.push(require(path.join(__dirname, "../models", file)));
	});

modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map(entry => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

//Aca vendrian las relaciones
// const { sequelize, Categories, Bedrooms } = sequelize.models;

// sequelize
// 	.query(
// 		`
//   SELECT *
//   FROM categories
//   INNER JOIN bedrooms ON categories.id = bedrooms.category_id
// `,
// 		{
// 			type: sequelize.QueryTypes.SELECT,
// 		},
// 	)
// 	.then(result => {
// 		console.log(result);
// 	})
// 	.catch(error => {
// 		console.error(error);
// 	});

// const { sequelize, Testimonials, Users } = sequelize.models;

// sequelize
//   .query(
//     `
//   SELECT *
//   FROM testimonials
//   INNER JOIN users ON testimonials.id_us = users.id
// `,
//     {
//       type: sequelize.QueryTypes.SELECT,
//     }
//   )
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

const { Diary, Bookings, Testimonials, Bedrooms, Users, Categories } = sequelize.models;

Diary.belongsTo(Bedrooms, { foreignKey: "id_room" });
Categories.belongsTo(Bedrooms, { foreignKey: "id_room" });
Bedrooms.belongsTo(Categories, { foreignKey: "id_categories" });
Bookings.belongsTo(Users, { foreignKey: "id_user" });
Bookings.belongsTo(Bedrooms, { foreignKey: "id_room" });
// Testimonials.belongsTo(Users, { foreignKey: 'id_res' });
Users.belongsTo(Testimonials, { foreignKey: "id_us" });
Testimonials.belongsTo(Bookings, { foreignKey: "id_res" });
Testimonials.belongsTo(Users, { foreignKey: "id_us" });
Testimonials.belongsTo(Bedrooms, { foreignKey: "id_room" });

module.exports = {
	...sequelize.models,
	conn: sequelize,
};
