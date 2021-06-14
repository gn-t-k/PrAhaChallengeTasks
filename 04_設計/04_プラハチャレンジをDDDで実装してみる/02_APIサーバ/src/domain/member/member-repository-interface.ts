import { Member } from "domain/member/entity/member";

interface IGetMemberByID {
  id: string;
}

export interface IMemberRepository {
  register(member: Member): Promise<void>;
  get(props: IGetMemberByID): Promise<Member>;
  getAll(): Promise<Member[]>;
}
