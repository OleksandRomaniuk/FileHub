export class Action {
  title;
  payload;

  /**
   * @abstract
   */
  execute() {
  }

  get title() {
    return this.title;
  }
}
