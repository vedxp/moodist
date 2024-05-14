import { Sounds } from '@/components/sounds';

import styles from './category.module.css';

import type { Category } from '@/data/types';

interface CategoryProps extends Category {
  functional?: boolean;
}

export function Category({
  functional = true,
  icon,
  id,
  sounds,
  title,
}: CategoryProps) {
  return (
    <div className={styles.category}>
      <div className={styles.iconContainer}>
        <div className={styles.tail} />
        <div className={styles.icon}>{icon}</div>
      </div>

      <div className={styles.title}>{title}</div>

      <Sounds functional={functional} id={id} sounds={sounds} />
    </div>
  );
}
