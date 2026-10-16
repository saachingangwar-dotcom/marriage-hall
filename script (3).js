/* =====================================================================
   STEP 1: EDIT THIS CONFIG BLOCK. Every business detail lives here.
   Leave a value as "" if you do not have it; that item stays hidden.
   ===================================================================== */
const CONFIG = {
  name: "[ENTER MARRIAGE HALL NAME]",
  address: "[ENTER FULL ADDRESS, CITY, STATE]",
  phone: "",            // e.g. "+919876543210"  (with country code)
  whatsapp: "",         // digits only with country code, e.g. "919876543210"
  instagram: "",        // username only, without @
  email: "",
  mapsLink: "",         // paste your Google Maps share link
  hours: "",            // e.g. "Daily 10 AM - 8 PM". Leave "" to hide.
  reviewsLink: "",      // link to your Google reviews page, if any

  about: "Add a short introduction to your venue here. Describe the hall, the experience you offer and the events you host.",
  aboutImage: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=900&q=70&auto=format",
  highlights: [],       // e.g. ["Air-conditioned hall", "Seats 500 guests"]. Only add true facts.

  // Set offered:true ONLY for facilities your venue really provides.
  facilities: [
    { name: "Grand Wedding Hall", offered: false, text: "A spacious hall for your ceremony." },
    { name: "Beautiful Wedding Stage", offered: false, text: "A stage designed for your moments." },
    { name: "Luxury Decoration", offered: false, text: "Floral and lighting decoration." },
    { name: "Engagement Ceremonies", offered: false, text: "A setting for engagement functions." },
    { name: "Reception Parties", offered: false, text: "Space for your reception." },
    { name: "Birthday & Anniversary Events", offered: false, text: "Celebrations of every kind." },
    { name: "Catering Services", offered: false, text: "Food arrangements for your guests." },
    { name: "Guest Accommodation", offered: false, text: "Rooms for family and guests." },
    { name: "Parking Facilities", offered: false, text: "Parking for guests' vehicles." }
  ],

  // price: a number in INR (e.g. 150000) or null to show "Contact for Pricing"
  packages: [
    { name: "Silver Wedding Package", price: null, capacity: "", includes: [], decor: "" },
    { name: "Gold Wedding Package", price: null, capacity: "", includes: [], decor: "", featured: true },
    { name: "Royal Wedding Package", price: null, capacity: "", includes: [], decor: "" }
  ],

  // Add only REAL reviews: { name: "Guest name", text: "Their words" }
  reviews: [],

  // Replace these sample photos with your own venue photos (add files to an
  // "images" folder and use "images/photo1.jpg"). Keep at least 12.
  gallery: [
    ["photo-1519741497674-611481863552", "Decorated wedding hall"],
    ["photo-1465495976277-4387d4b0b4c6", "Wedding stage decoration"],
    ["photo-1464366400600-7168b8af9bc3", "Floral mandap"],
    ["photo-1511795409834-ef04bbd61622", "Reception setup"],
    ["photo-1478146896981-b80fe463b330", "Banquet hall interior"],
    ["photo-1469371670807-013ccf25f16a", "Table decoration"],
    ["photo-1507504031003-b417219a0fde", "Night wedding lighting"],
    ["photo-1520854221256-17451cc331bf", "Outdoor wedding setup"],
    ["photo-1530023367847-a683933f4172", "Entrance decoration"],
    ["photo-1510076857177-7470076d4098", "Royal wedding seating"],
    ["photo-1525772764200-be829a350797", "Floral arrangements"],
    ["photo-1506630448388-4e683c67ddb0", "Lighting arrangement"]
  ].map(([id, alt]) => ({ src: `https://images.unsplash.com/${id}?w=900&q=70&auto=format`, alt }))
};

