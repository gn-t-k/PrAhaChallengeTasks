import ChangeColorLink from "components/atom/change-color-link";
import LinkHeading from "components/atom/link-heading";
import Navigation from "components/molecule/navigation";
import styles from "components/organism/header/styles.module.css";

type HeaderItem = {
  text: string;
  href: string;
};

type Props = {
  title: HeaderItem;
  navigationItemList: HeaderItem[];
};

const Header = (props: Props): JSX.Element => (
  <header className={styles.container}>
    <section className={styles.content}>
      <h1>
        <LinkHeading text={props.title.text} href={props.title.text} />
      </h1>
      <nav>
        <Navigation>
          {props.navigationItemList.map((navigationItem) => {
            const { text, href } = navigationItem;

            return [text, <ChangeColorLink key={text} {...{ text, href }} />];
          })}
        </Navigation>
      </nav>
    </section>
  </header>
);

export default Header;
