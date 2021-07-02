import { nestedPairData } from "__tests__/__stubs__/usecase/get-all-pair";
import {
  MockContext,
  Context,
  createMockContext,
} from "infrastructure/db/context";
import { GetAllPairQueryService } from "infrastructure/db/query-service/get-all-pair-query-service";
import { GetAllPair } from "usecase/get-all-pair";

let mockContext: MockContext;
let context: Context;

beforeEach(() => {
  mockContext = createMockContext();
  context = (mockContext as unknown) as Context;
});

describe("GetAllPair", () => {
  test("すべてのペアが取得できる", async () => {
    mockContext.prisma.pair.findMany.mockResolvedValue(nestedPairData);

    const getAllPairQueryService = new GetAllPairQueryService(context);
    const executeSqy = jest.spyOn(getAllPairQueryService, "execute");
    const _result = await new GetAllPair(getAllPairQueryService).execute();

    expect(executeSqy).toHaveBeenCalled();
  });
});
