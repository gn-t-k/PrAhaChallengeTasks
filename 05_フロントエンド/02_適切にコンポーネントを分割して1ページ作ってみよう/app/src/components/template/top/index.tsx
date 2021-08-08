import Heading from "components/atom/heading";
import Selectbox from "components/atom/selectbox";
import AuthorList from "components/organism/author-list";
import CategoryList from "components/organism/category-list";
import Header from "components/organism/header";
import Post from "components/organism/post";
import RecentPost from "components/organism/recent-post";
import styles from "components/template/top/styles.module.css";
import { articleFilterOptions, headerItems } from "constants/top";

type Props = {};

const Top = (props: Props): JSX.Element => {
  const articles = [
    {
      date: new Date(),
      tagLabel: "Laravel",
      tagHref: "#",
      title: "Build Your New Idea with Laravel Freamwork.",
      href: "#",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos enim reprehenderit nisi, accusamus delectus nihil quis facere in modi ratione libero!",
      authorName: "Alex John",
      authorHref: "#",
      thumbnailSrc:
        "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80",
    },
  ];
  const authorList = [
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
  const categoryList = [
    {
      text: "AWS",
      href: "#",
    },
    {
      text: "Laravel",
      href: "#",
    },
  ];
  const recentPost = {
    tagHref: "#",
    tagText: "Laravel",
    postHref: "#",
    postTitle: "Build Your Name Idea with Laravel Freamwork",
    authorName: "Alex John",
    authorHref: "#",
    authorThumbnailSrc:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80",
    postDate: new Date(),
  };

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
              {articles.map((article) => (
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
