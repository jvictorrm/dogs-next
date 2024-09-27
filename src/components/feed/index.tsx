"use client";

import { Photo } from "@/types/photo";
import FeedPhotos from "../feed-photos";
import { useEffect, useRef, useState } from "react";
import photosGet from "@/actions/photos-get";
import Loading from "@/components/helper/loading";
import styles from "./feed.module.css";

const Feed = ({ photos, user }: { photos: Photo[]; user?: 0 | string }) => {
  const [photosFeed, setPhotosFeed] = useState<Photo[]>(photos);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [infinite, setInfinite] = useState(photos.length < 6);

  const fetching = useRef(false);

  function infiniteScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      if (fetching.current) return;
      fetching.current = true;
      setLoading(true);
      setTimeout(() => {
        console.log("scroll");
        setPage((page) => page + 1);
        fetching.current = false;
        setLoading(false);
      }, 1000);
    }
  }

  useEffect(() => {
    if (page === 1) return;

    async function getPagePhotos(page: number) {
      const actionData = await photosGet(
        { page, total: 6, user },
        { cache: "no-store" }
      );
      if (!!actionData && !!actionData.data) {
        const { data } = actionData;
        setPhotosFeed((photos) => [...photos, ...data]);

        if (data.length < 6) setInfinite(false);
      }
    }
    getPagePhotos(page);
  }, [page]);

  useEffect(() => {
    if (infinite) {
      window.addEventListener("scroll", infiniteScroll);
      window.addEventListener("wheel", infiniteScroll);
    } else {
      window.removeEventListener("scroll", infiniteScroll);
      window.removeEventListener("wheel", infiniteScroll);
    }

    return () => {
      window.removeEventListener("scroll", infiniteScroll);
      window.removeEventListener("wheel", infiniteScroll);
    };
  }, [infinite]);

  return (
    <div>
      <FeedPhotos photos={photosFeed} />
      <div className={styles.loadingWrapper}>
        {infinite ? loading && <Loading /> : <p>Não existem mais postagens.</p>}
      </div>
    </div>
  );
};

export default Feed;
