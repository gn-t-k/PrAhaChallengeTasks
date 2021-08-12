import Category from "components/atom/category";
import styles from "components/organism/category-list/styles.module.css";

type CategoryProps = {
  text: string;
  href: string;
};

type Props = {
  categoryList: CategoryProps[];
};

const CategoryList = (props: Props): JSX.Element => (
  <div className={styles.container}>
    <ul className={styles.list}>
      {props.categoryList.map((category) => (
        <li key={category.text}>
          <Category {...category} />
        </li>
      ))}
    </ul>
  </div>
);

export default CategoryList;
