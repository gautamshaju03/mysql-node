npm init


npm install express nodemon sequelize bcrypt mysql2 fastest-validator body-parser

sequelize init

sequelize model:generate --name Posts --attributes title:string,content:text,postId:integer,categoryId:Integer

sequelize db:migrate

npm run dev
