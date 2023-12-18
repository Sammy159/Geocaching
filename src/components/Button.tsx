import "./button.css";
export default function MyButton({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) {
  return (
    <button className="myButton" onClick={onClick}>
      {text}
    </button>
  );
}
