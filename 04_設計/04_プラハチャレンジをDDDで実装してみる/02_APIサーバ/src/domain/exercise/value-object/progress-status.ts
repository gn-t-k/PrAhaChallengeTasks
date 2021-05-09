const progressStatus = {
  notStartedYet: "未着手",
  waitingForReview: "レビュー待ち",
  done: "完了",
} as const;
type progressStatusValue = typeof progressStatus[keyof typeof progressStatus];

export class ProgressStatus {
  private value: progressStatusValue;

  constructor() {
    this.value = progressStatus.notStartedYet;
  }

  public get currentStatus(): progressStatusValue {
    return this.value;
  }

  public progressStatus(): ProgressStatus {
    switch (this.value) {
      case progressStatus.notStartedYet:
        this.value = progressStatus.waitingForReview;
        break;
      case progressStatus.waitingForReview:
        this.value = progressStatus.done;
        break;
      default:
        throw new Error("Illegal status manipulation");
    }

    return this;
  }

  public regressStatus(): ProgressStatus {
    if (this.value === progressStatus.waitingForReview) {
      this.value = progressStatus.notStartedYet;
    } else {
      throw new Error("Illegal status manipulation");
    }

    return this;
  }
}
