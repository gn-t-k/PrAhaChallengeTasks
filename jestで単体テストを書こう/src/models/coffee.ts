export interface Coffee {
  id: number;
  uid: string;
  blend_name: string;
  origin: string;
  variety: string;
  notes: string;
  intensifier: string;
}

export const isCoffee = (arg: unknown): arg is Coffee => {
  const coffee = arg as Coffee;

  return (
    typeof coffee?.id === "number" &&
    typeof coffee?.uid === "string" &&
    typeof coffee?.blend_name === "string" &&
    typeof coffee?.origin === "string" &&
    typeof coffee?.variety === "string" &&
    typeof coffee?.notes === "string" &&
    typeof coffee?.intensifier === "string"
  );
};

export const isCoffeeList = (args: unknown[]): args is Coffee[] =>
  args.every((arg) => isCoffee(arg));
