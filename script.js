// Section navigation
const sections = document.querySelectorAll('.section');
function showSection(id){sections.forEach(sec=>sec.classList.remove('active'));const el=document.getElementById(id);if(el){el.classList.add('active');el.setAttribute('tabindex','-1');el.focus({preventScroll:true});window.scrollTo({top:0,behavior:'smooth'});}}

document.querySelectorAll('.grid-btn').forEach(btn=>{btn.addEventListener('click',()=>{const target=btn.getAttribute('data-target');showSection(target);history.pushState({section:target},'',`#${target}`);popHearts();});});

document.querySelectorAll('[data-back]').forEach(link=>{link.addEventListener('click',(e)=>{e.preventDefault();showSection('home');history.pushState({section:'home'},'','#home');});});

window.addEventListener('load',()=>{const hash=location.hash.replace('#','');if(hash&&document.getElementById(hash))showSection(hash);else showSection('home');document.querySelectorAll('.polaroid').forEach((p)=>{const deg=(Math.random()*6-3).toFixed(1);p.style.setProperty('--tilt',`${deg}deg`);});});

window.addEventListener('popstate',(e)=>{const section=(e.state&&e.state.section)||location.hash.replace('#','')||'home';if(document.getElementById(section))showSection(section);});

// Heart confetti
const hearts=['♥','❤','♡'];
function popHearts(){const count=10;for(let i=0;i<count;i++){const span=document.createElement('span');span.textContent=hearts[Math.floor(Math.random()*hearts.length)];span.style.position='fixed';span.style.left=(Math.random()*100)+'vw';span.style.top='-20px';span.style.opacity='0.9';span.style.zIndex=9999;span.style.pointerEvents='none';span.style.transition='transform 1.6s ease, opacity 1.6s ease';document.body.appendChild(span);requestAnimationFrame(()=>{span.style.transform=`translateY(${window.innerHeight+40}px) rotate(${(Math.random()*60-30)}deg)`;span.style.opacity='0';});setTimeout(()=>span.remove(),1700);}}

// Polaroid -> open modal with full image + note
function wirePolaroids(){
  const modalEl=document.getElementById('photoModal');
  const fullImg=document.getElementById('fullImage');
  const fullNote=document.getElementById('fullNote');
  const bsModal=modalEl?new bootstrap.Modal(modalEl):null;

  document.querySelectorAll('.polaroid').forEach(poly=>{
    const thumb=poly.querySelector('img');
    const fullSrc=poly.getAttribute('data-fullsrc')||thumb?.getAttribute('src');
    const note=poly.getAttribute('data-note')||'';

    function openModal(){
      if(!bsModal||!fullImg||!fullNote) return;
      fullImg.src=fullSrc;
      fullNote.textContent=note;
      bsModal.show();
    }

    poly.addEventListener('click',openModal);
    poly.addEventListener('keydown',(e)=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); openModal(); } });
  });
}

document.addEventListener('DOMContentLoaded', wirePolaroids);
