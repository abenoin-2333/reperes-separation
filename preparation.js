/* Editorial routing, not a legal assessment. No persistence or network calls. */
(function (root) {
  'use strict';
  function buildPreparation(a, labels) {
    const children = a[1] > 0;
    const sensitive = a[3] >= 2 || a[8] > 0 || a[10] >= 2;
    const dangerSignal = a[8] === 2 || a[10] === 3;
    const money = a[6] > 0 || a[7] > 0 || a[2] === 2;
    const housing = a[5] > 0;
    const priorities = [];
    if (sensitive) priorities.push('Identifier un interlocuteur adapté aux tensions ou à l’urgence signalées.');
    if (children) priorities.push('Décrire les besoins quotidiens des enfants et les points d’organisation à clarifier.');
    if (housing) priorities.push('Préparer les questions sur le logement actuel et son coût.');
    if (money) priorities.push('Rendre visibles tes revenus, tes charges et les frais encore inconnus.');
    priorities.push('Séparer les documents disponibles des pièces manquantes.', 'Préparer un échange professionnel centré sur tes questions.', 'Mettre les dates et les faits connus dans une chronologie courte.');
    const next = [
      sensitive ? 'Contacter un professionnel ou un service d’aide adapté avant de chercher à régler les tensions seul. En cas de danger immédiat : 17 ou 112.' : 'Écrire trois questions auxquelles tu souhaites une réponse pendant le rendez-vous.',
      a[0] === 3 ? 'Noter les dates figurant sur les convocations ou courriers reçus et demander au professionnel de confirmer les échéances.' : 'Écrire une chronologie courte : situation actuelle, dates connues et événements à clarifier.',
      children ? 'Décrire une semaine habituelle des enfants : école, trajets, soins, activités et disponibilité de chaque parent, sans leur demander de choisir.' : housing ? 'Noter qui occupe le logement, le loyer ou crédit et les charges mensuelles connues.' : 'Noter tes charges fixes mensuelles et les changements de logement déjà envisagés.',
      a[4] === 0 ? 'Vérifier avec le cabinet le format et la liste des pièces attendues avant de transmettre le dossier.' : 'Créer deux listes : pièces déjà disponibles et pièces à demander. Ne cherche pas à accéder aux comptes ou documents privés de l’autre personne sans autorisation.',
      a[9] >= 2 ? 'Envoyer au professionnel, par le canal convenu, une liste courte des sujets encore ouverts et demander le coût du prochain échange.' : 'Demander au cabinet le tarif du premier rendez-vous, sa durée, les pièces attendues et les modalités de facturation.'
    ];
    const documents = ['Chronologie des faits et liste de tes questions.', 'Justificatifs personnels de revenus et de charges accessibles légalement.'];
    if (children) documents.push('Éléments pratiques concernant les enfants : calendrier actuel, frais connus et décisions déjà reçues, le cas échéant.');
    if (housing) documents.push('Bail, documents du crédit ou du logement dont tu disposes, et relevé des charges.');
    if (a[0] === 3 || a[0] === 4) documents.push('Courriers de procédure et décisions déjà reçus, s’il y en a.');
    if (sensitive) documents.push('Échanges utiles déjà en ta possession, datés et conservés sans modification, seulement si cela ne te met pas en danger.');
    const questions = ['Quelles informations vous manquent pour comprendre ma situation ?', 'Quelles pièces sont nécessaires, à quel moment, et comment vous les transmettre ?', 'Que couvre le tarif annoncé et comment serai-je informé des frais supplémentaires ?'];
    if (children) questions.push('Quels éléments préparer pour discuter d’une organisation adaptée aux besoins des enfants ?');
    if (housing) questions.push('Quelles conséquences faut-il vérifier avant un changement de logement ou un engagement financier ?');
    if (money) questions.push('Quels postes financiers faut-il distinguer et quelles hypothèses restent à vérifier ?');
    if (a[0] === 3) questions.push('Quelles sont les échéances applicables à mon dossier et qui fait quoi avant chaque date ?');
    const attention = ['Ton statut (mariage, Pacs ou concubinage), les pays concernés et le détail de ton patrimoine ne sont pas renseignés ici. Ils doivent être précisés au professionnel.', 'Cette sélection de sujets ne détermine ni tes droits, ni une procédure, ni un montant à payer. Elle ne mesure pas le danger.'];
    if (sensitive) attention.unshift('Des tensions ou une urgence ont été signalées : ce plan ne doit pas retarder une demande d’aide adaptée.');
    if (a[4] === 3) attention.push('Une pièce manque ? Note son intitulé et demande comment l’obtenir légalement plutôt que de contourner un accès.');
    const resources = [
      ['Préparer le rendez-vous', 'methode.html#preparer-echange'],
      ['Checklist documentaire', 'checklist-preparation.html'],
      ['Comprendre les étapes', 'parcours.html']
    ];
    if (children) resources.push(['Enfants : besoins et organisation', 'enfants.html']);
    if (money || housing) resources.push(['Préparer les sujets financiers', 'finances.html']);
    resources.push(['Consulter gratuitement un avocat : les possibilités', 'https://www.service-public.gouv.fr/particuliers/vosdroits/F20706']);
    return { sensitive, title: 'Ton plan de préparation', summary: dangerSignal ? 'Tu as signalé des menaces ou une forte urgence. Ce questionnaire ne peut pas évaluer le danger. En cas de danger immédiat, appelle le 17 ou le 112.' : 'Voici des pistes d’organisation sélectionnées à partir de tes réponses, à adapter avec le professionnel que tu consulteras.', situation: labels, priorities: priorities.slice(0, 5), next, documents, questions, attention, resources };
  }
  root.buildPreparation = buildPreparation;
  if (typeof module !== 'undefined') module.exports = { buildPreparation };
})(typeof window !== 'undefined' ? window : globalThis);

