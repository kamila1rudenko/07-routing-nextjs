'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import css from './TagsMenu.module.css';

const tags = ['All', 'Todo', 'Work', 'Personal', 'Shopping', 'Meeting'];

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const pathname = usePathname();
  const currentTag = pathname.split('/').pop();

  
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div className={css.menuContainer}>
      <button
        onClick={toggle}
        className={css.menuButton}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          {tags.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link
                href={`/notes/filter/${tag === 'All' ? '' : tag}`}
                className={`${css.menuLink} ${currentTag === tag ? css.active : ''}`}
                onClick={toggle}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}