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

  public constructor(id?: string) {
    super({
      value: id ?? uuidv4(),
    });
    if (id === "") {
      throw new Error("Invalid id value.");
    }
  }

  public equals = (id: Identifier): boolean => this.props.value === id.value;

  public isUuidV4(): boolean {
    return uuidValidate(this.value) && uuidVersion(this.value) === 4;
  }
}
