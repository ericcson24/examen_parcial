import axios from "axios";
import { CocktailDbResponse, CocktailDrink } from "./types";

const api = axios.create({
    baseURL: "https://www.thecocktaildb.com/api/json/v1/1",
    timeout: 10000,
});

function getErrorMessage(error: unknown): string {
    if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        return status
            ? `Error en la API de cocktails (status ${status}).`
            : "No hay respuesta de la API de cocktails.";
    }

    return "Error inesperado al consultar cocktails.";
}

async function requestDrinks(endpoint: string): Promise<CocktailDrink[]> {
    try {
        const response = await api.get<CocktailDbResponse>(endpoint);
        return response.data.drinks ?? [];
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
}

export async function searchCocktailsByName(name: string): Promise<CocktailDrink[]> {
    const encodedName = encodeURIComponent(name.trim());
    return requestDrinks(`/search.php?s=${encodedName}`);
}

export async function getMargaritaCocktails(): Promise<CocktailDrink[]> {
    return searchCocktailsByName("margarita");
}

export async function getCocktailById(id: string): Promise<CocktailDrink | null> {
    //el trim porq hay uno que no me aparece sin ello ns porq
    const encodedId = encodeURIComponent(id.trim());
    const cocktails = await requestDrinks(`/lookup.php?i=${encodedId}`);
    return cocktails[0] ?? null;
}

export async function getRandomCocktail(): Promise<CocktailDrink | null> {
    const cocktails = await requestDrinks("/random.php");
    return cocktails[0] ?? null;
}