import './style.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import * as THREE from "three";
import LocomotiveScroll from 'locomotive-scroll';

const locoScroll = new LocomotiveScroll({
  el: document.querySelector('.smooth-scroll'),
  smooth: true
});

gsap.registerPlugin(ScrollTrigger);

locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".smooth-scroll", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, {duration: 0, disableLerp: true}) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".smooth-scroll").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.defaults({ scroller: ".smooth-scroll" });

gsap.set(".logo-img", {transformOrigin: "center"});

var tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#start",
    start: "center center",
    end: "bottom top",
    scrub: 1,
    pin: true
  }
})
    .add("start")
    .to("#silut", {
      top: "50%",
      width: "32%"
    }, "start")
    .to("#tipo", {
      opacity: 1,
      rotate: 360,
      width: "38%"
    }, "start")
    .to("#signi", {
      opacity: 1,
      scale: 0.8,
      left: "47%",
      top: "33%"
    }, "start")
    .to("#start", {
      //      backgroundImage: "linear-gradient(to right, rgb(37 25 100), rgb(50 101 122), rgb(40 155 89))"
      background: "black"
    }, "start")
    .to("#tipo", {
      rotate: 360*2
    });


window.addEventListener("mousemove", (e) => {
  gsap.to("#mic", {
    duration: 0.5,
    x: e.clientX,
    y: e.clientY
  });
});

/*const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function animate() {
  requestAnimationFrame( animate );
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();


const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff});

const points = []
points.push( new THREE.Vector3(-3, 0, 1));
points.push( new THREE.Vector3(0, 1, 1));
points.push( new THREE.Vector3(3, 0, 1));

const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

const line = new THREE.Line(lineGeometry, material);
scene.add(line)

const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);
renderer.render(scene, camera);
*/
