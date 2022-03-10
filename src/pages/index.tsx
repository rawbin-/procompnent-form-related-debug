import React from 'react';
import 'antd/dist/antd.css';
import styles from './index.css';
import TableWithEditor from '@/pages/components/TableWithEditor';

export default function () {
  return (
    <div className={styles.normal}>
      <TableWithEditor></TableWithEditor>
    </div>
  );
}
