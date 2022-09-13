import { Component, ReactNode } from 'react';
import TreeDevice from '@/components/device/TreeDevice';

export default class RunLog extends Component {
  render(): ReactNode {
    return (
      <div style={{ minHeight: '800px', height: '100%' }}>
        <span>
          <TreeDevice />
        </span>
      </div>
    );
  }
}
