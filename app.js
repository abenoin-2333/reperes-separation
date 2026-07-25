const questions = [
  {
    axis: "Situation",
    text: "Où en es-tu aujourd’hui ?",
    answers: [
      { label: "Je sens que la séparation arrive.", score: 1 },
      { label: "La séparation est annoncée.", score: 2 },
      { label: "Nous sommes déjà séparés.", score: 2 },
      { label: "Une procédure est en cours.", score: 3 },
      { label: "Les problèmes continuent après séparation.", score: 3 },
    ],
  },
  {
    axis: "Enfants",
    text: "As-tu des enfants avec ton ex-conjointe ou conjointe ?",
    answers: [
      { label: "Non.", score: 0 },
      { label: "Oui, un enfant.", score: 1 },
      { label: "Oui, plusieurs enfants.", score: 2 },
      { label: "Oui, et la garde ou résidence est déjà conflictuelle.", score: 3 },
    ],
  },
  {
    axis: "Priorité",
    text: "Quelle est ta priorité principale maintenant ?",
    answers: [
      { label: "Comprendre mes droits et mes options.", score: 1 },
      { label: "Protéger la relation avec mes enfants.", score: 2 },
      { label: "Organiser mes finances et éviter les coûts inutiles.", score: 2 },
      { label: "Éviter que la situation dégénère.", score: 3 },
      { label: "Me préparer à un rendez-vous avocat ou juge.", score: 3 },
    ],
  },
  {
    axis: "Dialogue",
    text: "Le dialogue avec l’autre personne est-il possible ?",
    answers: [
      { label: "Oui, globalement.", score: 0 },
      { label: "Parfois, mais c’est instable.", score: 1 },
      { label: "Non, c’est très tendu.", score: 3 },
      { label: "Je préfère limiter les contacts.", score: 2 },
    ],
  },
  {
    axis: "Documents",
    text: "As-tu déjà rassemblé tes documents importants ?",
    answers: [
      { label: "Oui, tout est classé.", score: 0 },
      { label: "Une partie seulement.", score: 1 },
      { label: "Non, je ne sais pas quoi préparer.", score: 2 },
      { label: "Certains documents sont difficiles à récupérer.", score: 3 },
    ],
  },
  {
    axis: "Logement",
    text: "Le logement est-il un sujet sensible ?",
    answers: [
      { label: "Non.", score: 0 },
      { label: "Oui, nous vivons encore ensemble.", score: 2 },
      { label: "Oui, je suis parti ou je dois partir.", score: 2 },
      { label: "Oui, il y a un crédit ou un bail commun.", score: 3 },
    ],
  },
  {
    axis: "Finances",
    text: "Les finances sont-elles déjà un sujet de tension ?",
    answers: [
      { label: "Non.", score: 0 },
      { label: "Oui, un peu.", score: 1 },
      { label: "Oui, fortement : pension, prestation, avocat ou partage.", score: 3 },
      { label: "Je ne sais pas encore ce que je risque.", score: 2 },
    ],
  },
  {
    axis: "Coûts",
    text: "As-tu déjà une vision du coût et du temps que la procédure peut demander ?",
    answers: [
      { label: "Oui, c’est clair et budgété.", score: 0 },
      { label: "Partiellement, mais je découvre encore.", score: 1 },
      { label: "Non, je crains les frais d’avocat et les demandes de documents.", score: 3 },
      { label: "Je suis déjà dépassé par les papiers, les coûts et les échanges.", score: 4 },
    ],
  },
  {
    axis: "Protection",
    text: "Y a-t-il des accusations, menaces ou pressions ?",
    answers: [
      { label: "Non.", score: 0 },
      { label: "Des tensions verbales seulement.", score: 1 },
      { label: "Des menaces ou accusations sont apparues.", score: 4 },
      { label: "Je crains que cela arrive.", score: 3 },
    ],
  },
  {
    axis: "Professionnels",
    text: "As-tu déjà consulté un avocat, médiateur ou professionnel ?",
    answers: [
      { label: "Non.", score: 1 },
      { label: "J’y pense.", score: 1 },
      { label: "Oui, une première fois.", score: 2 },
      { label: "Oui, mais je ne me sens pas bien préparé.", score: 3 },
    ],
  },
  {
    axis: "Urgence",
    text: "Quel niveau d’urgence ressens-tu ?",
    answers: [
      { label: "Faible : je veux anticiper.", score: 0 },
      { label: "Moyen : il faut organiser vite.", score: 1 },
      { label: "Élevé : la situation bouge rapidement.", score: 3 },
      { label: "Très élevé : je dois me protéger et agir correctement.", score: 4 },
    ],
  },
];

