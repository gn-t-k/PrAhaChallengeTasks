/**
 * useEffectを使って外部から取得する
 * あと、型を決めてdomain配下に入れるといいかんじになるのかも？
 * ※ domainというより、コンポーネントに都合のいい形のオブジェクトであるだけな気もする。ドメインはドメインで定義して、コンポーネントで使える形に変換するなにかを噛ませたりするのもいいのかも？
 */
export const useGetAuthorList = () => [
  {
    authorName: "Alex John",
    thumbnailSrc:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80",
    authorPostsAmount: 23,
  },
  {
    authorName: "Jane Doe",
    thumbnailSrc:
      "https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=333&q=80",
    authorPostsAmount: 52,
  },
];
