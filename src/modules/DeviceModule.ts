export default class DeviceModule {
  id: string;
  name: string | undefined;

  /**图标 */
  icon: string | undefined;

  /**类型 */
  type: number;

  /**备注 */
  remark: string | undefined;

  /**状态
    OnLine 在线 0,
    OffLine 离线 1,
    Abnormal 异常 2*/
  stats: number;

  /**用户id */
  userInfoId: string | undefined;
}
