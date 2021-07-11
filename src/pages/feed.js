import { Feed, Stats } from "../components";
import styles from "./home.module.css";

function FeedPage() {
  return (
    <div className={styles.grid}>
      <Feed />
      <Stats />
    </div>
  );
}

export default FeedPage;
