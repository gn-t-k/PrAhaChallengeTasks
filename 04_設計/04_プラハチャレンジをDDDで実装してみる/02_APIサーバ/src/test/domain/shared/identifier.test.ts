import {
  v4 as uuidv4,
  validate as uuidValidate,
  version as uuidVersion,
} from "uuid";
import { Identifier } from "domain/shared/identifier";

describe("Identifier", () => {
  describe("constructor", () => {
    test("idを渡さずに生成すると、uuidv4の文字列が生成される", () => {
      const id = new Identifier().value;

      expect(uuidValidate(id) && uuidVersion(id) === 4).toBe(true);
    });

    test("idを渡して生成すると、渡した文字列を値として持つidが生成される", () => {
      const value = uuidv4();
      const id = new Identifier(value);

      expect(id.value).toEqual(value);
    });

    test("idに空文字は設定できない", () => {
      expect(() => {
        const _id = new Identifier("");
      }).toThrowError("Invalid id value.");
    });
  });

  describe("idどうしで値を比較することができる", () => {
    test("一致しない場合", () => {
      const id1 = new Identifier(uuidv4());
      const id2 = new Identifier(uuidv4());

      expect(id1.equals(id2)).toBe(false);
    });

    test("一致する場合", () => {
      const uuid = uuidv4();
      const id1 = new Identifier(uuid);
      const id2 = new Identifier(uuid);

      expect(id1.equals(id2)).toBe(true);
    });
  });

  describe("idがuuidv4に準拠しているかどうか確認できる", () => {
    test("準拠している場合", () => {
      const id = new Identifier();

      expect(id.isUuidV4()).toBe(true);
    });

    test("準拠していない場合", () => {
      const id = new Identifier("aaa");

      expect(id.isUuidV4()).toBe(false);
    });
  });
});
