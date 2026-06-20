/* =========================
   PAGE LOADER
========================= */

window.addEventListener("load", () => {

    const loader = document.querySelector(".loader");

    setTimeout(() => {
        loader.classList.add("done");
    }, 700);

});



/* =========================
   CUSTOM CURSOR
========================= */

const cursor = document.querySelector("#cursor");
const trail = document.querySelector("#cursor-trail");

let mouseX = 0;
let mouseY = 0;
let trailX = 0;
let trailY = 0;


document.addEventListener("mousemove", (e)=>{

    mouseX = e.clientX;
    mouseY = e.clientY;

    if(cursor){
        cursor.style.transform =
        `translate(${mouseX}px, ${mouseY}px)`;
    }

});


function animateTrail(){

    trailX += (mouseX - trailX) * .15;
    trailY += (mouseY - trailY) * .15;

    if(trail){
        trail.style.transform =
        `translate(${trailX}px, ${trailY}px)`;
    }

    requestAnimationFrame(animateTrail);

}

animateTrail();



document.querySelectorAll(
"a,button,.video-card,.design-card"
).forEach(item=>{


item.addEventListener("mouseenter",()=>{

    cursor.style.width="30px";
    cursor.style.height="30px";

});


item.addEventListener("mouseleave",()=>{

    cursor.style.width="14px";
    cursor.style.height="14px";

});


});



/* =========================
   SCROLL REVEAL
========================= */


const revealElements =
document.querySelectorAll(".reveal");


const observer =
new IntersectionObserver((entries)=>{


entries.forEach(entry=>{


if(entry.isIntersecting){

entry.target.classList.add("visible");

observer.unobserve(entry.target);

}


});


},{threshold:.15});



revealElements.forEach(el=>{

observer.observe(el);

});





/* =========================
   VIDEO MODAL
========================= */


const videoModal =
document.querySelector("#videoModal");

const modalVideo =
document.querySelector("#modalVideo");

const closeVideo =
document.querySelector("#videoModalClose");



document.querySelectorAll(".video-card")
.forEach(card=>{


card.addEventListener("click",()=>{


let source =
card.getAttribute("data-src");


if(!source) return;


modalVideo.src = source;

videoModal.classList.add("active");

document.body.style.overflow="hidden";


modalVideo.play();


});


});



function closeModal(){

videoModal.classList.remove("active");

modalVideo.pause();

modalVideo.src="";

document.body.style.overflow="";


}



if(closeVideo){

closeVideo.onclick = closeModal;

}



videoModal.addEventListener("click",(e)=>{


if(e.target === videoModal){

closeModal();

}


});



document.addEventListener("keydown",(e)=>{


if(e.key==="Escape"){

closeModal();

}


});






/* =========================
   GRAPHICS LIGHTBOX
========================= */


const backdrop =
document.querySelector("#splitBackdrop");


const stage =
document.querySelector("#splitStage");


const splitClose =
document.querySelector("#splitClose");



document.querySelectorAll(".design-card")
.forEach(card=>{


card.addEventListener("click",()=>{


let images =
JSON.parse(
card.dataset.splits || "[]"
);


stage.innerHTML="";



images.forEach((item)=>{


let box =
document.createElement("div");


box.className="split-panel";



if(item.src){


box.innerHTML = `

<img 
src="${item.src}" 
class="split-panel-thumb"
>


<div class="split-panel-info">

<strong>
${item.label}
</strong>

${item.sub}

</div>

`;



}
else{


box.innerHTML=`

<div 
class="split-panel-thumb"
style="background:${item.bg}"
></div>


<div class="split-panel-info">

<strong>
${item.label}
</strong>

${item.sub}

</div>

`;

}



stage.appendChild(box);



});



backdrop.classList.add("open");

document.body.style.overflow="hidden";



});


});





function closeGallery(){

backdrop.classList.remove("open");

document.body.style.overflow="";


setTimeout(()=>{

stage.innerHTML="";

},400);


}



if(splitClose){

splitClose.onclick=closeGallery;

}



backdrop.addEventListener("click",(e)=>{


if(e.target===backdrop){

closeGallery();

}


});





document.addEventListener("keydown",(e)=>{


if(e.key==="Escape"){

closeGallery();

}


});






/* =========================
   MOBILE VIDEO OPTIMIZATION
========================= */


const videos =
document.querySelectorAll("video");


videos.forEach(video=>{


video.setAttribute(
"playsinline",
""
);


video.muted=true;



});






/* =========================
   HERO PARALLAX
========================= */


const blob =
document.querySelector(".blob-wrap");


document.addEventListener("mousemove",(e)=>{


if(!blob) return;


let x =
(e.clientX/window.innerWidth-.5)*15;


let y =
(e.clientY/window.innerHeight-.5)*15;



blob.style.transform =
`translate(${x}px,${y}px)`;


});
