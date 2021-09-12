import style from "./loader.module.css";
import { LoaderSvg } from "./loader.svg";
import { ILoaderProps } from "./loader.types";

const Loader = ({ size, inverse = false }: ILoaderProps) => {
  const loaderColor = inverse ? "#fff" : "#3C39EC";

  const wrapperStyleKey = "wrapper_" + size;
  return (
    <div className={style[wrapperStyleKey]}>
      <LoaderSvg color={loaderColor} size={size} />
    </div>
  );
};

export default Loader;
