import { useEffect } from "react";
import { useDispatch } from "../services/hooks";
import { Feed, Stats } from "../components";
import { wsConnectionStart } from "../services/actions/ws";
import styles from "./home.module.css";

function FeedPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsConnectionStart("wss://norma.nomoreparties.space/orders/all"));
  }, [dispatch]);
  return (
    <>
      <div className={styles.grid}>
        <Feed />
        <Stats />
      </div>
    </>
  );
}

export default FeedPage;
