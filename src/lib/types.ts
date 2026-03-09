export type CocktailDrink = {
    idDrink: string;
    strDrink: string;
    strDrinkThumb: string;
    strCategory: string | null;
    strAlcoholic: string | null;
    strGlass: string | null;
    strInstructions: string | null;
    [key: `strIngredient${number}`]: string | null | undefined;
};

export type CocktailDbResponse = {
    drinks: CocktailDrink[] | null;
};

//mejor meterlo un arry 
export function getCocktailIngredients(drink: CocktailDrink): string[] {
    const ingredients: string[] = [];

    for (let index = 1; index <= 15; index += 1) {
        const value = drink[`strIngredient${index}`];

        if (value && value.trim().length > 0) {
            ingredients.push(value.trim());
        }
        //coger los ingredientes uno a uno, creo que hay mejores maneras pero hace lo qe tiene que hacer
    }

    return ingredients;
}