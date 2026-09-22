(() => {
  "use strict";
  const menuButton = document.querySelector(".site-menu-toggle");
  const navigation = document.getElementById("main-navigation");
  if (menuButton && navigation) {
    const compact = matchMedia("(max-width: 620px)");
    const setOpen = open => {
      navigation.hidden = !open;
      menuButton.setAttribute("aria-expanded", String(open));
    };
    const resetMenu = () => {
      menuButton.hidden = !compact.matches;
      setOpen(!compact.matches);
    };
    resetMenu();
    compact.addEventListener("change", resetMenu);
    menuButton.addEventListener("click", () => setOpen(navigation.hidden));
    navigation.addEventListener("click", event => {
      if (compact.matches && event.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && compact.matches && !navigation.hidden) {
        setOpen(false);
        menuButton.focus();
      }
    });
    document.addEventListener("click", event => {
      if (compact.matches && !event.target.closest(".site-header")) setOpen(false);
    });
  }

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
