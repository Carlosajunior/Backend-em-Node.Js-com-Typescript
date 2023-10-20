export class LocationHelper {
  public static create(city: string, state: string): string {
    if (city && state) {
      return `${city}, ${state}`;
    }

    if (city) {
      return city;
    }

    if (state) {
      return state;
    }

    return null;
  }
}
