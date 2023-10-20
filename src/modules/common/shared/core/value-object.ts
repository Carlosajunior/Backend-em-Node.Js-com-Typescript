interface IValueObject {
    [key: string]: any;
}

export abstract class ValueObject<T extends IValueObject> {
    public readonly props: T;

    constructor(props: T) {
        this.props = Object.freeze(props);
    }

    public equals(other: ValueObject<T>): boolean {
        if (other.isNull()) {
            return false;
        }

        if (this.propsLength() !== other.propsLength()) {
            return false;
        }

        if (this.isDifferent(other)) {
            return false;
        }

        return true;
    }

    private isDifferent(other: ValueObject<T>): boolean {
        return this.keys().some(key => this.props[key] !== other.props[key]);
    }

    private isNull(): boolean {
        return this === null || this === undefined || this.props === undefined;
    }

    private keys(): Array<string> {
        return Object.keys(this.props);
    }

    private propsLength(): number {
        return this.keys().length;
    }
}