if (typeof document !== 'undefined') {
  let currentPlan = null;
  function fillList(id, items) {
    const target = document.getElementById(id);
    target.replaceChildren(...items.map(text => { const li = document.createElement('li'); li.textContent = text; return li; }));
  }
  window.renderPreparation = function (answers, questions) {
    const labels = questions.map((q, i) => q.axis + ' : ' + q.answers[answers[i]].label);
    const plan = window.buildPreparation(answers, labels);
    currentPlan = plan;
    document.getElementById('resultTitle').textContent = plan.title;
    document.getElementById('resultSummary').textContent = plan.summary;
    document.getElementById('resultPriority').textContent = plan.priorities[0];
    fillList('resultSituation', plan.situation);
    fillList('resultNextSteps', plan.priorities);
    fillList('resultActions', plan.next);
    fillList('resultDocuments', plan.documents);
    fillList('resultQuestions', plan.questions);
    fillList('resultAttention', plan.attention);
    const resources = document.getElementById('resultResources');
    resources.replaceChildren(...plan.resources.map(([label, href]) => {
      const li = document.createElement('li'); const a = document.createElement('a'); a.textContent = label; a.href = href; li.append(a); return li;
    }));
    document.getElementById('packDiscovery').hidden = plan.sensitive;
    document.getElementById('exportStatus').textContent = '';
  };
  document.getElementById('exportPlan')?.addEventListener('click', () => {
    if (!currentPlan) return;
    const p = currentPlan;
    const sections = [['TA SITUATION', p.situation], ['TES PRIORITES', p.priorities], ['TES 5 ACTIONS', p.next], ['TES DOCUMENTS', p.documents], ['TES QUESTIONS', p.questions], ['POINTS D’ATTENTION', p.attention], ['TES RESSOURCES', p.resources.map(([label, href]) => label + ' : ' + href)]];
    const output = ['POINT SEPARATION - PLAN DE PREPARATION', 'Règles éditoriales v1 - 9 septembre 2026', 'Document personnel à relire, sans avis juridique.', p.summary, ...sections.map(([title, items]) => title + '\n' + items.map(x => '- ' + x).join('\n'))].join('\n\n');
    const url = URL.createObjectURL(new Blob([output], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = 'mon-plan-preparation.txt'; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    document.getElementById('exportStatus').textContent = 'Téléchargement demandé. Ce fichier contient tes réponses : conserve-le dans un emplacement personnel. Rien n’a été envoyé à notre équipe.';
  });
  document.getElementById('restartButton')?.addEventListener('click', () => { currentPlan = null; });
}
