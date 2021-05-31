import { Member } from "domain/member/entity/member";

export interface IMemberRepository {
  register(member: Member): Promise<void>;
  getAll(): Promise<Member[]>;
}
