/* Desbloqueo de guías con email (formulario de Kajabi incrustado) */
(function(){
  var KEY='bi_guias', gate=document.getElementById('gate'); if(!gate) return;
  var form=gate.querySelector('form'); if(!form) return;
  var guia=document.body.getAttribute('data-guia')||location.pathname;
  function set(n,v){var el=form.querySelector('[name="form_submission['+n+']"]');if(el)el.value=v;return el}
  var g=set('custom_19',guia); if(g&&g.parentNode) g.parentNode.style.display='none';
  var nm=form.querySelector('[name="form_submission[name]"]'); if(nm){nm.placeholder='Tu nombre';nm.autocomplete='given-name'}
  var em=form.querySelector('[name="form_submission[email]"]'); if(em){em.placeholder='Tu email';em.autocomplete='email'}
  var sink=document.createElement('iframe'); sink.name='bi_sink'; sink.title='Envío'; sink.hidden=true; sink.setAttribute('aria-hidden','true');
  document.body.appendChild(sink); form.target='bi_sink';
  function unlock(){try{localStorage.setItem(KEY,'1')}catch(e){}
    document.documentElement.classList.remove('gated');
    var r=document.getElementById('resto'); if(r){r.setAttribute('tabindex','-1');r.focus({preventScroll:true});r.scrollIntoView({behavior:'smooth'})}}
  var done=false; function fin(){if(done)return;done=true;unlock()}
  form.addEventListener('submit',function(){
    if(form.checkValidity&&!form.checkValidity()) return;
    var b=form.querySelector('button[type=submit]'); if(b){b.textContent='Abriendo la guía…'}
    sink.addEventListener('load',fin,{once:true}); setTimeout(fin,5000);
  });
  /* Enlaces del índice a partes bloqueadas: llevan al formulario */
  document.querySelectorAll('.toc a').forEach(function(a){a.addEventListener('click',function(e){
    if(!document.documentElement.classList.contains('gated'))return;
    var t=document.querySelector(a.getAttribute('href')); if(t&&t.closest('#resto')){e.preventDefault();gate.scrollIntoView({behavior:'smooth'});if(nm)nm.focus({preventScroll:true})}
  })});
})();
