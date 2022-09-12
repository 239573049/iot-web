import request from '@/utils/request';
import { TreeDeviceInput, GetTreeInput } from '@/modules/devices/TreeDevice';

const name = 'iot-admin/api/';

class TreeDeviceApi {
  /**创建树形节点 */
  Create(value: TreeDeviceInput) {
    return request.post(name + '/app/tree-device', {
      data: value,
    });
  }

  /**编辑树形节点 */
  Update(value: TreeDeviceInput) {
    return request.put(name + '/app/tree-device');
  }

  /**删除树形节点 */
  Delete(id: string) {
    return request.delete(name + '/app/tree-device/' + id);
  }

  /**获取树形结构 */
  GetTree(input: GetTreeInput) {
    return request.get(
      name +
        '/app/tree-device/tree?parentId=' +
        input.parentId +
        '&keywords=' +
        input.keywords,
    );
  }
}

export default new TreeDeviceApi();
