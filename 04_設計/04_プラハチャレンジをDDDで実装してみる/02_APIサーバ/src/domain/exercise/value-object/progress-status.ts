const progressStatus = {
  notStartedYet: "未着手",
  waitingForReview: "レビュー待ち",
  done: "完了",
} as const;
type progressStatusName = typeof progressStatus[keyof typeof progressStatus];

export class ProgressStatus {
  private name: progressStatusName;

  constructor() {
    this.name = progressStatus.notStartedYet;
  }

  public get currentStatus(): progressStatusName {
    return this.name;
  }

  public progressStatus(): ProgressStatus {
    switch (this.name) {
      case progressStatus.notStartedYet:
        this.name = progressStatus.waitingForReview;
        break;
      case progressStatus.waitingForReview:
        this.name = progressStatus.done;
        break;
      default:
        throw new Error("Illegal status manipulation");
    }

    return this;
  }

  public regressStatus(): ProgressStatus {
    if (this.name === progressStatus.waitingForReview) {
      this.name = progressStatus.notStartedYet;
    } else {
      throw new Error("Illegal status manipulation");
    }

    return this;
  }
}
