import { useLottie } from "lottie-react";
import doneImage from "../../images/modal-done.json";

function DoneAnimation() {
  const options = {
    animationData: doneImage,
    loop: false,
    autoplay: true,
  };
  const { View } = useLottie(options);

  return View;
}

export default DoneAnimation;
