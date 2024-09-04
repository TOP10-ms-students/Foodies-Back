import { Sequelize } from "sequelize";
import areasSource from "./initial-data/areas.json" assert { type: "json" };
import categoriesSource from "./initial-data/categories.json" assert { type: "json" };
import ingredientsSource from "./initial-data/ingredients.json" assert { type: "json" };
import recipesSource from "./initial-data/recipes.json" assert { type: "json" };
import testimonialsSource from "./initial-data/testimonials.json" assert { type: "json" };
import usersSource from "./initial-data/users.json" assert { type: "json" };

function findId(items, name) {
    return items.find((item) => item.name == name)._id.$oid;
}
/**
 *
 * @param {Sequelize} sequelize
 */
export async function initialize(sequelize) {
    const users = usersSource.map((user) => {
        return {
            id: user._id.$oid,
            name: user.name,
            avatar: user.avatar,
            email: user.email,
        };
    });
    await sequelize.model("Users").bulkCreate(users);

    const areas = areasSource.map((area) => {
        return {
            id: area._id.$oid,
            name: area.name,
        };
    });
    await sequelize.model("Areas").bulkCreate(areas);

    const ings = ingredientsSource.map((ing) => {
        return {
            id: ing._id,
            name: ing.name,
            desc: ing.desc,
            img: ing.img,
        };
    });
    await sequelize.model("Ingredients").bulkCreate(ings);

    const testims = testimonialsSource.map((testim) => {
        return {
            id: testim._id.$oid,
            owner: testim.owner.$oid,
            testimonial: testim.testimonial,
        };
    });
    await sequelize.model("Testimonials").bulkCreate(testims);

    const categories = categoriesSource.map((cat) => {
        return {
            id: cat._id.$oid,
            name: cat.name,
        };
    });
    await sequelize.model("Categories").bulkCreate(categories);

    const recipes = recipesSource.map((recip) => {
        return {
            id: recip._id.$oid,
            title: recip.title,
            category: findId(categoriesSource, recip.category),
            owner: recip.owner.$oid,
            area: findId(areasSource, recip.area),
            instructions: recip.instructions,
            description: recip.description,
            thumb: recip.thumb,
            time: +recip.time,
        };
    });
    await sequelize.model("Recipes").bulkCreate(recipes);

    const recipeIngredients = recipesSource.flatMap((recip) => {
        return recip.ingredients.map((ing) => {
            return {
                recipeId: recip._id.$oid,
                ingredientId: ing.id,
            };
        });
    });
    await sequelize.model("RecipeIngredients").bulkCreate(recipeIngredients);
}
