import { Sequelize } from 'sequelize';

import config from './config/config.js';

import User from './models/user.js';
import Recipe from './models/recipe.js';
import Ingredient from './models/ingredient.js';
import Category from './models/category.js';
import Area from './models/area.js';
import Testimonial from './models/testimonial.js';
import RecipeIngredient from './models/recipeIngredient.js';
import FavoriteRecipe from "./models/favoriteRecipe.js";
import Follower from "./models/follower.js";

const sequelize = new Sequelize(config);

const models = {
    User: User(sequelize),
    Recipe: Recipe(sequelize),
    Ingredient: Ingredient(sequelize),
    Category: Category(sequelize),
    Area: Area(sequelize),
    Testimonial: Testimonial(sequelize),
    RecipeIngredient: RecipeIngredient(sequelize),
    Follower: Follower(sequelize),
    FavoriteRecipe: FavoriteRecipe(sequelize),
};

Object.values(models).forEach(model => {
    if (model.associate) {
        model.associate(models);
    }
});

export { sequelize };
export default models;
