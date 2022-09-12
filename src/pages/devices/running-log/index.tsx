import { Component, ReactNode } from 'react';
import TreeDevice from '@/components/device/TreeDevice';

export default class RunLog extends Component {
  render(): ReactNode {
    return (
      <div>
        <span>
          <TreeDevice width={'270px'} />
        </span>
      </div>
    );
  }
}
