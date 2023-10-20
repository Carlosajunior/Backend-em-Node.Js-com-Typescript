export default class SizeConverter {
  public static megabytesToBytes(size: number): number {
    const bytes = size * 1024 ** 2;

    return bytes;
  }

  public static bytesToMegabytes(size: number): number {
    const bytes = (size / 1024 ** 2).toFixed(1);

    return Number(bytes);
  }
}
