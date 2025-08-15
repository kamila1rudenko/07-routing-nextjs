import { getTags } from "@/lib/api";
import Link from "next/link";
import css from "./TagsMenu.module.css";

export default async function TagsMenu() {
  try {
    const tags = await getTags();

    return (
      <div className={css.menuContainer}>
        <button className={css.menuButton}>Notes ▾</button>
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <Link href="/notes/filter/All" className={css.menuLink}>
              All notes
            </Link>
          </li>

          {tags.length > 0 ? (
            tags.map((tag) => (
              <li key={tag} className={css.menuItem}>
                <Link
                  href={`/notes/filter/${encodeURIComponent(tag)}`}
                  className={css.menuLink}
                >
                  {tag}
                </Link>
              </li>
            ))
          ) : (
            <li className={css.menuItem}>
              <span className={css.menuLink}>No tags available</span>
            </li>
          )}
        </ul>
      </div>
    );
  } catch (error) {
    console.error("Error loading tags:", error);

    return (
      <div className={css.menuContainer}>
        <button className={css.menuButton}>Notes ▾</button>
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <span className={css.menuLink}>Failed to load tags</span>
          </li>
        </ul>
      </div>
    );
  }
}