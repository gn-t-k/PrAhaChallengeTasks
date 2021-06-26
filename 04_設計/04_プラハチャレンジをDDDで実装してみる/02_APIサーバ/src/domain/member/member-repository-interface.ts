import { Member } from "domain/member/entity/member";
import { Identifier } from "domain/__shared__/identifier";

export interface IMemberRepository {
  register(member: Member): Promise<void>;
  getByID(id: Identifier): Promise<Member | null>;
  getAll(): Promise<Member[]>;
  update(member: Member): Promise<void>;
  delete(member: Member): Promise<void>;
}
