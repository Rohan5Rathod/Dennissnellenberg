"use client"
import styles from "./page.module.css"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/all"
import { useEffect, useRef } from "react"

export default function page() {

  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  let xPersent = 0;
  let direction = 1;

  useEffect(()=>{
    gsap.registerPlugin(ScrollTrigger);
    requestAnimationFrame(animation);

    gsap.to(slider.current,{
      scrollTrigger:{
        trigger:document.documentElement,
        start:0,
        end:window.innerHeight,
        scrub:0.25,
        onUpdate: e => direction = e.direction * -1
      },
      x:"-=300px",
    })
  },[])

  const animation = () =>{
    if(xPersent <= -100){
      xPersent = 0;
    }
    if(xPersent > 0){
      xPersent = -100;
    }
    gsap.set(firstText.current, {xPercent: xPersent});
    gsap.set(secondText.current, {xPercent: xPersent});
    xPersent += 0.1 * direction;
    requestAnimationFrame(animation);
  }

  return (
   <>
    <main className={styles.main}>
   <Image fill={true} src="/images/yulia-matvienko-ArA3S3k0wTU-unsplash.jpg" alt="img"/>
   <div className={styles.sliderContainer}>
    <div ref={slider} className={styles.slider}>
      <p ref={firstText}>Freelance Photography -</p>
      <p ref={secondText}>Freelance Photography -</p>
    </div>
   </div>
   </main>
   <div className={styles.hero}></div>
   </>
  )
}
