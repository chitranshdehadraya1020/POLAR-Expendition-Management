// app.js

document.addEventListener("DOMContentLoaded", () => {
    initializeNavigation();
    initializeChart();
    initializeSearch();
    initializeSidebar();
    initializeModals();
});

/* =========================================================
   PAGE NAVIGATION
   ========================================================= */

function showPage(pageId, button = null) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.add("hidden");
    });

    const page = document.getElementById(pageId);

    if (!page) return;

    page.classList.remove("hidden");

    document.querySelectorAll(".nav-item").forEach(item => {
        item.classList.remove("active");
    });

    if (button) {
        button.classList.add("active");
    } else {
        const navButton = document.querySelector(
            `.nav-item[onclick*="'${pageId}'"]`
        );

        if (navButton) {
            navButton.classList.add("active");
        }
    }

    const titles = {
        dashboard: "Mission Dashboard",
        expeditions: "Expedition Management",
        assets: "Asset Management",
        inventory: "Inventory & Logistics",
        personnel: "Personnel Management",
        tracking: "Live Expedition Tracking",
        alerts: "System Alerts"
    };

    const pageTitle = document.getElementById("pageTitle");

    if (pageTitle) {
        pageTitle.textContent = titles[pageId] || "Polar Command";
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    if (window.innerWidth <= 1024) {
        const sidebar = document.getElementById("sidebar");

        if (sidebar) {
            sidebar.classList.remove("open");
        }
    }
}

function initializeNavigation() {
    document.querySelectorAll(".nav-item").forEach(button => {
        button.addEventListener("click", () => {
            document.querySelectorAll(".nav-item").forEach(item => {
                item.classList.remove("active");
            });

            button.classList.add("active");
        });
    });
}

/* =========================================================
   SIDEBAR
   ========================================================= */

function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");

    if (!sidebar) return;

    sidebar.classList.toggle("open");
}

function initializeSidebar() {
    const sidebar = document.getElementById("sidebar");

    if (!sidebar) return;

    document.addEventListener("click", event => {
        if (window.innerWidth > 1024) return;

        const clickedInsideSidebar = sidebar.contains(event.target);
        const clickedMenu = event.target.closest(".mobile-menu");

        if (!clickedInsideSidebar && !clickedMenu) {
            sidebar.classList.remove("open");
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 1024) {
            sidebar.classList.remove("open");
        }
    });
}

/* =========================================================
   CHART.JS
   ========================================================= */

let logisticsChart = null;

function initializeChart() {
    const canvas = document.getElementById("logisticsChart");

    if (!canvas || typeof Chart === "undefined") {
        return;
    }

    logisticsChart = new Chart(canvas, {
        type: "line",

        data: {
            labels: [
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
                "Sun"
            ],

            datasets: [
                {
                    label: "Fuel",
                    data: [42, 48, 45, 55, 51, 61, 58],

                    borderColor: "#22d3ee",
                    backgroundColor: "rgba(34, 211, 238, 0.08)",

                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,

                    pointBackgroundColor: "#22d3ee",
                    pointBorderColor: "#0f172a",
                    pointRadius: 3
                },

                {
                    label: "Food",
                    data: [31, 35, 33, 39, 42, 45, 47],

                    borderColor: "#4ade80",
                    backgroundColor: "rgba(74, 222, 128, 0.06)",

                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,

                    pointBackgroundColor: "#4ade80",
                    pointBorderColor: "#0f172a",
                    pointRadius: 3
                },

                {
                    label: "Medical",
                    data: [15, 18, 16, 22, 20, 25, 24],

                    borderColor: "#facc15",
                    backgroundColor: "rgba(250, 204, 21, 0.05)",

                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,

                    pointBackgroundColor: "#facc15",
                    pointBorderColor: "#0f172a",
                    pointRadius: 3
                }
            ]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            interaction: {
                intersect: false,
                mode: "index"
            },

            plugins: {
                legend: {
                    position: "top",

                    labels: {
                        color: "#cbd5e1",
                        usePointStyle: true,
                        padding: 20
                    }
                },

                tooltip: {
                    backgroundColor: "#0f172a",
                    borderColor: "#334155",
                    borderWidth: 1,
                    titleColor: "#ffffff",
                    bodyColor: "#cbd5e1",
                    padding: 12
                }
            },

            scales: {
                x: {
                    ticks: {
                        color: "#64748b"
                    },

                    grid: {
                        color: "rgba(148, 163, 184, 0.07)"
                    }
                },

                y: {
                    beginAtZero: true,

                    ticks: {
                        color: "#64748b"
                    },

                    grid: {
                        color: "rgba(148, 163, 184, 0.07)"
                    }
                }
            }
        }
    });
}

/* =========================================================
   GLOBAL SEARCH
   ========================================================= */