/* ===================== Code below: no need to edit ===================== */
const $ = (s) => document.querySelector(s);
const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const waNumber = CONFIG.whatsapp.replace(/\D/g, "");
const waLink = (msg) => `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
const DEFAULT_MSG = "Hello, I am interested in booking your marriage hall. Please share availability, packages, and pricing.";
const SETUP_MSG = "WhatsApp number is not set yet. Open script.js and fill in the whatsapp field.";

// Names, title, text
document.querySelectorAll(".brand-name").forEach((e) => (e.textContent = CONFIG.name));
document.title = `${CONFIG.name} | Wedding Venue`;
$("#year").textContent = new Date().getFullYear();
$("#aboutText").textContent = CONFIG.about;
$("#aboutImg").src = CONFIG.aboutImage;
$("#addr").textContent = CONFIG.address;
$("#footAddr").textContent = CONFIG.address;
$("#highlights").innerHTML = CONFIG.highlights.map((h) => `<li>${esc(h)}</li>`).join("");
if (CONFIG.hours) $("#hours").textContent = "Opening hours: " + CONFIG.hours;

// Facilities (only those marked offered)
const offered = CONFIG.facilities.filter((f) => f.offered);
$("#facilityGrid").innerHTML = offered.length
  ? offered.map((f) => `<article class="card"><h3>${esc(f.name)}</h3><p>${esc(f.text)}</p></article>`).join("")
  : `<p class="empty">Facilities will appear here. In script.js, set <b>offered: true</b> for each facility you provide.</p>`;

// Packages + package dropdown
$("#packageGrid").innerHTML = CONFIG.packages.map((p) => `
  <article class="card ${p.featured ? "feature" : ""}">
    <h3>${esc(p.name)}</h3>
    <p class="price">${p.price ? "&#8377; " + Number(p.price).toLocaleString("en-IN") : "Contact for Pricing"}</p>
    <p>${p.capacity ? "Guest capacity: " + esc(p.capacity) : "Guest capacity: please enquire"}</p>
    ${p.decor ? `<p>Decoration: ${esc(p.decor)}</p>` : ""}
    ${p.includes.length ? "<ul>" + p.includes.map((i) => `<li>${esc(i)}</li>`).join("") + "</ul>" : "<p>Included services: please enquire</p>"}
    <p class="btns"><a class="btn small" href="#booking" data-pack="${esc(p.name)}">Choose this package</a></p>
  </article>`).join("");
$("#packSelect").innerHTML = `<option value="">Not sure yet</option>` + CONFIG.packages.map((p) => `<option>${esc(p.name)}</option>`).join("");
document.querySelectorAll("[data-pack]").forEach((a) => a.addEventListener("click", () => ($("#packSelect").value = a.dataset.pack)));

// Reviews (real ones only)
$("#reviewGrid").innerHTML = CONFIG.reviews.length
  ? CONFIG.reviews.map((r) => `<blockquote class="card"><p>&ldquo;${esc(r.text)}&rdquo;</p><h3>${esc(r.name)}</h3></blockquote>`).join("")
  : `<p class="empty">Reviews from our guests will be shown here.</p>`;
if (CONFIG.reviewsLink) $("#reviewLink").innerHTML = `<a class="btn" target="_blank" rel="noopener" href="${esc(CONFIG.reviewsLink)}">Read our reviews</a>`;

// Contact buttons
const btns = [];
if (CONFIG.phone) btns.push(`<a class="btn" href="tel:${esc(CONFIG.phone.replace(/[^\d+]/g, ""))}">Call ${esc(CONFIG.phone)}</a>`);
if (waNumber) btns.push(`<a class="btn" target="_blank" rel="noopener" href="${waLink(DEFAULT_MSG)}">Book on WhatsApp</a>`);
if (CONFIG.instagram) btns.push(`<a class="btn" target="_blank" rel="noopener" href="https://instagram.com/${esc(CONFIG.instagram.replace("@", ""))}">Instagram</a>`);
if (CONFIG.email) btns.push(`<a class="btn" href="mailto:${esc(CONFIG.email)}">Email us</a>`);
$("#contactBtns").innerHTML = btns.join("") || `<p class="empty">Add your contact details in script.js.</p>`;
$("#mapBox").innerHTML = CONFIG.mapsLink
  ? `<div><p>${esc(CONFIG.address)}</p><p class="btns" style="justify-content:center"><a class="btn" target="_blank" rel="noopener" href="${esc(CONFIG.mapsLink)}">Open map &amp; directions</a></p></div>`
  : `<p>Add your Google Maps link in script.js.</p>`;
$("#footLinks").innerHTML = [
  CONFIG.instagram && `<a target="_blank" rel="noopener" href="https://instagram.com/${esc(CONFIG.instagram)}">Instagram</a>`,
  CONFIG.email && `<a href="mailto:${esc(CONFIG.email)}">${esc(CONFIG.email)}</a>`,
  CONFIG.phone && `<a href="tel:${esc(CONFIG.phone.replace(/[^\d+]/g, ""))}">${esc(CONFIG.phone)}</a>`
].filter(Boolean).join("");

// Floating WhatsApp button
const fl = $("#waFloat");
if (waNumber) { fl.href = waLink(DEFAULT_MSG); } else { fl.href = "#contact"; fl.addEventListener("click", () => alert(SETUP_MSG)); }

// Gallery + lightbox (broken image falls back to a plain tile)
let current = 0;
$("#galleryGrid").innerHTML = CONFIG.gallery.map((g, i) =>
  `<button type="button" data-i="${i}" aria-label="Enlarge: ${esc(g.alt)}"><img src="${esc(g.src)}" alt="${esc(g.alt)}" loading="lazy" onerror="this.parentElement.style.display='none'"></button>`).join("");
const lb = $("#lightbox");
function showLb(i) {
  current = (i + CONFIG.gallery.length) % CONFIG.gallery.length;
  $("#lbImg").src = CONFIG.gallery[current].src.replace("w=900", "w=1600");
  $("#lbImg").alt = CONFIG.gallery[current].alt;
  lb.hidden = false;
}
$("#galleryGrid").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) showLb(+b.dataset.i); });
$("#lbClose").onclick = () => (lb.hidden = true);
$("#lbPrev").onclick = () => showLb(current - 1);
$("#lbNext").onclick = () => showLb(current + 1);
lb.addEventListener("click", (e) => { if (e.target === lb) lb.hidden = true; });
document.addEventListener("keydown", (e) => {
  if (lb.hidden) return;
  if (e.key === "Escape") lb.hidden = true;
  if (e.key === "ArrowLeft") showLb(current - 1);
  if (e.key === "ArrowRight") showLb(current + 1);
});

// Navigation: sticky style + mobile menu
const nav = $("#nav"), menu = $("#menu"), mb = $("#menuBtn");
const onScroll = () => nav.classList.toggle("solid", scrollY > 60);
addEventListener("scroll", onScroll); onScroll();
mb.onclick = () => { const o = menu.classList.toggle("open"); mb.setAttribute("aria-expanded", o); };
menu.addEventListener("click", (e) => { if (e.target.tagName === "A") { menu.classList.remove("open"); mb.setAttribute("aria-expanded", false); } });

// Booking form: validate, then open WhatsApp with a pre-filled message
const form = $("#bookForm");
form.date.min = new Date().toISOString().split("T")[0];
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let ok = true;
  const rules = {
    name: (v) => v.trim().length >= 2 || "Enter your name.",
    mobile: (v) => /^(\+?91)?[6-9]\d{9}$/.test(v.replace(/[\s-]/g, "")) || "Enter a valid 10-digit mobile number.",
    event: (v) => !!v || "Choose an event type.",
    date: (v) => (!!v && v >= form.date.min) || "Choose today or a future date.",
    guests: (v) => +v >= 1 || "Enter the number of guests."
  };
  for (const [k, rule] of Object.entries(rules)) {
    const f = form[k], r = rule(f.value);
    f.classList.toggle("bad", r !== true);
    f.parentElement.querySelector(".err").textContent = r === true ? "" : r;
    if (r !== true) ok = false;
  }
  if (!ok) return;
  if (!waNumber) return alert(SETUP_MSG);
  const d = Object.fromEntries(new FormData(form));
  const msg = `Hello, I would like to enquire about booking ${CONFIG.name}.\nName: ${d.name}\nMobile: ${d.mobile}\nEvent: ${d.event}\nDate: ${d.date}\nGuests: ${d.guests}\nPackage: ${d.pack || "Not sure yet"}\nRequirements: ${d.notes || "None"}\nPlease share availability and pricing.`;
  const box = $("#confirm");
  box.hidden = false;
  box.innerHTML = `<p><strong>Your enquiry is ready.</strong> WhatsApp is opening now. Press <strong>Send</strong> there to deliver it to us. If it did not open, <a target="_blank" rel="noopener" href="${waLink(msg)}">tap here</a>.</p><p>Your date is not booked until we confirm availability with you.</p>`;
  window.open(waLink(msg), "_blank", "noopener");
});

// Loader
addEventListener("load", () => setTimeout(() => $("#loader").classList.add("done"), 400));
