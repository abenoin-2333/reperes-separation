(() => {
  "use strict";
  const form = document.querySelector("#intakeForm");
  if (!form) return;
  const $ = (id) => document.getElementById(id);
  const config = window.POINT_SEPARATION_CONTACT || {};
  const safeUrl = (value) => {
    try {
      const url = new URL(value);
      return url.protocol === "https:" && !url.username && !url.password ? url.href : "";
    } catch { return ""; }
  };
  const webhook = safeUrl(config.webhookUrl);
  const external = safeUrl(config.formUrl);
  const privacy = safeUrl(config.privacyNoticeUrl);
  const remote = config.mode === "webhook" && Boolean(webhook && privacy);
  let sending = false;
  let sent = false;
  let draft = null;
  let requestId = "";
  const errors = [
    ["contactEmail", "emailError"], ["situation", "situationError"],
    ["subject", "subjectError"], ["questionText", "questionError"],
    ["urgency", "urgencyError"], ["scopeConsent", "scopeError"],
    ["dataConsent", "dataError"],
  ];

  $("intakeFields").disabled = false;
  if (remote) {
    $("modeNotice").textContent = "Relis ta question avant de confirmer l’envoi. Aucune réponse immédiate ni aucun délai de traitement ne sont garantis.";
    $("contactEmail").required = true;
    $("emailOptional").textContent = "";
    $("emailHelp").textContent = "Pour te recontacter au sujet de cette demande.";
    $("remoteConsent").hidden = false;
    $("dataConsent").required = true;
    $("privacyNoticeLink").href = privacy;
  } else if (config.mode === "external" && external) {
    $("externalDestination").hidden = false;
    $("externalLink").href = external;
    $("modeNotice").textContent = "Tu peux utiliser le formulaire de contact ou préparer ici un brouillon à partager. Rien n’est envoyé depuis cette page.";
  }

  function urgencyChanged() {
    $("urgentNotice").hidden = $("urgency").value !== "danger";
  }
  $("urgency").addEventListener("change", urgencyChanged);
  $("questionText").addEventListener("input", () => {
    $("questionCount").textContent = `${$("questionText").value.length} / 2 000`;
  });

  function validate() {
    const messages = new Map();
    const email = $("contactEmail");
    email.value = email.value.trim();
    if ((remote && !email.value) || !email.validity.valid) messages.set("contactEmail", "Indique une adresse email valide.");
    if (!$("situation").value) messages.set("situation", "Choisis ta situation actuelle.");
    if (!$("subject").value) messages.set("subject", "Choisis le sujet principal.");
    const length = $("questionText").value.trim().length;
    if (length < 20 || length > 2000) messages.set("questionText", "Écris une question de 20 à 2 000 caractères.");
    if (!$("urgency").value) messages.set("urgency", "Précise ton échéance.");
    if (!$("scopeConsent").checked) messages.set("scopeConsent", "Confirme que tu as compris le cadre de cette aide.");
    if (remote && !$("dataConsent").checked) messages.set("dataConsent", "Ton accord est nécessaire pour transmettre la demande.");
    const summary = $("errorSummary");
    summary.replaceChildren();
    for (const [id, errorId] of errors) {
      $(errorId).textContent = messages.get(id) || "";
      $(id).setAttribute("aria-invalid", messages.has(id) ? "true" : "false");
    }
    summary.hidden = messages.size === 0;
    if (messages.size) {
      const heading = document.createElement("p");
      heading.textContent = "Il reste quelques éléments à compléter :";
      const list = document.createElement("ul");
      for (const [id, message] of messages) {
        const item = document.createElement("li");
        const link = document.createElement("a");
        link.href = `#${id}`;
        link.textContent = message;
        link.addEventListener("click", () => $(id).focus());
        item.append(link);
        list.append(item);
      }
      summary.append(heading, list);
      summary.focus();
      return false;
    }
    return true;
  }

  function selectionLabel(id) {
    return $(id).selectedOptions[0].textContent;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (sending || !validate()) return;
    draft = {
      email: $("contactEmail").value.trim(),
      situation: $("situation").value,
      subject: $("subject").value,
      question: $("questionText").value.trim(),
      urgency: $("urgency").value,
      scopeConsent: true,
      dataConsent: remote && $("dataConsent").checked,
      consentVersion: "2026-09-09",
    };
    requestId = crypto.randomUUID();
    sent = false;
    $("draftText").value = [
      "Ma question - Point Séparation",
      ...(draft.email ? [`Email : ${draft.email}`] : []),
      `Situation : ${selectionLabel("situation")}`,
      `Sujet : ${selectionLabel("subject")}`,
      `Échéance : ${selectionLabel("urgency")}`,
      "", draft.question,
    ].join("\n");
    $("reviewHelp").textContent = draft.urgency === "danger"
      ? "En cas de danger immédiat, appelle le 17 ou le 112. Le brouillon reste disponible, mais ce formulaire ne transmet pas les urgences."
      : "Ce brouillon n’a pas été envoyé. Tu choisis si tu souhaites le conserver ou le partager.";
    $("sendQuestion").hidden = !remote || draft.urgency === "danger";
    $("sendQuestion").disabled = false;
    $("sendQuestion").textContent = "Envoyer ma question";
    $("submissionStatus").textContent = "";
    form.hidden = true;
    $("draftReview").hidden = false;
    $("reviewTitle").focus();
  });

  $("editDraft").addEventListener("click", () => {
    if (sending) return;
    if (sent) clear();
    else {
      $("draftReview").hidden = true;
      form.hidden = false;
      $("questionText").focus();
    }
  });

  function clear() {
    if (sending) return;
    form.reset();
    draft = null;
    requestId = "";
    sent = false;
    $("draftText").value = "";
    $("submissionStatus").textContent = "";
    $("editDraft").textContent = "Modifier";
    $("draftReview").hidden = true;
    $("errorSummary").hidden = true;
    $("questionCount").textContent = "0 / 2 000";
    errors.forEach(([id, errorId]) => { $(id).removeAttribute("aria-invalid"); $(errorId).textContent = ""; });
    urgencyChanged();
    form.hidden = false;
    $("situation").focus();
  }
  $("clearDraft").addEventListener("click", clear);

  $("copyDraft").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText($("draftText").value);
      $("submissionStatus").textContent = "Brouillon copié. Rien n’a été envoyé par cette action.";
    } catch {
      $("draftText").focus();
      $("draftText").select();
      $("submissionStatus").textContent = "La copie automatique n’est pas disponible. Le texte est sélectionné ; tu peux le copier ou le télécharger.";
    }
  });
  $("downloadDraft").addEventListener("click", () => {
    const url = URL.createObjectURL(new Blob([$("draftText").value], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "ma-question-point-separation.txt";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    $("submissionStatus").textContent = "Téléchargement demandé. Ce fichier contient ton brouillon : conserve-le sur un appareil auquel tu fais confiance.";
  });

  $("sendQuestion").addEventListener("click", async () => {
    if (!remote || !draft || !draft.dataConsent || draft.urgency === "danger" || sending || sent) return;
    sending = true;
    $("sendQuestion").disabled = true;
    $("editDraft").disabled = true;
    $("sendQuestion").textContent = "Envoi en cours…";
    $("submissionStatus").textContent = "Transmission de la demande en cours.";
    const controller = new AbortController();
    const duration = Math.min(30000, Math.max(1000, Number(config.timeoutMs) || 15000));
    const timeout = setTimeout(() => controller.abort(), duration);
    try {
      const response = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "omit",
        referrerPolicy: "no-referrer",
        redirect: "error",
        cache: "no-store",
        signal: controller.signal,
        body: JSON.stringify({ ...draft, requestId, submittedAt: new Date().toISOString() }),
      });
      // Only an explicit acknowledgement may produce a receipt confirmation.
      if (!response.ok) throw new Error("unconfirmed");
      const receipt = await response.json();
      if (receipt.accepted !== true || receipt.requestId !== requestId) throw new Error("unconfirmed");
      sent = true;
      $("submissionStatus").textContent = "Le service de réception a confirmé ta demande. Cela ne garantit ni une réponse ni un délai de traitement.";
      $("sendQuestion").textContent = "Demande transmise";
      $("reviewHelp").textContent = "Ta demande a été transmise. Tu peux conserver une copie de ton récapitulatif.";
      $("editDraft").textContent = "Préparer une autre question";
    } catch {
      $("submissionStatus").textContent = "La réception n’a pas pu être confirmée. Ton brouillon reste disponible. Une transmission a pu avoir lieu : évite de multiplier les envois. Tu peux copier ou télécharger ta question.";
      $("sendQuestion").textContent = "Réessayer l’envoi";
    } finally {
      clearTimeout(timeout);
      sending = false;
      $("sendQuestion").disabled = sent;
      $("editDraft").disabled = false;
    }
  });
})();
