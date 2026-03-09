import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getCocktailById } from "@/lib/api";
import { getCocktailIngredients } from "@/lib/types";
import styles from "./page.module.css";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function CocktailDetailPage({ params }: PageProps) {
  const { id } = await params;
  const cocktail = await getCocktailById(id);

  if (!cocktail) {
    notFound();
  }

  const ingredients = getCocktailIngredients(cocktail);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Link href="/" className={styles.back}>
          Volver al listado
        </Link>

        <section className={styles.card}>
          <div className={styles.imageWrap}>
            <Image
              src={cocktail.strDrinkThumb}
              alt={`Foto de ${cocktail.strDrink}`}
              fill
              className={styles.image}
              sizes="(max-width: 900px) 100vw, 460px"
              priority
            />
          </div>

          <div className={styles.info}>
            <p className={styles.id}>ID {cocktail.idDrink}</p>
            <h1 className={styles.title}>{cocktail.strDrink}</h1>

            <div className={styles.metaGrid}>
              <div>
                <span>Categoria</span>
                <strong>{cocktail.strCategory ?? "No disponible"}</strong>
              </div>

              <div>
                <span>Alcohol</span>
                <strong>{cocktail.strAlcoholic ?? "No disponible"}</strong>
              </div>

              <div>
                <span>Vaso</span>
                <strong>{cocktail.strGlass ?? "No disponible"}</strong>
              </div>
            </div>

            <div className={styles.group}>
              <h2>Instrucciones (EN)</h2>
              <p>{cocktail.strInstructions ?? "No disponibles."}</p>
            </div>

            <div className={styles.group}>
              <h2>Ingredientes</h2>
              <ul className={styles.list}>
                {ingredients.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
