import { Identifier } from "domain/shared/identifier";

export class Entity<T> {
  protected props: { id: Identifier } & T;

  constructor(props: T, id?: Identifier) {
    this.props = {
      id: id ?? new Identifier(),
      ...props,
    };
  }

  public get id(): Identifier {
    return this.props.id;
  }

  public equals(id: Identifier): boolean {
    return this.props.id.equals(id);
  }
}
