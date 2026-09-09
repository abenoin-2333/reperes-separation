'use strict';
const printButton = document.getElementById('printDossier');
printButton.hidden = false;
printButton.addEventListener('click', () => window.print());