function globalSearch() {
    const input = document.getElementById("globalSearch");

    if (!input) return;

    const query = input.value.trim().toLowerCase();

    if (!query) {
        showPage("dashboard");
        return;
    }

    const pages = document.querySelectorAll(".page");

    let foundPage = null;

    pages.forEach(page => {
        if (
            !foundPage &&
            page.textContent.toLowerCase().includes(query)
        ) {
            foundPage = page;
        }
    });

    if (foundPage) {
        showPage(foundPage.id);

        const tables = foundPage.querySelectorAll("table");

        tables.forEach(table => {
            table.querySelectorAll("tbody tr").forEach(row => {
                row.style.display = row.textContent
                    .toLowerCase()
                    .includes(query)
                    ? ""
                    : "none";
            });
        });
    }
}

/* =========================================================
   TABLE SEARCH
   ========================================================= */

function searchTable(input, tableId) {
    const table = document.getElementById(tableId);

    if (!table) return;

    const query = input.value.trim().toLowerCase();

    table.querySelectorAll("tbody tr").forEach(row => {
        const text = row.textContent.toLowerCase();

        row.style.display =
            text.includes(query) ? "" : "none";
    });
}

/* =========================================================
   EXPEDITION FILTER
   ========================================================= */

function filterExpeditions(status) {
    const table = document.getElementById("expeditionTable");

    if (!table) return;

    table.querySelectorAll("tbody tr").forEach(row => {
        const rowStatus = row.dataset.status;

        if (status === "all" || rowStatus === status) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}

/* =========================================================
   EXPEDITION DETAILS
   ========================================================= */

function viewExpedition(id) {
    const data = {
        "EXP-001": {
            name: "Antarctic Research 2026",
            region: "Antarctica",
            leader: "Dr. Rajiv Sharma",
            personnel: 24,
            progress: 76,
            status: "Active"
        },

        "EXP-002": {
            name: "Arctic Climate Study",
            region: "Arctic",
            leader: "Dr. Ananya Rao",
            personnel: 18,
            progress: 52,
            status: "Planning"
        },

        "EXP-003": {
            name: "Ice Core Research",
            region: "Antarctica",
            leader: "Dr. Vikram Singh",
            personnel: 21,
            progress: 91,
            status: "Active"
        }
    };

    const expedition = data[id];

    if (!expedition) {
        showToast("Expedition not found.", "error");
        return;
    }

    createModal(`
        <div class="space-y-5">

            <div>
                <p class="text-cyan-400 text-sm font-semibold">
                    ${id}
                </p>

                <h2 class="text-2xl font-bold mt-1">
                    ${escapeHTML(expedition.name)}
                </h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div class="bg-slate-800 p-4 rounded-xl">
                    <p class="text-slate-400 text-xs">Region</p>
                    <p class="mt-1 font-semibold">
                        ${escapeHTML(expedition.region)}
                    </p>
                </div>

                <div class="bg-slate-800 p-4 rounded-xl">
                    <p class="text-slate-400 text-xs">
                        Personnel
                    </p>
                    <p class="mt-1 font-semibold">
                        ${expedition.personnel}
                    </p>
                </div>

                <div class="bg-slate-800 p-4 rounded-xl">
                    <p class="text-slate-400 text-xs">Leader</p>
                    <p class="mt-1 font-semibold">
                        ${escapeHTML(expedition.leader)}
                    </p>
                </div>

                <div class="bg-slate-800 p-4 rounded-xl">
                    <p class="text-slate-400 text-xs">Status</p>
                    <p class="mt-1">
                        <span class="status ${
                            expedition.status === "Active"
                                ? "active"
                                : "planning"
                        }">
                            ${expedition.status}
                        </span>
                    </p>
                </div>

            </div>

            <div>
                <div class="flex justify-between mb-2 text-sm">
                    <span>Mission Progress</span>
                    <span>${expedition.progress}%</span>
                </div>

                <div class="progress">
                    <div
                        class="progress-bar bg-cyan-400"
                        style="width:${expedition.progress}%">
                    </div>
                </div>
            </div>

            <div class="flex justify-end">
                <button
                    class="primary-button"
                    onclick="closeModal()">
                    Close
                </button>
            </div>

        </div>
    `);
}

/* =========================================================
   CREATE EXPEDITION
   ========================================================= */

function openModal() {
    createModal(`
        <div>

            <div class="flex items-center justify-between mb-6">

                <div>
                    <p class="text-cyan-400 text-xs font-semibold">
                        POLAR COMMAND
                    </p>

                    <h2 class="text-2xl font-bold">
                        Create Expedition
                    </h2>
                </div>

                <button
                    onclick="closeModal()"
                    class="text-slate-400 hover:text-white text-xl">

                    <i class="fa-solid fa-xmark"></i>

                </button>

            </div>

            <form id="expeditionForm" class="space-y-4">

                <div>

                    <label class="block text-sm mb-2">
                        Mission Name
                    </label>

                    <input
                        required
                        name="mission"
                        class="dark-input w-full"
                        placeholder="Enter mission name">

                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div>

                        <label class="block text-sm mb-2">
                            Region
                        </label>

                        <select
                            required
                            name="region"
                            class="dark-input w-full">

                            <option value="">
                                Select Region
                            </option>

                            <option value="Antarctica">
                                Antarctica
                            </option>

                            <option value="Arctic">
                                Arctic
                            </option>

                            <option value="Southern Ocean">
                                Southern Ocean
                            </option>

                        </select>

                    </div>

                    <div>

                        <label class="block text-sm mb-2">
                            Team Size
                        </label>

                        <input
                            required
                            min="1"
                            type="number"
                            name="team"
                            class="dark-input w-full"
                            placeholder="Personnel">

                    </div>

                </div>

                <div>

                    <label class="block text-sm mb-2">
                        Expedition Leader
                    </label>

                    <input
                        required
                        name="leader"
                        class="dark-input w-full"
                        placeholder="Leader name">

                </div>

                <div>

                    <label class="block text-sm mb-2">
                        Start Date
                    </label>

                    <input
                        required
                        type="date"
                        name="date"
                        class="dark-input w-full">

                </div>

                <div class="flex justify-end gap-3 pt-4">

                    <button
                        type="button"
                        onclick="closeModal()"
                        class="small-button">
                        Cancel
                    </button>

                    <button
                        type="submit"
                        class="primary-button">

                        <i class="fa-solid fa-plus"></i>

                        Create Expedition

                    </button>

                </div>

            </form>

        </div>
    `);

    const form = document.getElementById("expeditionForm");

    if (form) {
        form.addEventListener(
            "submit",
            handleExpeditionSubmit
        );
    }
}

function handleExpeditionSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const mission = formData.get("mission");
    const region = formData.get("region");
    const team = formData.get("team");
    const leader = formData.get("leader");
    const date = formData.get("date");

    const table = document.querySelector(
        "#expeditionTable tbody"
    );

    if (table) {
        const number = table.children.length + 1;

        const id =
            `EXP-${String(number).padStart(3, "0")}`;

        const row = document.createElement("tr");

        row.dataset.status = "Planning";

        row.innerHTML = `
            <td>${id}</td>

            <td>${escapeHTML(mission)}</td>

            <td>${escapeHTML(region)}</td>

            <td>${escapeHTML(leader)}</td>

            <td>${formatDate(date)}</td>

            <td>
                <span class="status planning">
                    Planning
                </span>
            </td>
        `;

        table.appendChild(row);
    }

    closeModal();

    showToast(
        `${mission} created successfully.`,
        "success"
    );
}

/* =========================================================
   MODAL SYSTEM
   ========================================================= */

function createModal(content) {
    closeModal();

    const overlay = document.createElement("div");

    overlay.id = "dynamicModal";

    overlay.className = "modal-overlay";

    overlay.innerHTML = `
        <div class="modal">
            ${content}
        </div>
    `;

    overlay.addEventListener("click", event => {
        if (event.target === overlay) {
            closeModal();
        }
    });

    document.body.appendChild(overlay);

    document.body.style.overflow = "hidden";
}

function closeModal() {
    const modal = document.getElementById("dynamicModal");

    if (modal) {
        modal.remove();
    }

    document.body.style.overflow = "";
}

function initializeModals() {
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeModal();
        }
    });
}

