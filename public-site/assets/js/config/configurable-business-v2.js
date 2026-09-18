(() => {
  "use strict";
  const clean=value=>String(value||"").replace(/\s+/g," ").trim();
  const money=(value,currency="USD")=>new Intl.NumberFormat("en-US",{style:"currency",currency,maximumFractionDigits:0}).format(Number(value||0));

  function start(){
    const config=window.BOOKSY_PORTAL_CONFIG;
    if(!config){ document.addEventListener("booksy-portal-config-ready",start,{once:true}); return; }
    const business=config.business, provider=config.bookingProvider;
    const services=[...config.services].filter(s=>s.active!==false).sort((a,b)=>(a.sortOrder||0)-(b.sortOrder||0));

    document.title=document.title.replace(/Headlines/gi,business.name);
    document.querySelectorAll("img").forEach(img=>{
      if(/headlines-logo|proud-pops/i.test(img.src)) img.src=config.brand.logo;
      if(/headlines-hero/i.test(img.src)) img.src=config.brand.heroImage;
      if(/Headlines|Proud Pops/i.test(img.alt||"")) img.alt=`${business.name} logo`;
    });
    document.querySelectorAll("a[href]").forEach(link=>{
      const text=clean(link.textContent).toLowerCase();
      if(link.href.startsWith("tel:") || /call/.test(text)) link.href=`tel:${business.phoneHref||business.phone||""}`;
      if(/directions/.test(text) || /google\.com\/maps/.test(link.href)) link.href=business.mapsUrl||link.href;
      if(/facebook\.com/.test(link.href)) link.href=business.facebookUrl||link.href;
      if(/booksy\.com/.test(link.href)) link.href=provider.profileUrl;
    });

    const serviceSelects=document.querySelectorAll("select[data-booking-service],select[data-service-select],select[name='service']");
    serviceSelects.forEach(select=>{
      const requested=new URLSearchParams(location.search).get("service")||select.value||services[0]?.slug;
      select.innerHTML="";
      services.forEach(s=>select.add(new Option(`${s.displayName||s.name} · ${s.durationMinutes} min · ${money(s.price,business.currency)}`,s.slug)));
      select.value=services.some(s=>s.slug===requested)?requested:services[0]?.slug;
      select.dispatchEvent(new Event("change",{bubbles:true}));
    });

    document.querySelectorAll("footer").forEach(footer=>{
      const hoursHeading=[...footer.querySelectorAll("h2,h3,h4,strong")].find(h=>clean(h.textContent).toLowerCase()==="business hours");
      const panel=hoursHeading?.closest("section,article,aside,[class*='col'],[class*='column']")||hoursHeading?.parentElement;
      if(panel && config.hours){
        panel.innerHTML=`<h3>Business Hours</h3><div class="cbv2-hours">${config.hours.map(row=>`<div><span>${row.day}</span><strong>${row.closed?"Closed":`${row.open}–${row.close}`}</strong></div>`).join("")}</div>`;
      }
    });

    if(/contact\.html$/i.test(location.pathname)){
      document.querySelectorAll("main address,main p,main a").forEach(el=>{
        if(el.children.length) return;
        if(/Williamson|Salem|Roanoke.*VA/i.test(el.textContent)&&/\d{3,5}/.test(el.textContent)) el.textContent=(business.addressLines||[]).join(", ");
      });
    }

    const gallery=config.gallery||[];
    if(/gallery\.html$/i.test(location.pathname)&&gallery.length){
      const main=document.querySelector("main");
      const old=main?.querySelector("[class*='gallery-grid'],[class*='work-grid']");
      const grid=document.createElement("div"); grid.className="cbv2-gallery";
      grid.innerHTML=gallery.map((img,i)=>`<figure><button data-cbv2-gallery="${i}"><img src="${img.src}" alt="${img.alt}" loading="lazy"></button><figcaption>${img.caption||""}</figcaption></figure>`).join("");
      if(old) old.replaceWith(grid); else main?.appendChild(grid);
    }

    if(/(?:index\.html)?$/.test(location.pathname)&&gallery.length>=3){
      const heading=[...document.querySelectorAll("main h2")].find(h=>/detail you can see/i.test(h.textContent));
      const section=heading?.closest("section");
      if(section){
        const old=section.querySelector("[class*='gallery']");
        const grid=document.createElement("div"); grid.className="cbv2-home-gallery";
        grid.innerHTML=gallery.slice(0,3).map(img=>`<a href="/gallery.html"><img src="${img.src}" alt="${img.alt}" loading="lazy"></a>`).join("");
        old?.replaceWith(grid);
      }
    }
  }
  document.readyState==="loading"?document.addEventListener("DOMContentLoaded",start,{once:true}):start();
})();
