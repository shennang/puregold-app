"use client";

import { useEffect } from "react";
import styles from "./slider.module.css";
import Image from "next/image";
import Img1 from "../assets/img1.jpg";
import Img2 from "../assets/img2.jpg";
import Img3 from "../assets/img5.jpg";

const ImageSlider = () => {
  useEffect(() => {
    let slideIndex = 0;
    let timeoutId;

    const showSlides = () => {
      let i;
      const slides = document.getElementsByClassName(styles.mySlides);
      const dots = document.getElementsByClassName(styles.dot);

      // Ensure slides and dots are not empty
      if (slides.length === 0 || dots.length === 0) return;

      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        slides[i].classList.remove(styles.slide); // Remove slide class to reset animation
      }
      slideIndex++;
      if (slideIndex > slides.length) {
        slideIndex = 1;
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(` ${styles.active}`, "");
      }

      // Check if slideIndex is within bounds
      if (slides[slideIndex - 1] && dots[slideIndex - 1]) {
        slides[slideIndex - 1].style.display = "block";
        slides[slideIndex - 1].classList.add(styles.slide); // Add slide class to current slide
        dots[slideIndex - 1].className += ` ${styles.active}`;
      }

      timeoutId = setTimeout(showSlides, 2000); // Change image every 2 seconds
    };

    showSlides();

    // Cleanup function to clear the timeout
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className={styles.slideshowContainer}>
      <div className={styles.mySlides}>
        <Image src={Img1} alt="slider" className={styles.image}></Image>
      </div>

      <div className={styles.mySlides}>
        <Image src={Img2} alt="slider" className={styles.image}></Image>
      </div>

      <div className={styles.mySlides}>
        <Image src={Img3} alt="slider" className={styles.image}></Image>
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
