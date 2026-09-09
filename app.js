const questions = [
  {
    axis: "Situation",
    text: "Où en es-tu aujourd’hui ?",
    answers: [
      { label: "Je sens que la séparation arrive." },
      { label: "La séparation est annoncée." },
      { label: "Nous sommes déjà séparés." },
      { label: "Une procédure est en cours." },
      { label: "Les problèmes continuent après séparation." },
    ],
  },
  {
    axis: "Enfants",
    text: "As-tu des enfants avec la personne dont tu te sépares ?",
    answers: [
      { label: "Non." },
      { label: "Oui, un enfant." },
      { label: "Oui, plusieurs enfants." },
      { label: "Oui, et la garde ou résidence est déjà conflictuelle." },
    ],
  },
  {
    axis: "Priorité",
    text: "Quelle est ta priorité principale maintenant ?",
    answers: [
      { label: "Comprendre mes droits et mes options." },
      { label: "Protéger la relation avec mes enfants." },
      { label: "Organiser mes finances et éviter les coûts inutiles." },
      { label: "Éviter que la situation dégénère." },
      { label: "Me préparer à un rendez-vous avocat ou juge." },
    ],
  },
  {
    axis: "Dialogue",
    text: "Le dialogue avec l’autre personne est-il possible ?",
    answers: [
      { label: "Oui, globalement." },
      { label: "Parfois, mais c’est instable." },
      { label: "Non, c’est très tendu." },
      { label: "Je préfère limiter les contacts." },
    ],
  },
  {
    axis: "Documents",
    text: "As-tu déjà rassemblé tes documents importants ?",
    answers: [
      { label: "Oui, tout est classé." },
      { label: "Une partie seulement." },
      { label: "Non, je ne sais pas quoi préparer." },
      { label: "Certains documents sont difficiles à récupérer." },
    ],
  },
  {
    axis: "Logement",
    text: "Le logement est-il un sujet sensible ?",
    answers: [
      { label: "Non." },
      { label: "Oui, nous vivons encore ensemble." },
      { label: "Oui, je suis parti ou je dois partir." },
      { label: "Oui, il y a un crédit ou un bail commun." },
    ],
  },
  {
    axis: "Finances",
    text: "Les finances sont-elles déjà un sujet de tension ?",
    answers: [
      { label: "Non." },
      { label: "Oui, un peu." },
      { label: "Oui, fortement : pension, prestation, avocat ou partage." },
      { label: "Je ne sais pas encore ce que je risque." },
    ],
  },
  {
    axis: "Coûts",
    text: "As-tu déjà une vision du coût et du temps que la procédure peut demander ?",
    answers: [
      { label: "Oui, c’est clair et budgété." },
      { label: "Partiellement, mais je découvre encore." },
      { label: "Non, je crains les frais d’avocat et les demandes de documents." },
      { label: "Je suis déjà dépassé par les papiers, les coûts et les échanges." },
    ],
  },
  {
    axis: "Protection",
    text: "Y a-t-il des accusations, menaces ou pressions ?",
    answers: [
      { label: "Non." },
      { label: "Des tensions verbales." },
      { label: "Des menaces ou accusations sont apparues." },
      { label: "Je crains que cela arrive." },
    ],
  },
  {
    axis: "Professionnels",
    text: "As-tu déjà consulté un avocat, médiateur ou professionnel ?",
    answers: [
      { label: "Non." },
      { label: "J’y pense." },
      { label: "Oui, une première fois." },
      { label: "Oui, mais je ne me sens pas bien préparé." },
    ],
  },
  {
    axis: "Urgence",
    text: "Quel niveau d’urgence ressens-tu ?",
    answers: [
      { label: "Faible : je veux anticiper." },
      { label: "Moyen : il faut organiser vite." },
      { label: "Élevé : la situation bouge rapidement." },
      { label: "Très élevé : je dois me protéger et agir correctement." },
    ],
  },
];

let currentStep = 0;
const selectedAnswers = new Array(questions.length).fill(null);

