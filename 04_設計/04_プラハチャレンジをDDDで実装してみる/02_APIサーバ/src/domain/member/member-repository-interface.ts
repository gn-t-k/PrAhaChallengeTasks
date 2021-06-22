import { Member } from "domain/member/entity/member";
import { Identifier } from "domain/shared/identifier";

export interface IMemberRepository {
  register(member: Member): Promise<void>;
  getByID(id: Identifier): Promise<Member>;
  getAll(): Promise<Member[]>;
  update(member: Member): Promise<void>;
}
