/**
 * useEffectを使って外部から取得する
 * あと、型を決めてdomain配下に入れるといいかんじになるのかも？
 * ※ domainというより、コンポーネントに都合のいい形のオブジェクトであるだけな気もする。ドメインはドメインで定義して、コンポーネントで使える形に変換するなにかを噛ませたりするのもいいのかも？
 */
export const useGetCategoryList = () => [
  {
    text: "AWS",
    href: "#",
  },
  {
    text: "Laravel",
    href: "#",
  },
];
