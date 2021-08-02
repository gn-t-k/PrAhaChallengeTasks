import "components/atom/heading/style.css";

type Props = {
  text: string;
};

const Heading = (props: Props): JSX.Element => (
  <p className="text">{props.text}</p>
);

export default Heading;
