let currentCount = 0;
/**
 * Service for id generation.
 */
export class IdService {
  /**
   * Returns generated id.
   * @returns {string}
   */
  static getId() {
    currentCount += 1;
    return `FileHub${currentCount}`;
  };
}
