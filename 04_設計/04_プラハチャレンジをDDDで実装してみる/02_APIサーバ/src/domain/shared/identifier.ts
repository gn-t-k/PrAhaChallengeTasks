import { v4 as uuidv4 } from "uuid";

interface IIdentifier {
  value: string;
}

export class Identifier {
  private props: IIdentifier;

  constructor(id?: string) {
    this.props = {
      value: id ?? uuidv4(),
    };
  }

  public get value(): string {
    return this.props.value;
  }

  public equals(id: Identifier): boolean {
    return this.props.value === id.value;
  }
}
