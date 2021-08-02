import ChangeColorLink from "components/atom/change-color-link";
import LinkHeading from "components/atom/link-heading";
import SidewaysList from "components/molecule/sideways-list";
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
  <nav className={styles.container}>
    <div className={styles.content}>
      <LinkHeading text={props.title.text} href={props.title.text} />
      <SidewaysList>
        {props.navigationItemList.map((navigationItem) => {
          const { text, href } = navigationItem;

          return [text, <ChangeColorLink key={text} {...{ text, href }} />];
        })}
      </SidewaysList>
    </div>
  </nav>
);

export default Header;
