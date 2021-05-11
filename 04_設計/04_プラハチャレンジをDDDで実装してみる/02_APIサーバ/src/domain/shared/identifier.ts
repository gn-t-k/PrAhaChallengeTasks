import {
  v4 as uuidv4,
  validate as uuidValidate,
  version as uuidVersion,
} from "uuid";

interface IIdentifier {
  value: string;
}

export class Identifier {
  private props: IIdentifier;

  constructor(id?: string) {
    if (id === "") {
      throw new Error("Invalid id value.");
    }

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

  public isUuidV4(): boolean {
    return uuidValidate(this.value) && uuidVersion(this.value) === 4;
  }
}
