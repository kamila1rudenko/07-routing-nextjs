import css from '@/app/notes/filter/@sidebar/SidebarNotes.module.css';
import Link from 'next/link';

const tags = ['All', 'Work', 'Personal', 'Meeting', 'Shopping', 'Todo'];

const SidebarNotes = () => {
  return (
    <ul className={css.menuList}>
      {tags.map((tag) => {
        const tagLower = tag.toLowerCase();
        const href = tag === 'All' ? '/notes/filter' : `/notes/filter/${tagLower}`;

        return (
          <li key={tag} className={css.menuItem}>
            <Link href={href} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SidebarNotes;
