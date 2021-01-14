const mongoose = require('mongoose');
/*
const fs = require('fs');
let recipeArrayRawData = fs.readFileSync('data.json');
let recipeArray = JSON.parse(recipeArrayRawData);
*/
mongoose.set('useFindAndModify', false);

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    console.log('Connection has been established');
    return Recipe.create({
      title: 'Strawberry Cheese Cake',
      level: 'Amateur Chef',
      ingredients: ['strawberries', 'cream cheese', 'sugar'],
      cuisine: 'american',
      dishType: 'dessert',
      duration: 90
    });
  })
  .then((strawberryCake) => {
    console.log(strawberryCake);
    return Recipe.create(data);
  })
  .then((manyrecipes) => {
    /*console.log(cakerecipe);*/
    console.log(manyrecipes);
    return Recipe.findOneAndUpdate(
      {
        title: 'Rigatoni alla Genovese'
      },
      {
        duration: 100
      },
      {
        new: true
      }
    );
  })
  .then((updatedrecipe) => {
    console.log(updatedrecipe);
    return Recipe.findOneAndDelete({ title: 'Carrot Cake' });
  })
  .then(() => {
    console.log('The recipe for Carrot Cake has been deleted.');
    return mongoose.disconnect();
  })
  .then(() => {
    console.log('Connection has been destroyed.');
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });
