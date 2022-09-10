export class DeviceTemplateDto {
  id: string;

  /**备注 */
  remark: string;

  /** 状态 */
  stats: string;

  /**设备名称 */
  name: string;

  /** 最后活跃时间 */
  lastTime: Date;

  /** 绑定设备 */
  userInfoId: string | null;

  /** 设备模板 */
  deviceTemplateId: string | null;

  /**设备图标 */
  icon: string;

  /**设备类型 */
  type: string;
}

export class CreateDevice {
  /**绑定模板id */
  deviceTemplateId: string;

  /**备注 */
  remark: string;

  /**设备名称 */
  name: string;
}