const results = [
  {
    max: 11,
    title: "Situation à clarifier",
    priority: "Anticiper avant que les sujets sensibles ne deviennent urgents.",
    summary:
      "Tu es dans une phase où l’anticipation peut éviter beaucoup d’erreurs. La priorité n’est pas d’agir vite, mais de comprendre les étapes, rassembler les documents et repérer les sujets qui peuvent devenir sensibles.",
    actions: [
      "Créer un dossier unique avec identité, revenus, charges, logement, crédits, assurances et documents liés aux enfants.",
      "Lister les sujets à clarifier : résidence des enfants, budget, logement, comptes communs, communication et calendrier.",
      "Écrire une chronologie courte avec les dates importantes, sans jugement ni interprétation.",
      "Préparer 5 questions concrètes avant de contacter un avocat, un médiateur ou une source officielle.",
      "Éviter les engagements écrits pris sous pression tant que les conséquences ne sont pas comprises.",
    ],
    nextSteps: [
      "Créer un dossier numérique unique avec 5 sous-dossiers : enfants, finances, logement, échanges, démarches.",
      "Noter les 3 sujets qui te préoccupent le plus aujourd’hui.",
      "Télécharger ou préparer les derniers justificatifs de revenus et charges fixes.",
    ],
    appointment:
      "Si tu consultes un professionnel, arrive avec une chronologie courte, tes questions prioritaires et les documents de base. Le but est de gagner du temps dès le premier échange.",
  },
  {
    max: 23,
    title: "Séparation active à organiser",
    priority: "Structurer rapidement les faits, les documents et les décisions à prendre.",
    summary:
      "Ta situation demande une organisation stricte. Les décisions, messages et documents des prochaines semaines peuvent compter. L’objectif est de réduire le flou avant les échanges importants.",
    actions: [
      "Classer les échanges importants par date : messages, emails, décisions sur les enfants, logement et finances.",
      "Séparer trois colonnes : faits vérifiables, demandes reçues, décisions à prendre.",
      "Préparer un budget provisoire : revenus, charges fixes, logement, frais des enfants, crédits, avocat, pension et sujets financiers à vérifier.",
      "Lister les points à aborder avec un professionnel : résidence, contribution, logement, comptes, biens, urgence.",
      "Utiliser des réponses écrites courtes, factuelles et relues à froid pour éviter d’aggraver le conflit.",
    ],
    nextSteps: [
      "Faire une chronologie en 10 lignes maximum avec les dates principales.",
      "Séparer les documents déjà disponibles de ceux qu’il faut encore récupérer.",
      "Écrire une liste de décisions ouvertes : enfants, logement, budget, comptes, prestation, communication.",
    ],
    appointment:
      "Prépare un résumé d’une page avant avocat ou médiation : situation, enfants, logement, finances, points de désaccord et questions. Plus c’est clair, plus l’échange est utile.",
  },
  {
    max: Infinity,
    title: "Situation sensible à sécuriser rapidement",
    priority: "Protéger les échanges et documenter les faits sans réagir à chaud.",
    summary:
      "Le niveau de tension ou d’urgence impose de sécuriser les faits et les échanges. La priorité est de ne pas réagir à chaud, de conserver les éléments utiles et de demander un avis qualifié si la situation est grave ou procédurale.",
    actions: [
      "Conserver les messages, emails, convocations et documents importants sans les modifier ni les commenter.",
      "Tenir un journal factuel : date, heure, lieu, personnes présentes, ce qui s’est passé, élément disponible.",
      "Éviter tout message agressif, ironique ou accusatoire ; privilégier des réponses courtes et vérifiables.",
      "Préparer immédiatement un dossier pour avocat ou médiateur : chronologie, enfants, logement, finances, coûts, échanges sensibles.",
      "En cas de danger, accusation, convocation ou urgence concernant les enfants, contacter rapidement un professionnel qualifié ou les services compétents.",
    ],
    nextSteps: [
      "Sauvegarder les messages et documents importants dans un dossier séparé.",
      "Écrire les événements sensibles sous forme factuelle : date, lieu, personnes, faits observables.",
      "Éviter toute réponse écrite sous colère ; faire relire si nécessaire avant envoi.",
    ],
    appointment:
      "Dans une situation sensible, ne cherche pas à tout régler seul. Prépare les pièces, reste factuel et demande rapidement un avis professionnel adapté à l’urgence.",
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
const resultSummary = document.querySelector("#resultSummary");
const resultPriority = document.querySelector("#resultPriority");
const resultActions = document.querySelector("#resultActions");
const resultNextSteps = document.querySelector("#resultNextSteps");
const resultAppointment = document.querySelector("#resultAppointment");
const restartButton = document.querySelector("#restartButton");
const emailInput = document.querySelector("#emailInput");
const emailButton = document.querySelector("#emailButton");
const emailMessage = document.querySelector("#emailMessage");
const questionButton = document.querySelector("#questionButton");
const questionMessage = document.querySelector("#questionMessage");
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

function computeScore() {
  return selectedAnswers.reduce((total, answerIndex, questionIndex) => {
    if (answerIndex === null) return total;
    return total + questions[questionIndex].answers[answerIndex].score;
  }, 0);
}

function showResult() {
  const score = computeScore();
  const result = results.find((item) => score <= item.max);

  resultTitle.textContent = result.title;
  resultSummary.textContent = result.summary;
  resultPriority.textContent = result.priority;
  resultActions.innerHTML = "";
  result.actions.forEach((action) => {
    const item = document.createElement("li");
    item.textContent = action;
    resultActions.append(item);
  });
  resultNextSteps.innerHTML = "";
  result.nextSteps.forEach((step) => {
    const item = document.createElement("li");
    item.textContent = step;
    resultNextSteps.append(item);
  });
  resultAppointment.textContent = result.appointment;

  form.classList.add("hidden");
  resultCard.classList.remove("hidden");
  progressBar.style.width = "100%";
  resultCard.scrollIntoView({ behavior: "smooth", block: "start" });
}

function goNext() {
  if (selectedAnswers[currentStep] === null) return;
  if (currentStep === questions.length - 1) {
    showResult();
    return;
  }
  currentStep += 1;
  renderQuestion();
}

function goPrev() {
  if (currentStep === 0) return;
  currentStep -= 1;
  renderQuestion();
}

function restart() {
  currentStep = 0;
  selectedAnswers.fill(null);
  emailInput.value = "";
  emailMessage.textContent = "";
  resultCard.classList.add("hidden");
  form.classList.remove("hidden");
  renderQuestion();
}

function captureEmail() {
  const email = emailInput.value.trim();
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!isValid) {
    emailMessage.textContent = "Entre un email valide pour recevoir la checklist.";
    return;
  }

  localStorage.setItem(
    "reprendre-les-faits-lead",
    JSON.stringify({
      email,
      score: computeScore(),
      createdAt: new Date().toISOString(),
    }),
  );

  emailMessage.textContent =
    "Email enregistré. Tu peux déjà consulter la checklist gratuite via le lien ci-dessous.";
}

function captureQuestion() {
  const name = document.querySelector("#nameInput").value.trim();
  const email = document.querySelector("#contactEmailInput").value.trim();
  const situation = document.querySelector("#situationInput").value;
  const topic = document.querySelector("#topicInput").value;
  const message = document.querySelector("#messageInput").value.trim();
  const consent = document.querySelector("#consentInput").checked;
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!isValidEmail || !situation || !topic || message.length < 20 || !consent) {
    questionMessage.textContent =
      "Complète l’email, la situation, le sujet, une question d’au moins 20 caractères et la case de confirmation.";
    return;
  }

  localStorage.setItem(
    "reperes-separation-question",
    JSON.stringify({
      name,
      email,
      situation,
      topic,
      message,
      createdAt: new Date().toISOString(),
    }),
  );

  questionMessage.textContent =
    "Question enregistrée. Nous reviendrons vers toi si une réponse ou un échange peut t’aider.";
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
    "Ce repère illustre seulement des heures possibles de préparation et de traitement. Il ne concerne ni pension, ni prestation compensatoire, ni partage, ni notaire, ni autres frais.";
}