const form = document.querySelector("#diagnosticForm");
const resultCard = document.querySelector("#resultCard");
const progressBar = document.querySelector("#progressBar");
const stepText = document.querySelector("#stepText");
const axisText = document.querySelector("#axisText");
const questionTitle = document.querySelector("#questionTitle");
const answersEl = document.querySelector("#answers");
const prevButton = document.querySelector("#prevButton");
const nextButton = document.querySelector("#nextButton");
const resultTitle = document.querySelector("#resultTitle");
const restartButton = document.querySelector("#restartButton");
const lawyerRate = document.querySelector("#lawyerRate");
const lawyerHours = document.querySelector("#lawyerHours");
const documentComplexity = document.querySelector("#documentComplexity");
const lawyerEstimate = document.querySelector("#lawyerEstimate");
const lawyerEstimateText = document.querySelector("#lawyerEstimateText");
const yourIncome = document.querySelector("#yourIncome");
const otherIncome = document.querySelector("#otherIncome");
const marriageYears = document.querySelector("#marriageYears");
const careerImpact = document.querySelector("#careerImpact");
const assetComplexity = document.querySelector("#assetComplexity");
const childrenImpact = document.querySelector("#childrenImpact");
const compensationLevel = document.querySelector("#compensationLevel");
const compensationSummary = document.querySelector("#compensationSummary");
const compensationDrivers = document.querySelector("#compensationDrivers");

function renderQuestion() {
  const question = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  progressBar.style.width = `${progress}%`;
  stepText.textContent = `Question ${currentStep + 1} sur ${questions.length}`;
  axisText.textContent = question.axis;
  questionTitle.textContent = question.text;
  prevButton.disabled = currentStep === 0;
  nextButton.textContent = currentStep === questions.length - 1 ? "Voir mon résultat" : "Continuer";
  nextButton.disabled = selectedAnswers[currentStep] === null;

  answersEl.innerHTML = "";
  question.answers.forEach((answer, index) => {
    const id = `answer-${currentStep}-${index}`;
    const label = document.createElement("label");
    label.className = "answer-option";
    label.setAttribute("for", id);

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "answer";
    input.id = id;
    input.value = String(index);
    input.checked = selectedAnswers[currentStep] === index;

    input.addEventListener("change", () => {
      selectedAnswers[currentStep] = index;
      nextButton.disabled = false;
    });

    const span = document.createElement("span");
    span.textContent = answer.label;

    label.append(input, span);
    answersEl.append(label);
  });
}

function showResult() {
  window.renderPreparation(selectedAnswers, questions);
  form.classList.add("hidden");
  resultCard.classList.remove("hidden");
  progressBar.style.width = "100%";
  resultTitle.focus();
}

function goNext() {
  if (selectedAnswers[currentStep] === null) return;
  if (currentStep === questions.length - 1) {
    showResult();
    return;
  }
  currentStep += 1;
  renderQuestion();
  questionTitle.focus();
}

function goPrev() {
  if (currentStep === 0) return;
  currentStep -= 1;
  renderQuestion();
  questionTitle.focus();
}

function restart() {
  currentStep = 0;
  selectedAnswers.fill(null);
  resultCard.classList.add("hidden");
  form.classList.remove("hidden");
  renderQuestion();
  questionTitle.focus();
}

function formatEuros(amount) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function updateLawyerEstimate() {
  if (!lawyerRate || !lawyerHours || !documentComplexity) return;

  const rate = Number(lawyerRate.value);
  const hours = Number(lawyerHours.value);
  const extraHours = Number(documentComplexity.value);
  const base = rate * hours;
  const withComplexity = rate * (hours + extraHours);

  lawyerEstimate.textContent =
    base === withComplexity
      ? formatEuros(base)
      : `${formatEuros(base)} à ${formatEuros(withComplexity)}`;
  lawyerEstimateText.textContent =
    `Calcul : ${rate} € × ${hours} h${extraHours ? `, puis ${rate} € × (${hours} + ${extraHours}) h` : ""}. Ce scénario exclut pension, prestation, partage, notaire et autres frais. Il ne prédit pas les heures nécessaires.`;
}

