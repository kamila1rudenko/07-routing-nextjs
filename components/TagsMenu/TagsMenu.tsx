'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import css from './TagsMenu.module.css';

const tags = ['All', 'Todo', 'Work', 'Personal', 'Shopping', 'Meeting'];

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const pathname = usePathname();

  const currentTagRaw = pathname.split('/').pop() || '';
  const currentTag = currentTagRaw.toLowerCase();

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
          {tags.map((tag) => {
            const tagLower = tag.toLowerCase();
            const href = tag === 'All' ? '/notes/filter' : `/notes/filter/${tagLower}`;
            const isActive =
              (tagLower === 'all' && (currentTag === '' || currentTag === 'filter')) ||
              currentTag === tagLower;

            return (
              <li key={tag} className={css.menuItem}>
                <Link
                  href={href}
                  className={`${css.menuLink} ${isActive ? css.active : ''}`}
                  onClick={toggle}
                >
                  {tag}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
