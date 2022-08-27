import { Component, ReactNode } from 'react';
import { Card, Tree } from 'antd';
import type { DataNode, TreeProps } from 'antd/es/tree';
import MenuApi from '@/apis/menu';
const x = 3;
const y = 2;
const z = 1;
const defaultData: DataNode[] = [];
const generateData = (
  _level: number,
  _preKey?: React.Key,
  _tns?: DataNode[],
) => {
  const preKey = _preKey || '0';
  const tns = _tns || defaultData;

  const children = [];
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({ title: key, key });
    if (i < y) {
      children.push(key);
    }
  }
  if (_level < 0) {
    return tns;
  }
  const level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
};

generateData(z);

export default class MenuTree extends Component {
  state = {
    treeData: [],
  };

  constructor(props) {
    super(props);
    this.getMenuTree();
  }

  getMenuTree() {
    var { treeData } = this.state;
    MenuApi.getMenuTree().then((res) => {
      console.log(res);
      treeData = res.data;
      this.setState({
        treeData,
      });
    });
  }

  render() {
    var { treeData } = this.state;
    const onDragEnter: TreeProps['onDragEnter'] = (info) => {
      console.log(info);
    };
    const onDrop: TreeProps['onDrop'] = (info) => {
      console.log(info);
      const dropKey = info.node.key;
      const dragKey = info.dragNode.key;
      const dropPos = info.node.pos.split('-');
      const dropPosition =
        info.dropPosition - Number(dropPos[dropPos.length - 1]);
      const loop = (
        data: DataNode[],
        key: React.Key,
        callback: (node: DataNode, i: number, data: DataNode[]) => void,
      ) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].key === key) {
            return callback(data[i], i, data);
          }
          if (data[i].children) {
            loop(data[i].children!, key, callback);
          }
        }
      };
      const data = [...treeData];

      let dragObj: DataNode;
      loop(data, dragKey, (item, index, arr) => {
        arr.splice(index, 1);
        dragObj = item;
      });

      if (!info.dropToGap) {
        // Drop on the content
        loop(data, dropKey, (item) => {
          item.children = item.children || [];
          // where to insert 示例添加到头部，可以是随意位置
          item.children.unshift(dragObj);
        });
      } else if (
        ((info.node as any).props.children || []).length > 0 && // Has children
        (info.node as any).props.expanded && // Is expanded
        dropPosition === 1 // On the bottom gap
      ) {
        loop(data, dropKey, (item) => {
          item.children = item.children || [];
          // where to insert 示例添加到头部，可以是随意位置
          item.children.unshift(dragObj);
          // in previous version, we use item.children.push(dragObj) to insert the
          // item to the tail of the children
        });
      } else {
        let ar: DataNode[] = [];
        let i: number;
        loop(data, dropKey, (_item, index, arr) => {
          ar = arr;
          i = index;
        });
        if (dropPosition === -1) {
          ar.splice(i!, 0, dragObj!);
        } else {
          ar.splice(i! + 1, 0, dragObj!);
        }
      }
      this.setState({
        treeData: data,
      });
    };

    return (
      <Card hoverable style={{ height: '100%' }}>
        <div></div>
        <Tree
          className="draggable-tree"
          draggable
          blockNode
          onDragEnter={onDragEnter}
          onDrop={onDrop}
          treeData={treeData}
        />
      </Card>
    );
  }
}