function updateCompensationSignal() {
  if (!yourIncome || !otherIncome || !compensationLevel) return;

  const fields = [yourIncome, otherIncome, marriageYears];
  const invalid = fields.some(field => field.value !== "" && !field.validity.valid);
  compensationDrivers.replaceChildren();
  if (invalid) {
    compensationLevel.textContent = "Vérifie les valeurs saisies";
    compensationSummary.textContent = "Renseigne des revenus positifs ou nuls et une durée de mariage entre 0 et 60 années complètes.";
    return;
  }
  const drivers = [];
  const knownIncomes = yourIncome.value !== "" && otherIncome.value !== "";
  if (knownIncomes) {
    const gap = Math.abs(Number(yourIncome.value) - Number(otherIncome.value));
    drivers.push(`Écart arithmétique entre les deux revenus renseignés : ${formatEuros(gap)} par mois. Ce chiffre ne détermine ni un droit ni un montant à verser.`);
  } else {
    drivers.push("Revenus : réunir les justificatifs disponibles pour chacun, en distinguant revenus réguliers et variables. Une donnée manquante n’est pas un revenu nul.");
  }
  if (marriageYears.value !== "") {
    const years = Number(marriageYears.value);
    drivers.push(`Durée renseignée : ${years} an${years > 1 ? "s" : ""} de mariage. Noter les dates exactes à partir des documents ; la durée de vie commune ne se confond pas avec celle du mariage.`);
  } else drivers.push("Durée : retrouver la date du mariage et les dates utiles au dossier.");
  const career = {
    "0": "Parcours professionnel : noter la situation de chacun et les évolutions connues, même sans arrêt d’activité identifié.",
    "1": "Parcours professionnel à clarifier : lister les périodes d’emploi, de temps partiel ou d’interruption et les justificatifs disponibles.",
    "2": "Changement professionnel important déclaré : décrire les dates, le contexte et les conséquences, sans en déduire une indemnisation."
  };
  drivers.push(career[careerImpact.value]);
  drivers.push(assetComplexity.value === "2"
    ? "Patrimoine, logement et retraite : séparer les biens, crédits et droits connus des évaluations à faire vérifier."
    : "Patrimoine et retraite : réunir les informations disponibles et noter ce qui reste inconnu.");
  if (childrenImpact.value !== "0") drivers.push("Enfants : classer leurs besoins, les frais et les contributions séparément de la question d’une prestation entre époux.");
  drivers.push("Questions au professionnel : quels autres éléments sont nécessaires, notamment l’âge, la santé, les besoins et les perspectives de chaque époux ?");
  compensationLevel.textContent = "Ta liste de préparation";
  compensationSummary.textContent = "Aucun score ni montant de prestation n’est calculé. Ces pistes servent à organiser les informations, pas à décider si une prestation est due.";
  for (const driver of drivers) {
    const item = document.createElement("li");
    item.textContent = driver;
    compensationDrivers.append(item);
  }
}

nextButton?.addEventListener("click", goNext);
prevButton?.addEventListener("click", goPrev);
restartButton?.addEventListener("click", restart);
form?.addEventListener("submit", (event) => { event.preventDefault(); goNext(); });
lawyerRate?.addEventListener("change", updateLawyerEstimate);
lawyerHours?.addEventListener("change", updateLawyerEstimate);
documentComplexity?.addEventListener("change", updateLawyerEstimate);
yourIncome?.addEventListener("input", updateCompensationSignal);
otherIncome?.addEventListener("input", updateCompensationSignal);
marriageYears?.addEventListener("input", updateCompensationSignal);
marriageYears?.addEventListener("change", updateCompensationSignal);
careerImpact?.addEventListener("change", updateCompensationSignal);
assetComplexity?.addEventListener("change", updateCompensationSignal);
childrenImpact?.addEventListener("change", updateCompensationSignal);

if (form) renderQuestion();
updateLawyerEstimate();
updateCompensationSignal();

// Financial fields are local preparation tools, never submission forms.
document.querySelectorAll(".estimator-form, .compensation-form").forEach(form => {
  form.addEventListener("submit", event => event.preventDefault());
});
