export default function MyButton({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) {
  const style = {
    width: "120px",
    height: "50px",
    backgroundColor: "grey",
    margin: "5px",
  };
  return (
    <button style={style} onClick={onClick}>
      {text}
    </button>
  );
}
