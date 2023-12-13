import LMap from "./Map2";

export default function ShowHidingScreen({
  showNextScreen,
  isHiding,
}: {
  showNextScreen: boolean;
  isHiding: boolean;
}) {
  if (showNextScreen) {
    return (
      <>
        <LMap isHiding={isHiding}></LMap>
      </>
    );
  } else null;
}
