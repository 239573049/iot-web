import { Component, ReactNode } from 'react';
import { Tree, Input, Button } from 'antd';

const { Search } = Input;

interface IProps {
  width: string | number;
}

interface IState {
  onLoadData: any;
}

interface DataNode {
  title: string;
  key: string;
  isLeaf?: boolean;
  children?: DataNode[];
}

const updateTreeData = (
  list: DataNode[],
  key: React.Key,
  children: DataNode[],
): DataNode[] =>
  list.map((node) => {
    if (node.key === key) {
      return {
        ...node,
        children,
      };
    }
    if (node.children) {
      return {
        ...node,
        children: updateTreeData(node.children, key, children),
      };
    }
    return node;
  });

const initTreeData: DataNode[] = [
  { title: 'Expand to load', key: '0' },
  { title: 'Expand to load', key: '1' },
  { title: 'Tree Node', key: '2', isLeaf: true },
];

export default class TreeDevice extends Component<IProps, IState> {
  constructor(props) {
    super(props);
  }

  state: Readonly<IState> = {
    onLoadData: ({ key, children }: any) =>
      new Promise<void>((resolve) => {
        if (children) {
          resolve();
          return;
        }
        // setTimeout(() => {
        //     setTreeData(origin =>
        //         updateTreeData(origin, key, [
        //             { title: 'Child Node', key: `${key}-0` },
        //             { title: 'Child Node', key: `${key}-1` },
        //         ]),
        //     );

        //     resolve();
        // }, 1000);
      }),
  };

  onSearch() {}

  render() {
    var { width } = this.props;

    return (
      <div style={{ width: width }}>
        <div style={{ margin: '5px' }}>
          <Button type="primary">新增文件夹</Button>
          <Button type="primary" danger style={{ float: 'right' }}>
            删除
          </Button>
        </div>
        <div>
          {' '}
          <Search
            placeholder="请输入搜索关键词"
            onSearch={this.onSearch}
            style={{ width: width }}
          />
        </div>
        <Tree loadData={this.state.onLoadData} treeData={initTreeData} />
      </div>
    );
  }
}
