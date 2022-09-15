export class GetDeviceLogListInput {
  deviceId: string | '';

  /**关键词 */
  keywords: null | string;

  /**开始时间 */
  startTime: Date | '';

  /**结束数据 */
  endTime: Date | '';
}
