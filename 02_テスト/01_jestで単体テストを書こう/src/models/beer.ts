export interface Beer {
  id: number;
  uid: string;
  brand: string;
  name: string;
  style: string;
  hop: string;
  yeast: string;
  malts: string;
  ibu: string;
  alcohol: string;
  blg: string;
}

export const isBeer = (arg: unknown): arg is Beer => {
  const beer = arg as Beer;

  return (
    typeof beer?.id === "number" &&
    typeof beer?.uid === "string" &&
    typeof beer?.brand === "string" &&
    typeof beer?.name === "string" &&
    typeof beer?.style === "string" &&
    typeof beer?.hop === "string" &&
    typeof beer?.yeast === "string" &&
    typeof beer?.malts === "string" &&
    typeof beer?.ibu === "string" &&
    typeof beer?.alcohol === "string" &&
    typeof beer?.blg === "string"
  );
};

export const isBeerList = (args: unknown[]): args is Beer[] =>
  args.every((arg) => isBeer(arg));
