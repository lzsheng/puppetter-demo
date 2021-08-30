import styles from './index.less';
import { sqrt } from 'mathjs'

console.log(sqrt(-4).toString())

export default function IndexPage() {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
    </div>
  );
}
