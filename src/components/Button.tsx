/**
 * MyButton Component
 *
 * This is a React component that renders a custom button.
 *
 * @param {Object} props - The properties for the MyButton component.
 * @param {string} props.text - The text to be displayed on the button.
 * @param {() => void} props.onClick - A function to be executed when the button is clicked.
 *
 * @returns {JSX.Element} - The rendered MyButton component.
 */
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
