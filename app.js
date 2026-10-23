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
  const lists = SITE.maintenance
    .map((item) => ({ ...item, links: fileLinks(item.url) }))
    .filter((item) => item.links);
  const select = document.getElementById("month");
  if (!lists.length) return;

  function showPDF() {
    const item = lists[Number(select.value)];
    if (!item) return;
    const frame = element("iframe");
    frame.title = `Lista de întreținere — ${item.label}`;
    frame.src = item.links.preview;
    frame.allow = "fullscreen";
    const viewer = document.getElementById("viewer");
    viewer.replaceChildren(frame);
    viewer.classList.add("ready");
    document.getElementById("pdf-open").href = item.links.open;
    document.getElementById("pdf-download").href = item.links.download;
    document.getElementById("pdf-actions").hidden = false;
  }

  select.replaceChildren();
  lists.forEach((item, index) => {
    const option = element("option", "", item.label);
    option.value = index;
    select.append(option);
  });
  select.disabled = false;
  select.addEventListener("change", showPDF);
  showPDF();
}

function renderContact() {
  const email = SITE.contactEmail.trim();
  if (!email) return;
  document.querySelectorAll("[data-contact-email]").forEach((link) => {
    link.href = `mailto:${email}`;
    link.textContent = email;
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
