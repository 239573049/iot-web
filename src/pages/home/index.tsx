import styles from './index.less';
import { Card } from 'antd';

export default function IndexPage() {
  return (
    <div className={styles.body}>
      <Card style={{ width: 600 }}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </div>
  );
}
