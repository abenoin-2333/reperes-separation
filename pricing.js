'use strict';
const allowedPrices = ['29', '49', '79'];
const proposedPrice = new URLSearchParams(window.location.search).get('price');
const initialPrice = allowedPrices.includes(proposedPrice) ? proposedPrice : '29';
const priceSelect = document.getElementById('discussionPrice');
const priceLabel = document.getElementById('packPrice');
const status = document.getElementById('interestStatus');
priceSelect.value = initialPrice;
priceLabel.textContent = initialPrice;
const evaluateButton = document.getElementById('evaluatePack');
evaluateButton.hidden = false;
evaluateButton.addEventListener('click', () => {
  document.getElementById('feedback').hidden = false;
  document.getElementById('feedbackTitle').focus();
});
priceSelect.addEventListener('change', () => { priceLabel.textContent = priceSelect.value; status.textContent = ''; });
const interestForm = document.getElementById('interestForm');
interestForm.addEventListener('input', () => { status.textContent = ''; });
interestForm.addEventListener('submit', event => {
  event.preventDefault();
  if (!interestForm.reportValidity()) return;
  const selected = interestForm.querySelector('input:checked');
  const reason = document.getElementById('choiceReason').value.trim();
  const missing = document.getElementById('missingValue').value.trim();
  status.textContent = 'À ' + priceSelect.value + ' € : ' + selected.parentElement.textContent.trim() + (reason ? ' Pourquoi : ' + reason : '') + (missing ? ' Ce qui manque : ' + missing : '') + ' Aucun avis n’a été transmis. Aucun achat ni aucune réservation n’ont été effectués.';
});
interestForm.addEventListener('reset', () => {
  status.textContent = '';
  setTimeout(() => { priceSelect.value = initialPrice; priceLabel.textContent = initialPrice; }, 0);
});
