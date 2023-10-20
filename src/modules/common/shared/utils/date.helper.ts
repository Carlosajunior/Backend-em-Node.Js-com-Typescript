export class DateHelper {
  public static isHours(str: string): boolean {
    const hours = /^([01][0-9]|2[0-3]):[0-5][0-9]+$/;

    return hours.test(str);
  }

  public static hoursToMinutes(value: string): number {
    if (!this.isHours(value)) throw new Error('Invalid hours string');

    const [hours, minutes] = value.split(':');
    return Number(hours) * 60 + Number(minutes);
  }
}