/* =========================================================
   TOAST
   ========================================================= */

function showToast(message, type = "info") {
    document
        .querySelectorAll(".app-toast")
        .forEach(toast => toast.remove());

    const colors = {
        success: "#22c55e",
        error: "#ef4444",
        warning: "#eab308",
        info: "#06b6d4"
    };

    const icons = {
        success: "fa-circle-check",
        error: "fa-circle-xmark",
        warning: "fa-triangle-exclamation",
        info: "fa-circle-info"
    };

    const toast = document.createElement("div");

    toast.className =
        "app-toast fixed top-5 right-5 z-[9999] " +
        "px-5 py-3 rounded-xl shadow-2xl " +
        "flex items-center gap-3 font-semibold";

    toast.style.background =
        colors[type] || colors.info;

    toast.style.color = "#020617";

    toast.innerHTML = `
        <i class="fa-solid ${icons[type] || icons.info}"></i>
        <span>${escapeHTML(message)}</span>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(-10px)";
        toast.style.transition = "0.3s";

        setTimeout(() => {
            toast.remove();
        }, 300);

    }, 3000);
}

/* =========================================================
   ASSET / INVENTORY BUTTONS
   ========================================================= */

document.addEventListener("click", event => {
    const button = event.target.closest(".primary-button");

    if (!button) return;

    const text = button.textContent.trim().toLowerCase();

    if (text.includes("register asset")) {
        showToast(
            "Asset registration module is ready.",
            "info"
        );
    }

    if (text.includes("add inventory")) {
        showToast(
            "Inventory entry module is ready.",
            "info"
        );
    }
});

/* =========================================================
   HELPER FUNCTIONS
   ========================================================= */

function formatDate(dateString) {
    if (!dateString) return "";

    const date = new Date(
        `${dateString}T00:00:00`
    );

    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}

function escapeHTML(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

/* =========================================================
   KEYBOARD SHORTCUT
   ========================================================= */

document.addEventListener("keydown", event => {
    if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
    ) {
        event.preventDefault();

        const search =
            document.getElementById("globalSearch");

        if (search) {
            search.focus();
        }
    }
});