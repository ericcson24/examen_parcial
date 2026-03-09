"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cocktail from "@/components/Cocktail";
import { getMargaritaCocktails, getRandomCocktail } from "@/lib/api";
import { CocktailDrink } from "@/lib/types";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();
  const [cocktails, setCocktails] = useState<CocktailDrink[]>([]);
  const [loading, setLoading] = useState(true);
  const [randomLoading, setRandomLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {

    //exactaemtne el mismo codigo que la practica 2
    let isMounted = true;

    async function fetchMargaritas() {
      try {
        setLoading(true);
        setError("");
        const data = await getMargaritaCocktails();

        if (isMounted) {
          setCocktails(data);
        }
      } catch (requestError) {
        if (isMounted) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : "No se pudieron cargar los cocktails."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchMargaritas();

    return () => {
      isMounted = false;
    };
  }, []);

  async function handleRandomCocktail() {
    try {
      setRandomLoading(true);
      setError("");
      const cocktail = await getRandomCocktail();

      if (!cocktail) {
        setError("No se encontro un cocktail aleatorio.");
        return;
      }

      router.push(`/coctail/${cocktail.idDrink}`);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "No se pudo cargar un cocktail aleatorio."
      );
    } finally {
      setRandomLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        
        <h1>Recetas de Margarita</h1>
        

        <button
          type="button"
          className={styles.randomButton}
          onClick={handleRandomCocktail}
          disabled={randomLoading}
        >
          {randomLoading ? "Buscando..." : "Dime algo bonito"}
        </button>
      </header>

      {error && <p className={styles.error}>{error}</p>}

      {loading ? (
        <p className={styles.loading}>Cargando cocktails...</p>
      ) : (
        <section className={styles.grid}>
          {cocktails.map((cocktail) => (
            <Cocktail key={cocktail.idDrink} cocktail={cocktail} />
          ))}
        </section>
      )}
    </main>
  );
}

