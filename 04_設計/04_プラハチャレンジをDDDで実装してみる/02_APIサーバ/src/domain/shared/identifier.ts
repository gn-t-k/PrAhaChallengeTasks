import {
  v4 as uuidv4,
  validate as uuidValidate,
  version as uuidVersion,
} from "uuid";
import { ValueObject } from "./value-object";

interface IIdentifier {
  value: string;
}

export class Identifier extends ValueObject<IIdentifier> {
  public get value(): string {
    return this.props.value;
  }

  constructor(id?: string) {
    if (id === "") {
      throw new Error("Invalid id value.");
    }
    super({
      value: id ?? uuidv4(),
    });
  }

  public equals(id: Identifier): boolean {
    return this.props.value === id.value;
  }

  public isUuidV4(): boolean {
    return uuidValidate(this.value) && uuidVersion(this.value) === 4;
  }
}
