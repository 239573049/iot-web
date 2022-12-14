import { Component, ReactNode } from 'react';
import { Card, Tree, Button } from 'antd';
import type { DataNode, TreeProps } from 'antd/es/tree';
import MenuApi from '@/apis/menu';
import Icon from '@/utils/icon';
import styles from './index.less';
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
    selectData: null,
  };

  constructor(props) {
    super(props);
    this.getMenuTree();
  }

  getMenuTree() {
    var { treeData } = this.state;
    MenuApi.getMenuTree().then((res) => {
      this.menuIcon(res.data);
      console.log(res.data);
      treeData = res.data;
      this.setState({
        treeData,
      });
    });
  }

  menuIcon(data: any) {
    data.forEach((d) => {
      d.icon = Icon[d.icon];
      if (d.children.length > 0) {
        this.menuIcon(d.children);
      }
    });
  }

  onSelect(key, value) {
    var { selectData } = this.state;
    selectData = value.selected ? value : null;
    this.setState({ selectData });
  }

  render() {
    var { treeData, selectData } = this.state;
    const onDragEnter: TreeProps['onDragEnter'] = (info) => {
      // console.log('info',info);
    };
    const onDrop: TreeProps['onDrop'] = (info) => {
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
          // where to insert ?????????????????????????????????????????????
          item.children.unshift(dragObj);
        });
      } else if (
        ((info.node as any).props.children || []).length > 0 && // Has children
        (info.node as any).props.expanded && // Is expanded
        dropPosition === 1 // On the bottom gap
      ) {
        loop(data, dropKey, (item) => {
          item.children = item.children || [];
          // where to insert ?????????????????????????????????????????????
          item.children.unshift(dragObj);
          //????????????????????????????????????item.children.push(dragObj)?????????
          //????????????????????????
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

      console.log('onDrop', info);

      var parentId = null;
      var len = 1;

      len = info.dropPosition;

      info.node.children.forEach((x) => {
        console.log('x.key', x.key, 'info.dragNode.key', info.dragNode.key);

        if (x.key == info.dragNode.key) {
          parentId = info.node.key;
          len = info.node.children.indexOf(x) + 1;
        }
      });

      // ?????????????????????????????????????????????
      if (parentId === null) {
        var node = info.node as any;
        parentId = node.parentId;
      }
      if (len === -1) {
        len = 1;
      }
      MenuApi.updateMenuParentId(info.dragNode.key, parentId, len).then(
        (res) => {
          console.log(res);
        },
      );
    };
    var operation = selectData == null;
    return (
      <div>
        <Card hoverable className={styles.operation}>
          <Button type="primary" disabled={operation} className={styles.button}>
            ??????
          </Button>

          <Button type="primary" danger disabled={operation}>
            ??????
          </Button>
        </Card>
        <Card hoverable style={{ height: '100%' }}>
          <Tree
            className="draggable-tree"
            draggable
            blockNode
            showIcon
            onSelect={(key, value) => this.onSelect(key, value)}
            onDragEnter={onDragEnter}
            onDrop={onDrop}
            treeData={treeData}
          />
        </Card>
      </div>
    );
  }
}
