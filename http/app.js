const express = require('express');
const sequelize = require('./database/database');
const authRoutes=require('./routes/auth')
const app = express();

app.use(express.json());
app.use('/', authRoutes);


app.get('/',function(req,res){
  res.send('Hello!');
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    return sequelize.sync({force:true}); // Use { alter: true } to update existing tables or { force: true } to recreate them
  })
  .then(() => {
    console.log('Models synchronized successfully.');
    app.listen(4000, () => {
      console.log('Server running on port 4000');
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
