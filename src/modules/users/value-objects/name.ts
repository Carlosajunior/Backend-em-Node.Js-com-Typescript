import { ValueObject } from '@/modules/common/shared/core/value-object';

interface IName {
  value: string;
}

export class Name extends ValueObject<IName> {
  private constructor(props: IName) {
    super(props);
  }

  public static isValid(name: string): boolean {
    if (!name || name.trim().length < 3) {
      return false;
    }

    const numberRegex = /[0-9]/g;

    if (numberRegex.test(name)) {
      return false;
    }

    return true;
  }

  public static format(name: string) {
    return name.trim().replace(/\s{2,}/g, ' ');
  }

  public get value(): string {
    return this.props.value;
  }

  public static create(props: IName): Name {
    if (!this.isValid(props.value)) {
      throw new Error(`Nome ${props.value} inválido.`);
    }

    const formattedName = this.format(props.value);

    return new Name({ value: formattedName });
  }
}
