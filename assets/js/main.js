(() => {
  const toggle = document.querySelector('#mobile-toggle');
  const mobile = document.querySelector('#mobile-nav');
  function closeMenu(){mobile.classList.add('hidden');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menú');toggle.innerHTML='<i aria-hidden="true" class="bi bi-list"></i>';}
  toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';mobile.classList.toggle('hidden',open);toggle.setAttribute('aria-expanded',String(!open));toggle.setAttribute('aria-label',open?'Abrir menú':'Cerrar menú');toggle.innerHTML=open?'<i aria-hidden="true" class="bi bi-list"></i>':'<i aria-hidden="true" class="bi bi-x"></i>';});
  mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  const slides=[...document.querySelectorAll('.hero-slide')];const dots=[...document.querySelectorAll('.slide-dot')];const hero=document.querySelector('.hero');let index=0,timer;
  function show(n){index=(n+slides.length)%slides.length;slides.forEach((s,i)=>{const active=i===index;s.classList.toggle('active',active);s.setAttribute('aria-hidden',String(!active));s.querySelectorAll('a').forEach(a=>a.tabIndex=active?0:-1);});dots.forEach((d,i)=>{d.classList.toggle('selected',i===index);d.setAttribute('aria-selected',String(i===index));});}
  const restart=()=>{clearInterval(timer);if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)timer=setInterval(()=>show(index+1),6500);};
  document.querySelector('#slide-prev').addEventListener('click',()=>{show(index-1);restart();});document.querySelector('#slide-next').addEventListener('click',()=>{show(index+1);restart();});dots.forEach(d=>d.addEventListener('click',()=>{show(Number(d.dataset.go));restart();}));
  hero.addEventListener('mouseenter',()=>clearInterval(timer));hero.addEventListener('mouseleave',restart);hero.addEventListener('focusin',()=>clearInterval(timer));hero.addEventListener('focusout',e=>{if(!hero.contains(e.relatedTarget))restart();});show(0);restart();
  document.querySelector('#year').textContent=String(new Date().getFullYear());
  const navLinks=[...document.querySelectorAll('.nav-a')];const sections=navLinks.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const spy=()=>{if(!sections.length)return;const pos=window.scrollY+120;let current=sections[0];sections.forEach(s=>{if(s.offsetTop<=pos)current=s;});navLinks.forEach(a=>a.classList.toggle('nav-a-active',a.getAttribute('href')==='#'+current.id));};
  window.addEventListener('scroll',spy,{passive:true});window.addEventListener('resize',spy);spy();
  const select=document.querySelector('#servicio');
  if(window.jQuery&&window.jQuery.fn&&window.jQuery.fn.select2&&select){
    const iconosSelect={'Equipos y accesorios':'bi-cpu','Licencias originales':'bi-shield-check','Servicio técnico':'bi-tools','Redes y cámaras':'bi-camera-video','Asesoramiento general':'bi-lightbulb'};
    const conIconos=(data)=>{if(!data.id)return data.text;const icono=iconosSelect[data.text]||'bi-chevron-right';return window.jQuery('<span><i aria-hidden="true" class="bi '+icono+'"></i> '+data.text+'</span>');};
    window.jQuery(select).select2({placeholder:'Selecciona una opción',minimumResultsForSearch:Infinity,width:'100%',templateResult:conIconos,templateSelection:conIconos});
  }
  const form=document.querySelector('#contact-form');form.addEventListener('submit',e=>{e.preventDefault();const name=form.elements.namedItem("nombre").value.trim();const service=form.elements.namedItem("servicio").value;const msg=form.elements.namedItem("mensaje").value.trim();const status=document.querySelector('#form-status');if(!name||!service||!msg){status.textContent='Completa los tres campos para continuar.';return;}status.textContent='Se abrirá WhatsApp con tu consulta.';const body=`Hola BootService Store, soy ${name}.\nServicio: ${service}.\nConsulta: ${msg}`;window.open(`https://wa.me/59178225111?text=${encodeURIComponent(body)}`,'_blank','noopener,noreferrer');});
})();
