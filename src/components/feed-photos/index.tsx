import { Photo } from "@/types/photo";
import Image from "next/image";
import Link from "next/link";
import styles from "./feed-photos.module.css";

const FeedPhotos = ({ photos }: { photos: Photo[] }) => {
  return (
    <ul className={`${styles.feed} animeLeft`}>
      {photos.map((photo, i) => (
        <li key={`${photo.id}_${i}`} className={styles.photo}>
          <Link href={`/foto/${photo.id}`} scroll={false}>
            <Image
              src={photo.src}
              alt={photo.title}
              width={1500}
              height={1500}
              sizes="80vw"
            />
            <span className={styles.visualizacao}>{photo.acessos}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default FeedPhotos;
