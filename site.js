(() => {
  "use strict";
  const revealAnchor = () => {
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    const target = document.getElementById(id);
    if (!target) return;
    let node = target;
    while (node) { if (node.tagName === "DETAILS") node.open = true; node = node.parentElement; }
    if (target.closest('details')) requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }));
  };
  if (/\/(?:index\.html)?$/.test(location.pathname)) {
    const destinations = {
      "#diagnostic": "diagnostic.html", "#agent": "diagnostic.html",
      "#enfants": "enfants.html", "#methode": "methode.html", "#kit": "kit.html",
      "#pourquoi": "pourquoi.html", "#finances": "finances.html", "#parcours": "parcours.html",
    };
    const followAnchor = () => { if (destinations[location.hash]) location.replace(destinations[location.hash]); };
    followAnchor(); window.addEventListener("hashchange", followAnchor);
  }
  revealAnchor(); window.addEventListener("hashchange", revealAnchor);
})();
