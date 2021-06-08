import { Identifier } from "domain/shared/identifier";

export abstract class Entity<T> {
  protected props: { id: Identifier } & T;

  public get id(): Identifier {
    return this.props.id;
  }

  public constructor(props: T, id?: Identifier) {
    this.props = {
      id: id ?? new Identifier(),
      ...props,
    };
  }

  abstract equals(entity: Entity<T>): boolean;
}
