
NodeJS

# Create Migration

-> First migration file create 1. npx sequelize-cli migration:generate --name user

-> Create migraction file with model 1. npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string

-> Run migration file 1. npx sequelize-cli db:migrate

-> migration file undo 1. npx sequelize-cli db:migrate:undo

# Table's

user model 
----------
userId        - autogenerate (pK)
username      - varchar  (unique)
first name    - varchar
last name     - varchar 
mobile        - number  (unique)
email         - varchar (unique)
profileImage  - file 
password      - varchar

cmd : 
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string, mobile:string, email:string, password:string
