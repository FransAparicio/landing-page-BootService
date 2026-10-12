(() => {
  const toggle = document.querySelector('#mobile-toggle');
  const mobile = document.querySelector('#mobile-nav');
  function closeMenu(){mobile.classList.add('hidden');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menú');toggle.textContent='☰';}
  toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';mobile.classList.toggle('hidden',open);toggle.setAttribute('aria-expanded',String(!open));toggle.setAttribute('aria-label',open?'Abrir menú':'Cerrar menú');toggle.textContent=open?'☰':'×';});
  mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  const slides=[...document.querySelectorAll('.hero-slide')];const dots=[...document.querySelectorAll('.slide-dot')];const hero=document.querySelector('.hero');let index=0,timer;
  function show(n){index=(n+slides.length)%slides.length;slides.forEach((s,i)=>{const active=i===index;s.classList.toggle('active',active);s.setAttribute('aria-hidden',String(!active));s.querySelectorAll('a').forEach(a=>a.tabIndex=active?0:-1);});dots.forEach((d,i)=>{d.classList.toggle('selected',i===index);d.setAttribute('aria-selected',String(i===index));});}
  const restart=()=>{clearInterval(timer);if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)timer=setInterval(()=>show(index+1),6500);};
  document.querySelector('#slide-prev').addEventListener('click',()=>{show(index-1);restart();});document.querySelector('#slide-next').addEventListener('click',()=>{show(index+1);restart();});dots.forEach(d=>d.addEventListener('click',()=>{show(Number(d.dataset.go));restart();}));
  hero.addEventListener('mouseenter',()=>clearInterval(timer));hero.addEventListener('mouseleave',restart);hero.addEventListener('focusin',()=>clearInterval(timer));hero.addEventListener('focusout',e=>{if(!hero.contains(e.relatedTarget))restart();});show(0);restart();
  document.querySelector('#year').textContent=String(new Date().getFullYear());
  const select=document.querySelector('#servicio');
  if(window.jQuery&&window.jQuery.fn&&window.jQuery.fn.select2&&select){window.jQuery(select).select2({placeholder:'Selecciona una opción',minimumResultsForSearch:Infinity,width:'100%'});}
  const form=document.querySelector('#contact-form');form.addEventListener('submit',e=>{e.preventDefault();const name=form.elements.namedItem("nombre").value.trim();const service=form.elements.namedItem("servicio").value;const msg=form.elements.namedItem("mensaje").value.trim();const status=document.querySelector('#form-status');if(!name||!service||!msg){status.textContent='Completa los tres campos para continuar.';return;}status.textContent='Se abrirá WhatsApp con tu consulta.';const body=`Hola BootService Store, soy ${name}.\nServicio: ${service}.\nConsulta: ${msg}`;window.open(`https://wa.me/59178225111?text=${encodeURIComponent(body)}`,'_blank','noopener,noreferrer');});
})();
