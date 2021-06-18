import { Member } from "domain/member/entity/member";

export interface IGetMemberByID {
  id: string;
}

export interface IMemberRepository {
  register(member: Member): Promise<void>;
  getByID(props: IGetMemberByID): Promise<Member>;
  getAll(): Promise<Member[]>;
}
