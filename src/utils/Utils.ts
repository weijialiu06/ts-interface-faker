class Utils {
  public static mockjsRandomTypes: RegExp[] = [/^image/];
  public static isTsOriginTtpe(type: string): boolean {
    const originTypes: string[] = ['number', 'string'];
    return originTypes.indexOf(type) !== -1;
  }

}

export default Utils;
