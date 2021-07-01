import { Identifier } from "domain/__shared__/identifier";
import { Member } from "domain/member/entity/member";

export interface IMemberRepository {
  register(member: Member): Promise<void>;
  getByID(id: Identifier): Promise<Member | null>;
  getByIDList(idList: Identifier[]): Promise<Member[]>;
  getAll(): Promise<Member[]>;
  update(member: Member): Promise<void>;
  delete(member: Member): Promise<void>;
}
