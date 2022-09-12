import { Component, ReactNode } from 'react';
import { Button, Modal, Upload, Form, Input, message } from 'antd';
import { TreeDeviceInput } from '@/modules/devices/TreeDevice';
import TreeDeviceApi from '@/apis/devices/treedeviceApi';

interface IProps {
  operation: 'add' | 'update';
  isOpen: boolean;
  onCancel: any;
  parentId: string | null;
}

interface IState {
  tree: TreeDeviceInput;
}

export default class CreateTree extends Component<IProps, IState> {
  state: Readonly<IState> = {
    tree: new TreeDeviceInput(),
  };

  constructor(props) {
    super(props);
    var { tree } = this.state;
    console.log(tree);
  }

  onClick() {
    var { tree } = this.state;
    tree.parentId = this.props.parentId;
    TreeDeviceApi.Create(tree).then((res) => {
      this.props.onCancel(true);
    });
  }

  render() {
    var { operation, isOpen } = this.props;
    var { tree } = this.state;
    return (
      <div>
        <Modal
          title={operation === 'add' ? '添加节点' : '编辑节点'}
          visible={isOpen}
          footer={[]}
          onCancel={() => {
            this.props.onCancel(false);
          }}
        >
          <Input
            placeholder="节点名称"
            value={tree.title}
            onChange={(e) => {
              tree.title = e.target.value;
              this.setState({ tree });
            }}
          ></Input>
          <Button
            onClick={() => this.onClick()}
            type="primary"
            style={{ width: '100%', marginTop: '10px' }}
          >
            {operation === 'add' ? '添加' : '编辑'}
          </Button>
        </Modal>
      </div>
    );
  }
}
