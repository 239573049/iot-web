export class TreeDeviceInput {
  /**Id */
  id: string;

  /**标题 */
  title: string;

  /**图标 */
  Icon: string;

  /** 父级id */
  parentId: null | string;
}

export class GetTreeInput {
  /** 父级id*/
  parentId: null | string;

  /**关键词 */
  keywords: null | string;
}

export class UpdateParentInput {
  /** 父级id*/
  parentId: null | string;

  /**是否设备 */
  device: boolean;

  id: string;
}
