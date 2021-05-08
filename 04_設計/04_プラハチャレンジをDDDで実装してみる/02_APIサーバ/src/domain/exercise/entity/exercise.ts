import { ExerciseGroup } from "domain/exercise/value-object/exercise-group";

export interface IExercise {
  id: string;
  title: string;
  details: string;
  status: string;
  group: ExerciseGroup;
}

export class Exercise {
  private props: IExercise;

  constructor(props: IExercise) {
    // TODO: 進捗ステータスのデフォルトは"未着手"
    if (props.title === "") {
      throw new Error("Illegal title value.");
    }
    if (props.details === "") {
      throw new Error("Illegal details value.");
    }

    this.props = props;
  }

  public get title(): string {
    return this.props.title;
  }

  public get details(): string {
    return this.props.details;
  }

  public get status(): string {
    return this.props.status;
  }

  public get group(): ExerciseGroup {
    return this.props.group;
  }

  // TODO: メソッド
  /**
   * - [ ] 進捗ステータスを変更する
   *   - [ ] 一度完了にした進捗ステータスをレビュー待ち・未着手に戻すことはできない
   */
}
