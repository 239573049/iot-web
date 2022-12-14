import { Tree, Button, message } from 'antd';
import React, { useState } from 'react';
import treeDeviceApi from '@/apis/devices/treedeviceApi';
import Icon from '@/utils/icon';
import './TreeDevice.less';
import CreateTree from './CreateTree';
import type { DataNode, TreeProps } from 'antd/es/tree';

let inputData = {
  parentId: null,
  id: null,
};
let isOpen = false;

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

let data = [];

function Data() {
  return new Promise<void>((resolve) => {
    treeDeviceApi
      .GetTree({
        parentId: '',
        keywords: '',
      })
      .then((res) => {
        res.data.map((x) => {
          x.icon = x.isLeaf ? Icon['HddOutlined'] : Icon['FolderOutlined'];
        });
        data = res.data;
        resolve();
      });
  });
}

Data();
let i = 1;

function App(props) {
  const [treeData, setTreeData] = useState(data);
  const [parent, setParent] = useState(inputData);
  const [isOpen, setIsOpen] = useState(false);
  const onLoadData = ({ key, children }: any) =>
    new Promise<void>((resolve) => {
      treeDeviceApi
        .GetTree({
          parentId: key,
          keywords: '',
        })
        .then((res) => {
          res.data.map((x) => {
            x.icon = x.isLeaf ? Icon['HddOutlined'] : Icon['FolderOutlined'];
          });

          setTreeData((origin) => updateTreeData(origin, key, res.data));
          resolve();
        });
    });

  if (i === 1) {
    GetData();
    i = 2;
  }

  function GetData() {
    treeDeviceApi
      .GetTree({
        parentId: '',
        keywords: '',
      })
      .then((res: any) => {
        res.data.map((x) => {
          x.icon = x.isLeaf ? Icon['HddOutlined'] : Icon['FolderOutlined'];
        });

        setTreeData(res.data);
      });
  }

  function LoadData(key, children) {
    return new Promise<void>((resolve) => {
      treeDeviceApi
        .GetTree({
          parentId: key,
          keywords: '',
        })
        .then((res) => {
          res.data.map((x) => {
            x.icon = x.isLeaf ? Icon['HddOutlined'] : Icon['FolderOutlined'];
          });

          setTreeData((origin) => updateTreeData(origin, key, res.data));
          resolve();
        });
    });
  }

  function onSelect(key, node) {
    props.OnSelect(node);
    if (node.selected) {
      if (node.node.isLeaf) {
        setParent((origin) => {
          origin.parentId = node.node.parentId;
          origin.id = node.node.key;
          return origin;
        });
      } else {
        setParent((origin) => {
          origin.parentId = node.node.key;
          origin.id = node.node.key;
          return origin;
        });
      }
    } else {
      setParent((origin) => {
        origin.parentId = null;
        origin.id = null;
        return origin;
      });
    }
  }

  function OnDelete() {
    if (parent?.id !== null) {
      treeDeviceApi.Delete(parent.id).then((res) => {
        if (res.code === '200') {
          message.success('????????????');
          LoadData(null, null);
        } else {
          message.error(res.message);
        }
      });
    }
  }

  function OnCreate() {
    setIsOpen(true);
  }
  const onDragEnter: TreeProps['onDragEnter'] = (info) => {
    console.log(info);
    // expandedKeys ?????????????????????
    // setExpandedKeys(info.expandedKeys)
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

    // Find dragObject
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

    var parentId = null;
    let isLeaf = false;
    info.node.children.forEach((x) => {
      console.log('x.key', x.key, 'info.dragNode.key', info.dragNode.key);

      if (x.key == info.dragNode.key) {
        parentId = info.node.key;
        // ???????????????????????????
        if (info.node.isLeaf === true) {
          isLeaf = true;
        }
      }
    });

    if (isLeaf) {
      return;
    }

    // ?????????????????????????????????????????????
    if (parentId === null) {
      var node = info.node as any;
      parentId = node.parentId;
    }

    treeDeviceApi
      .updateParent({
        parentId: parentId,
        id: info.dragNode.key.toString(),
        device: info.dragNode.isLeaf,
      })
      .then((res) => {
        if (res.code === '200') {
          message.success('????????????');
          LoadData(null, null);
        } else {
          message.error(res.message);
        }
      });

    setTreeData(data);
  };

  return (
    <div className="tree-context">
      <div style={{ margin: '5px' }}>
        <Button
          style={{ margin: '5px' }}
          type="primary"
          onClick={() => OnCreate()}
        >
          ????????????
        </Button>
        <Button
          style={{ margin: '5px' }}
          type="primary"
          danger
          onClick={() => OnDelete()}
        >
          ????????????
        </Button>
      </div>
      <Tree
        style={{ width: '180px', height: '100%' }}
        showLine
        draggable
        showIcon
        blockNode
        onDragEnter={onDragEnter}
        onDrop={onDrop}
        onSelect={(key, node) => onSelect(key, node)}
        loadData={onLoadData}
        treeData={treeData}
      />
      <CreateTree
        operation={'add'}
        isOpen={isOpen}
        onCancel={(value) => {
          if (value) {
            LoadData(parent.parentId, null);
          }
          setIsOpen(false);
        }}
        parentId={parent.parentId}
      />
    </div>
  );
}

export default App;
