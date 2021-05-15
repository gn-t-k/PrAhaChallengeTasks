import { Identifier } from "domain/shared/identifier";

export abstract class Entity<T> {
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

  public equals(entity: Entity<T>): boolean {
    return this.props.id.equals(entity.id);
  }
}
