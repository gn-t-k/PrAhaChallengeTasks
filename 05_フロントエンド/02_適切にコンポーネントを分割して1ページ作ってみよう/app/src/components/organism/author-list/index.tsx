import Author from "components/molecule/author";
import styles from "components/organism/author-list/styles.module.css";

type AuthorProps = {
  authorName: string;
  thumbnailSrc: string;
  authorPostsAmount: number;
};

type Props = {
  authorList: AuthorProps[];
};

const AuthorList = (props: Props): JSX.Element => (
  <div className={styles.container}>
    <ul className={styles.list}>
      {props.authorList.map((author) => (
        <li key={author.authorName}>
          <Author {...author} />
        </li>
      ))}
    </ul>
  </div>
);

export default AuthorList;
