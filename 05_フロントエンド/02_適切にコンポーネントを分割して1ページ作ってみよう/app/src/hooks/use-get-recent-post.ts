/**
 * useEffectを使って外部から取得する
 * あと、型を決めてdomain配下に入れるといいかんじになるのかも？
 * ※ domainというより、コンポーネントに都合のいい形のオブジェクトであるだけな気もする。ドメインはドメインで定義して、コンポーネントで使える形に変換するなにかを噛ませたりするのもいいのかも？
 */
export const useGetRecentPost = () => ({
  tagHref: "#",
  tagText: "Laravel",
  postHref: "#",
  postTitle: "Build Your Name Idea with Laravel Freamwork",
  authorName: "Alex John",
  authorHref: "#",
  authorThumbnailSrc:
    "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80",
  postDate: new Date(),
});
