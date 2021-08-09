import Top from "components/template/top";
import { useGetArticleList } from "hooks/use-get-article-list";
import { useGetAuthorList } from "hooks/use-get-author-list";
import { useGetCategoryList } from "hooks/use-get-category-list";
import { useGetRecentPost } from "hooks/use-get-recent-post";

const TopPage = (): JSX.Element => {
  const articleList = useGetArticleList();
  const authorList = useGetAuthorList();
  const categoryList = useGetCategoryList();
  const recentPost = useGetRecentPost();

  return <Top {...{ articleList, authorList, categoryList, recentPost }} />;
};

export default TopPage;
