import styles from "components/atom/article-date/styles.module.css";

type Props = {
  date: Date;
};

const ArticleDate = (props: Props): JSX.Element => {
  const monthEnglishList = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dateString = `${
    monthEnglishList[props.date.getMonth()]
  } ${props.date.getDate()}, ${props.date.getFullYear()}`;

  return <p className={styles.date}>{dateString}</p>;
};

export default ArticleDate;
