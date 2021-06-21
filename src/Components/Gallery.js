import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Image from "./Image";
import "./Gallery.css";
import { getSearchedImages } from "../api/api";
import Masonry from "react-masonry-css";
import InfiniteScroll from "react-infinite-scroll-component";

const modalStyle = {
  content: {
    border: "none",
    padding: "none",
    overflow: "hidden",
    height: "70%"
  }
};
const Gallery = ({ query }) => {
  // const [imgList, setImgList] = useState([]);
  const [URLS, setUrls] = useState([]);
  const [currentImg, setCurrentImg] = useState(null);
  const [val, setVal] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const [breakpointColumnsObj, setBreakpointColumnsObj] = useState({
    default: 3,
    1200: 3,
    992: 3,
    768: 2,
    576: 1
  });

  function handleClick(e) {
    e.preventDefault();
    console.log("CLICked");
    val
      ? setBreakpointColumnsObj({ ...breakpointColumnsObj, default: 2 })
      : setBreakpointColumnsObj({ ...breakpointColumnsObj, default: 3 });
    setVal(!val);
  }

  async function getImage(query, pageNo) {
    if (query.trim() === "") {
      return;
    }
    const data = await getSearchedImages(query, pageNo);
    console.log(data);
    // setImgList(data.results);
    setUrls((imgList) => {
      return [...imgList, ...data.results];
    });
  }

  useEffect(() => {
    getImage(query, pageNo);
    setUrls([]);
  }, [query]);

  function addMore(pageNo) {
    setPageNo((prevPage) => prevPage + 1);
    getImage(query, pageNo);
  }

  Modal.setAppElement("#app");
  return (
    <div>
      <Modal
        contentLabel="Image preview"
        style={modalStyle}
        isOpen={!!currentImg}
        onRequestClose={() => setCurrentImg(null)}
      >
        <img className="img-preview" src={currentImg} alt="imagepreview" />
      </Modal>
      <button type="button" onClick={(e) => handleClick(e)}>
        Change Layout
      </button>
      {URLS.length === 0 ? <h2>No images found</h2> : null}

      <InfiniteScroll
        dataLength={URLS.length}
        next={() => addMore()}
        hasMore={true}
      >
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="masonry-grid"
          columnClassName="masonry-grid_column"
        >
          {URLS.map((img) => {
            return (
              <Image urls={img.urls} handleClick={setCurrentImg} key={img.id} />
            );
          })}
        </Masonry>
      </InfiniteScroll>
    </div>
  );
};

export default Gallery;
