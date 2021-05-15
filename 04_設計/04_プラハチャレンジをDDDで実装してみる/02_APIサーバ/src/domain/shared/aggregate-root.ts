import { Entity } from "domain/shared/entity";
import { Identifier } from "./identifier";

export abstract class AggregateRoot<T> extends Entity<T> {
  constructor(props: T, id?: Identifier) {
    super(props, id);
  }
}
