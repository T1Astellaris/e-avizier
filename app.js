/** Afișarea conținutului. Pentru URL-uri și texte, editați config.js. */
function safeURL(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url : null;
  } catch {
    return null;
  }
}

function fileLinks(value) {
  const url = safeURL(value);
  if (!url) return null;

  const pathMatch = url.pathname.match(/^\/file\/d\/([a-zA-Z0-9_-]+)/);
  const fileId = pathMatch ? pathMatch[1] : url.searchParams.get("id");

  if (url.hostname === "drive.google.com" && /^[a-zA-Z0-9_-]+$/.test(fileId || "")) {
    const id = encodeURIComponent(fileId);
    return {
      preview: `https://drive.google.com/file/d/${id}/preview`,
      open: `https://drive.google.com/file/d/${id}/view`,
      download: `https://drive.google.com/uc?export=download&id=${id}`,
    };
  }

  return { preview: url.href, open: url.href, download: url.href };
}

// Textul din configurație este inserat ca text simplu, nu ca HTML.
function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function renderAnnouncements() {
  const root = document.getElementById("announcements");
  if (!SITE.announcements.length) {
    const box = element("div", "notice");
    const body = element("div");
    body.append(
      element("h3", "", "Niciun anunț nou publicat"),
      element("p", "", "Informările noi ale asociației vor fi afișate aici. Anunțurile anterioare sunt disponibile în arhivă."),
    );
    box.append(element("span", "label", "La zi"), body);
    root.append(box);
  }

  SITE.announcements.forEach((item) => {
    const box = element("article", "notice");
    const meta = element("div");
    meta.append(
      element("span", "label", item.important ? "Important" : "Informare"),
      element("br"),
      element("time", "", item.date),
    );
    const body = element("div");
    body.append(element("h3", "", item.title), element("p", "", item.text));
    box.append(meta, body);
    root.append(box);
  });
}

function renderDocuments() {
  const root = document.getElementById("documents");
  SITE.documents.forEach((item, index) => {
    const card = element("article", "doc");
    card.append(
      element("span", "number", `${String(index + 1).padStart(2, "0")} / DOCUMENT`),
      element("h3", "", item.title),
      element("p", "", item.description),
    );
    const url = safeURL(item.url);
    if (url) {
      const link = element("a", "btn", "Deschide documentul ↗");
      link.href = url.href;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      card.append(link);
    } else {
      card.append(element("span", "soon", "În curs de publicare"));
    }
    root.append(card);
  });
}

function renderMaintenance() {
  const buildings = SITE.maintenanceBuildings.filter((item) => item.enabled);
  const buildingSelect = document.getElementById("building");
  const monthSelect = document.getElementById("month");
  const viewer = document.getElementById("viewer");
  const actions = document.getElementById("pdf-actions");
  const openLink = document.getElementById("pdf-open");
  const downloadLink = document.getElementById("pdf-download");
  let lists = [];

  function showEmptyState() {
    actions.hidden = true;
    openLink.removeAttribute("href");
    downloadLink.removeAttribute("href");
    viewer.classList.remove("ready");
    const empty = element("div", "empty");
    empty.append(
      element("div", "file-icon", "PDF"),
      element("h3", "", "Lista lunară va apărea aici"),
      element("p", "", buildings.length
        ? `Momentan nu este publicată nicio listă pentru ${buildingSelect.value}.`
        : "Momentan nu este publicată nicio listă de întreținere."),
    );
    viewer.replaceChildren(empty);
  }

  function showPDF() {
    const item = lists[Number(monthSelect.value)];
    if (!item) return;
    const frame = element("iframe");
    frame.title = `Lista de întreținere — ${buildingSelect.value} — ${item.label}`;
    frame.src = item.links.preview;
    frame.allow = "fullscreen";
    viewer.replaceChildren(frame);
    viewer.classList.add("ready");
    openLink.href = item.links.open;
    downloadLink.href = item.links.download;
    actions.hidden = false;
  }

  // Schimbarea blocului reîncarcă lunile și elimină PDF-ul blocului anterior.
  function showBuilding() {
    lists = SITE.maintenance
      .filter((item) => (item.building || SITE.maintenanceDefaultBuilding) === buildingSelect.value)
      .map((item) => ({ ...item, links: fileLinks(item.url) }))
      .filter((item) => item.links);
    monthSelect.replaceChildren();
    monthSelect.disabled = !lists.length;

    if (!lists.length) {
      monthSelect.append(element("option", "", "Nicio listă publicată încă"));
      showEmptyState();
      return;
    }

    lists.forEach((item, index) => {
      const option = element("option", "", item.label);
      option.value = index;
      monthSelect.append(option);
    });
    monthSelect.value = "0";
    showPDF();
  }

  buildingSelect.replaceChildren();
  buildings.forEach((item) => {
    const option = element("option", "", item.id);
    option.value = item.id;
    buildingSelect.append(option);
  });
  buildingSelect.disabled = !buildings.length;
  monthSelect.addEventListener("change", showPDF);
  buildingSelect.addEventListener("change", showBuilding);

  if (buildings.length) {
    buildingSelect.value = buildings[0].id;
    showBuilding();
  } else {
    monthSelect.replaceChildren(element("option", "", "Nicio listă publicată încă"));
    monthSelect.disabled = true;
    showEmptyState();
  }
}

function renderContact() {
  const address = document.querySelector("[data-contact-address]");
  if (address) address.textContent = SITE.contactAddress || "";
  const email = SITE.contactEmail.trim();
  if (!email) return;
  document.querySelectorAll("[data-contact-email]").forEach((link) => {
    link.href = `mailto:${email}`;
    link.textContent = link.hasAttribute("data-contact-button") ? "Trimite o sesizare ↗" : email;
    link.hidden = false;
  });
  document.querySelectorAll("[data-contact-pending]").forEach((node) => {
    node.hidden = true;
  });
}

renderAnnouncements();
renderDocuments();
renderMaintenance();
renderContact();
document.getElementById("updated-at").textContent = `Site actualizat · ${SITE.updatedAt}`;
