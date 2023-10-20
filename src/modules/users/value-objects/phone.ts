import { ValueObject } from '@/modules/common/shared/core/value-object';

interface IPhone {
  value: string;
}

export class Phone extends ValueObject<IPhone> {
  private constructor(props: IPhone) {
    super(props);
  }

  public get value(): string {
    return this.props.value;
  }

  public static format(value: string): string {
    return value
      .replace(/^(\d{2})(\d)/g, '($1) $2')
      .replace(/(\d)(\d{4})$/, '$1-$2');
  }

  public static removeSpecialChars(value: string): string {
    return value.trim().replace(/\D/g, '');
  }

  public static isValid(value: string): boolean {
    if (!value || !value.trim()) {
      return false;
    }

    if (
      this.removeSpecialChars(value).length !== 10 &&
      this.removeSpecialChars(value).length !== 11
    ) {
      return false;
    }

    return true;
  }

  public static create(props: IPhone): Phone {
    if (!this.isValid(props.value)) {
      throw new Error(`Telefone ${props.value} inválido.`);
    }

    const formattedPhone = this.removeSpecialChars(props.value);

    return new Phone({ value: formattedPhone });
  }
}
