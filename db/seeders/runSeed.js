import { Model as Testimonial, Sequelize } from "sequelize";
import areasSource from "./initial-data/areas.json" assert { type: "json" };
import categoriesSource from "./initial-data/categories.json" assert { type: "json" };
import ingredientsSource from "./initial-data/ingredients.json" assert { type: "json" };
import recipesSource from "./initial-data/recipes.json" assert { type: "json" };
import testimonialsSource from "./initial-data/testimonials.json" assert { type: "json" };
import usersSource from "./initial-data/users.json" assert { type: "json" };
import passwordManager from "../../helpers/passwordManager.js";
import db from "../index.js";

function findId(items, name) {
    return items.find((item) => item.name == name)._id.$oid;
}
/**
 *
 * @param {Sequelize} sequelize
 */
export async function runSeed(sequelize) {
    const users = usersSource.map(user => {
        return {
            id: user._id.$oid,
            name: user.name,
            email: user.email,
            emailCanonical: user.email.toLowerCase(),
            password: passwordManager.hashPassword("Qwerty!@3"),
        };
    });

    await db.User.bulkCreate(users);

    const areas = areasSource.map(area => {
        return {
            id: area._id.$oid,
            name: area.name,
        };
    });

    await db.Area.bulkCreate(areas);

    const ingredients = ingredientsSource.map(ingredient => {
        return {
            id: ingredient._id,
            name: ingredient.name,
            desc: ingredient.desc,
            img: ingredient.img,
        };
    });

    await db.Ingredient.bulkCreate(ingredients);

    const testimonials = testimonialsSource.map(testimonial => {
        return {
            id: testimonial._id.$oid,
            ownerId: testimonial.owner.$oid,
            testimonial: testimonial.testimonial,
        };
    });

    await db.Testimonial.bulkCreate(testimonials);

    const categories = categoriesSource.map(category => {
        return {
            id: category._id.$oid,
            name: category.name,
            img: category.img,
        };
    });

    await db.Category.bulkCreate(categories);

    const recipes = recipesSource.map(recipe => {
        return {
            id: recipe._id.$oid,
            title: recipe.title,
            categoryId: findId(categoriesSource, recipe.category),
            ownerId: recipe.owner.$oid,
            areaId: findId(areasSource, recipe.area),
            instructions: recipe.instructions,
            description: recipe.description,
            thumb: recipe.thumb,
            time: Number(recipe.time),
            createdAt: new Date(Number(recipe.createdAt.$date.$numberLong)),
            updatedAt: new Date(Number(recipe.updatedAt.$date.$numberLong)),
        };
    });

    await db.Recipe.bulkCreate(recipes);

    const recipeIngredients = recipesSource.flatMap(recipe => {
        return recipe.ingredients.map(ingredient => {
            return {
                recipeId: recipe._id.$oid,
                ingredientId: ingredient.id,
                measure: ingredient.measure,
            };
        });
    });

    await db.RecipeIngredient.bulkCreate(recipeIngredients);

    console.log("Data initialized successfully");
}
