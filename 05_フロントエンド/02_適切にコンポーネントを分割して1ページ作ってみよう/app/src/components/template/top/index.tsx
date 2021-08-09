import Heading from "components/atom/heading";
import Selectbox from "components/atom/selectbox";
import AuthorList from "components/organism/author-list";
import CategoryList from "components/organism/category-list";
import Header from "components/organism/header";
import Post from "components/organism/post";
import RecentPost from "components/organism/recent-post";
import styles from "components/template/top/styles.module.css";
import { articleFilterOptions, headerItems } from "constants/top";

type ArticleProps = {
  date: Date;
  tagLabel: string;
  tagHref: string;
  title: string;
  href: string;
  description: string;
  authorName: string;
  authorHref: string;
  thumbnailSrc: string;
};

type AuthorProps = {
  authorName: string;
  thumbnailSrc: string;
  authorPostsAmount: number;
};

type CategoryProps = {
  text: string;
  href: string;
};

type RecentPost = {
  tagHref: string;
  tagText: string;
  postHref: string;
  postTitle: string;
  authorName: string;
  authorHref: string;
  authorThumbnailSrc: string;
  postDate: Date;
};

type Props = {
  articleList: ArticleProps[];
  authorList: AuthorProps[];
  categoryList: CategoryProps[];
  recentPost: RecentPost;
};

const Top = (props: Props): JSX.Element => {
  const { articleList, authorList, categoryList, recentPost } = props;

  return (
    <>
      <Header {...headerItems} />
      <div className={styles.container}>
        <main>
          <section>
            <div className={styles.mainHeading}>
              <h2>
                <Heading text="Post" />
              </h2>
              <Selectbox options={articleFilterOptions} />
            </div>
            <ul>
              {articleList.map((article) => (
                <li key={article.title}>
                  <article>
                    <Post {...article} />
                  </article>
                </li>
              ))}
            </ul>
          </section>
        </main>
        <aside>
          <section>
            <h2>
              <Heading text="Authors" />
            </h2>
            <AuthorList {...{ authorList }} />
          </section>
          <section>
            <h2>
              <Heading text="Categories" />
            </h2>
            <CategoryList {...{ categoryList }} />
          </section>
          <section>
            <h2>
              <Heading text="Recent Post" />
            </h2>
            <RecentPost {...recentPost} />
          </section>
        </aside>
      </div>
    </>
  );
};

export default Top;
