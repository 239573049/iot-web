import { Component, ReactNode } from 'react';
import { Tree, Input, Button } from 'antd';
import treedeviceApi from '@/apis/devices/treedeviceApi';
import { TreeDeviceInput, GetTreeInput } from '@/modules/devices/TreeDevice';
import CreateTree from './CreateTree';
import Icon from '@/utils/icon';

const { Search } = Input;

interface IProps {
  width: string | number;
}

interface IState {
  treeData: any;
  treeInput: GetTreeInput;
  isOpen: boolean;
  operation: 'add' | 'update';
}

export default class TreeDevice extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.getTree(null);
  }

  state: Readonly<IState> = {
    treeData: undefined,
    treeInput: {
      parentId: null,
      keywords: '',
    },
    isOpen: false,
    operation: 'add',
  };

  getTree(key) {
    var { treeInput, treeData } = this.state;
    if (key) {
      treeInput.parentId = key;
    }
    treedeviceApi.GetTree(treeInput).then((res) => {
      treeData = res.data;
      treeData.forEach((x) => {
        if (x.isLeaf) {
          x.icon = Icon['HddOutlined'];
        } else {
          x.icon = Icon['ClusterOutlined'];
        }
      });

      this.setState({
        treeData,
      });
    });
  }

  LoadData(node) {
    return new Promise<void>((resolve) => {
      if (node.props.children) {
        resolve();
        return;
      }

      var { treeData } = this.state;
      treedeviceApi
        .GetTree({
          parentId: node.key,
          keywords: '',
        })
        .then((res) => {
          res.data.forEach((x) => {
            if (x.isLeaf) {
              x.icon = Icon['HddOutlined'];
            } else {
              x.icon = Icon['ClusterOutlined'];
            }
          });
          node.props.data.children = res.data;
          // node.children = res.data
          console.log(node);

          console.log(treeData);

          this.setState({
            treeData,
          });
          resolve();
        });
    });
  }
  onSearch() {
    this.getTree(null);
  }

  onSelect(key, value) {
    console.log(value);

    var { treeInput } = this.state;
    if (value.selected) {
      // 设置点击父级id
      if (value.node.isLeaf) {
        treeInput.parentId = value.node.parentId;
      } else {
        treeInput.parentId = value.node.key;
      }
    } else {
      // 父级id置空
      treeInput.parentId = null;
    }
    console.log(treeInput);

    this.setState({
      treeInput,
    });
  }

  render() {
    var { width } = this.props;
    var { treeData, isOpen, treeInput, operation } = this.state;
    return (
      <div style={{ width: width }}>
        <div style={{ margin: '5px' }}>
          <Button
            type="primary"
            onClick={() => {
              this.setState({
                isOpen: true,
              });
            }}
          >
            新增文件夹
          </Button>
          <Button type="primary" danger style={{ float: 'right' }}>
            删除
          </Button>
        </div>
        <div>
          {' '}
          <Search
            placeholder="请输入搜索关键词"
            onSearch={() => this.onSearch()}
            style={{ width: width }}
          />
        </div>
        <Tree
          showIcon
          onSelect={(key, value) => this.onSelect(key, value)}
          loadData={(node) => {
            return this.LoadData(node);
          }}
          treeData={treeData}
        />
        <CreateTree
          isOpen={isOpen}
          parentId={treeInput.parentId}
          operation={operation}
          onCancel={(value) => {
            if (value) {
              this.getTree;
            }

            this.setState({
              isOpen: false,
            });
          }}
        />
      </div>
    );
  }
}
