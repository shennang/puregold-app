"use client";

import { useEffect, useRef } from "react";
import styles from "./slider.module.css";
import Image from "next/image";
import Img1 from "../assets/ing1.jpg";
import Img2 from "../assets/ing2.jpg";
import Img3 from "../assets/ing3.jpg";

const ImageSlider = () => {
  const slideIndexRef = useRef(0);
  const slidesContainerRef = useRef(null);
  const timeoutIdRef = useRef(null);

  useEffect(() => {
    const slides = [
      { id: 1, src: Img1, alt: "slider" },
      { id: 2, src: Img2, alt: "slider" },
      { id: 3, src: Img3, alt: "slider" },
    ];

    const showSlides = () => {
      const slidesContainer = slidesContainerRef.current;
      const totalSlides = slides.length;

      slideIndexRef.current++;
      slidesContainer.style.transition = "transform 1s ease";
      slidesContainer.style.transform = `translateX(-${
        (slideIndexRef.current % (totalSlides + 1)) * 100
      }%)`;

      if (slideIndexRef.current >= totalSlides) {
        setTimeout(() => {
          slidesContainer.style.transition = "none";
          slidesContainer.style.transform = `translateX(0)`;
          slideIndexRef.current = 0;
        }, 1000); // Match this delay with your transition duration
      }

      timeoutIdRef.current = setTimeout(showSlides, 3000);
    };

    timeoutIdRef.current = setTimeout(showSlides, 3000);

    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.slideshowContainer}>
      <div className={styles.slidesContainer} ref={slidesContainerRef}>
        <div className={styles.mySlide}>
          <Image src={Img1} alt="slider" quality={1} className={styles.image} />
        </div>
        <div className={styles.mySlide}>
          <Image src={Img2} alt="slider" quality={1} className={styles.image} />
        </div>
        <div className={styles.mySlide}>
          <Image src={Img3} alt="slider" quality={1} className={styles.image} />
        </div>
        <div className={styles.mySlide}>
          <Image src={Img1} alt="slider" quality={1} className={styles.image} />{" "}
          {/* Clone of the first slide */}
        </div>
      </div>

      <div className={styles.dotsContainer}>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
      </div>
    </div>
  );
};

export default ImageSlider;