function updateCompensationSignal() {
  if (!yourIncome || !otherIncome || !compensationLevel) return;

  const userIncome = Math.max(0, Number(yourIncome.value) || 0);
  const partnerIncome = Math.max(0, Number(otherIncome.value) || 0);
  const monthlyGap = Math.max(0, userIncome - partnerIncome);
  const annualGap = monthlyGap * 12;
  const gapRatio = userIncome > 0 ? monthlyGap / userIncome : 0;
  const years = Math.max(0, Number(marriageYears.value) || 0);
  const careerScore = Number(careerImpact.value);
  const assetScore = Number(assetComplexity.value);
  const childrenScore = Number(childrenImpact.value);
  const yearsScore = Math.min(4, Math.floor(years / 5));

  let score = 0;
  if (monthlyGap >= 1500) score += 1;
  if (monthlyGap >= 3000) score += 1;
  if (gapRatio >= 0.55) score += 1;
  score += yearsScore;
  score += careerScore;
  score += assetScore;
  score += childrenScore === 2 ? 1 : 0;

  const drivers = [];
  if (monthlyGap > 0) {
    drivers.push(
      `Écart de revenus : environ ${formatEuros(monthlyGap)} par mois, soit ${formatEuros(annualGap)} par an.`,
    );
  } else {
    drivers.push("Pas d’écart de revenus renseigné dans ce sens : ce facteur ne tire pas le dossier vers le haut ici.");
  }
  if (years > 0) drivers.push(`Durée renseignée : ${years} an${years > 1 ? "s" : ""} de mariage.`);
  if (years >= 10) drivers.push("Durée du mariage importante : ce point peut peser davantage dans l’analyse.");
  if (years > 0 && years < 5) drivers.push("Mariage court : ce point doit être présenté factuellement, sans en déduire seul une conclusion.");
  if (careerScore === 2) drivers.push("Arrêt d’activité ou sacrifice professionnel important : facteur à documenter précisément.");
  if (careerScore === 0) drivers.push("Pas de sacrifice professionnel identifié : ce point peut réduire la pression sur ce facteur.");
  if (assetScore === 2) drivers.push("Patrimoine, logement ou retraite complexes : il faut préparer les pièces avant toute discussion chiffrée.");
  if (childrenScore === 2) drivers.push("Enfants et pension déjà sensibles : à séparer clairement de la prestation compensatoire.");

  if (score <= 2) {
    compensationLevel.textContent = "Peu de facteurs renseignés à ce stade";
    compensationSummary.textContent =
      "Les informations saisies servent seulement à préparer la discussion. Il faut vérifier les documents, le patrimoine et les choix faits pendant le mariage avec un professionnel qualifié.";
  } else if (score <= 5) {
    compensationLevel.textContent = "Plusieurs facteurs à documenter";
    compensationSummary.textContent =
      "Plusieurs éléments peuvent nécessiter des justificatifs. La priorité est de préparer les faits, les hypothèses et les questions avant toute discussion chiffrée.";
  } else {
    compensationLevel.textContent = "Préparation renforcée recommandée";
    compensationSummary.textContent =
      "Plusieurs facteurs doivent être documentés avec prudence. Ce résultat ne dit pas ce qui est dû ou probable : il indique seulement qu’il faut arriver avec chiffres, chronologie et questions préparées.";
  }

  compensationDrivers.innerHTML = "";
  drivers.forEach((driver) => {
    const item = document.createElement("li");
    item.textContent = driver;
    compensationDrivers.append(item);
  });
}

nextButton?.addEventListener("click", goNext);
prevButton?.addEventListener("click", goPrev);
restartButton?.addEventListener("click", restart);
emailButton?.addEventListener("click", captureEmail);
questionButton?.addEventListener("click", captureQuestion);
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
