export class TokenDecode {
  public static decode<T = any>(token: string): T {
    return JSON.parse(Buffer.from(token?.split('.')[1], 'base64')?.toString());
  }
}
