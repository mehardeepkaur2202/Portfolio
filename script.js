// =====================
// LOADER
// =====================

window.addEventListener("load",()=>{

setTimeout(()=>{

document
.getElementById("loader")
.classList.add("done");

},1500);

});




// =====================
// CUSTOM CURSOR
// =====================


const cursor = document.getElementById("cursor");
const trail = document.getElementById("cursor-trail");


let mouseX = 0;
let mouseY = 0;

let trailX = 0;
let trailY = 0;



document.addEventListener("mousemove",(e)=>{

mouseX = e.clientX;
mouseY = e.clientY;


cursor.style.transform =
`translate(${mouseX-7}px,${mouseY-7}px)`;

});




function animateTrail(){

trailX += (mouseX-trailX)*0.12;
trailY += (mouseY-trailY)*0.12;


trail.style.transform =
`translate(${trailX-19}px,${trailY-19}px)`;


requestAnimationFrame(animateTrail);

}


animateTrail();





// Cursor hover effect


document
.querySelectorAll("a,button,.project-card,.design-card")
.forEach(item=>{


item.addEventListener("mouseenter",()=>{

cursor.style.width="30px";
cursor.style.height="30px";
cursor.style.background="rgba(200,75,49,.5)";

});


item.addEventListener("mouseleave",()=>{

cursor.style.width="14px";
cursor.style.height="14px";
cursor.style.background="var(--rust)";

});


});







// =====================
// TAB SWITCHING
// =====================


const tabs =
document.querySelectorAll(".work-tab");


const panels =
document.querySelectorAll(".work-panel");



tabs.forEach(tab=>{


tab.addEventListener("click",()=>{


tabs.forEach(t=>
t.classList.remove("active")
);


tab.classList.add("active");



let target =
tab.dataset.tab;



panels.forEach(panel=>{


panel.classList.remove("active");



if(panel.id===target){

panel.classList.add("active");

}


});


});


});







// =====================
// SCROLL REVEAL
// =====================


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


},{
threshold:.15

});



revealElements.forEach(el=>{

observer.observe(el);

});








// =====================
// VIDEO POPUP
// =====================



const videoCards =
document.querySelectorAll(".video-card");



videoCards.forEach(card=>{


card.addEventListener("click",()=>{


const video =
card.dataset.video;



if(!video) return;



openVideo(video);


});


});





function openVideo(src){



const modal =
document.createElement("div");


modal.className="video-popup";



modal.innerHTML=`

<div class="popup-content">

<button class="close-video">
✕
</button>

<video autoplay controls>

<source src="${src}">

</video>


</div>

`;



document.body.appendChild(modal);



document.body.style.overflow="hidden";



modal
.querySelector(".close-video")
.onclick=()=>{


modal.remove();

document.body.style.overflow="";


};



modal.onclick=(e)=>{


if(e.target===modal){

modal.remove();

document.body.style.overflow="";

}


};



}






// =====================
// HERO PARALLAX
// =====================


const blob =
document.querySelector(".blob-wrap");



document.addEventListener("mousemove",(e)=>{


let x =
(e.clientX/window.innerWidth-.5)*20;


let y =
(e.clientY/window.innerHeight-.5)*20;



if(blob){

blob.style.transform=
`translate(${x}px,${y}px)`;

}


});





// =====================
// SMOOTH NAVIGATION
// =====================


document
.querySelectorAll("a[href^='#']")
.forEach(link=>{


link.addEventListener("click",(e)=>{


const target =
document.querySelector(
link.getAttribute("href")
);



if(target){

e.preventDefault();


target.scrollIntoView({

behavior:"smooth"

});


}


});


});
// ── Work Tabs
const workTabs = document.querySelectorAll('.work-tab');
const workPanels = document.querySelectorAll('.work-panel');

workTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    workTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const target = tab.dataset.tab;
    workPanels.forEach(panel => {
      panel.classList.remove('active');
      if (panel.id === target) panel.classList.add('active');
    });
    panel_reveals();
  });
});

function panel_reveals() {
  const revealEls = document.querySelectorAll('.reveal:not(.visible)');
  revealEls.forEach(el => obs.observe(el));
}

// ── Scroll Reveal
const revealEls = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
  });
}, { threshold: .08 });
revealEls.forEach(el => obs.observe(el));

// ── Video Modal
const videoModal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const modalClose = document.getElementById('videoModalClose');

function openVideoModal(src) {
  if (!src) return;
  modalVideo.src = src;
  videoModal.classList.add('active');
  document.body.style.overflow = 'hidden';
  modalVideo.play();
}

function closeVideoModal() {
  videoModal.classList.remove('active');
  modalVideo.pause();
  modalVideo.src = '';
  document.body.style.overflow = '';
}

document.querySelectorAll('.video-card').forEach(card => {
  card.addEventListener('click', () => {
    const src = card.dataset.src;
    openVideoModal(src);
  });
});

modalClose.addEventListener('click', closeVideoModal);

videoModal.addEventListener('click', e => {
  if (e.target === videoModal) closeVideoModal();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeVideoModal();
});

// ── Split Lightbox (design cards)
const backdrop = document.getElementById('splitBackdrop');
const stage = document.getElementById('splitStage');
const splitClose = document.getElementById('splitClose');

document.querySelectorAll('.design-card').forEach(card => {
  card.addEventListener('click', () => {
    const splits = JSON.parse(card.dataset.splits || '[]');

    stage.innerHTML = '';
    splits.forEach((s, i) => {
      const panel = document.createElement('div');
      panel.className = 'split-panel';

      if (s.src) {
        const img = document.createElement('img');
        img.src = s.src;
        img.className = 'split-panel-thumb';
        panel.appendChild(img);
      } else {
        const thumb = document.createElement('div');
        thumb.className = 'split-panel-thumb';
        thumb.style.cssText = `background:${s.bg};width:100%;`;
        thumb.style.aspectRatio = i === 0 ? '3/4' : i === 1 ? '4/5' : '1/1';
        panel.appendChild(thumb);
      }

      if (i === 0) {
        const badge = document.createElement('div');
        badge.className = 'split-badge';
        badge.textContent = `${splits.length} VIEWS`;
        panel.appendChild(badge);
      }

      const info = document.createElement('div');
      info.className = 'split-panel-info';
      info.innerHTML = `<strong>${s.label}</strong>${s.sub}`;
      panel.appendChild(info);

      stage.appendChild(panel);
    });

    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeSplit() {
  backdrop.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => { stage.innerHTML = ''; }, 500);
}

splitClose.addEventListener('click', closeSplit);
backdrop.addEventListener('click', e => { if (e.target === backdrop) closeSplit(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSplit(); });

// ── Parallax on hero blob
document.addEventListener('mousemove', e => {
  const px = (e.clientX / window.innerWidth - .5) * 18;
  const py = (e.clientY / window.innerHeight - .5) * 12;
  document.querySelectorAll('.blob-wrap').forEach(el => {
    el.style.transform = `translate(${px * .4}px,${py * .4}px)`;
  });
});
