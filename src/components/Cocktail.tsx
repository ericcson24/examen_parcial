import Image from "next/image";
import Link from "next/link";
import { CocktailDrink } from "@/lib/types";
import styles from "./Cocktail.module.css";

type CocktailProps = {
  cocktail: CocktailDrink;
};

export default function Cocktail({ cocktail }: CocktailProps) {
  return (
    <Link href={`/coctail/${cocktail.idDrink}`} className={styles.card}>
      <div className={styles.imageWrap}>
        <Image
          src={cocktail.strDrinkThumb}
          alt={`Foto de ${cocktail.strDrink}`}
          fill
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <h2>{cocktail.strDrink}</h2>
      </div>
    </Link>
  );
}
