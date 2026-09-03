// ============================================================
// Data — pulled directly from the resume. Edit these arrays to
// update site content; the heatmap and project grid render from them.
// ============================================================

const projects = [
  {
    title: "De Novo Transcriptome Reconstruction & Differential Expression",
    description: "RNA-seq analysis of G1E cells and megakaryocytes, from de novo transcriptome reconstruction through DESeq2 differential expression and visualization. Identified 230 differentially expressed genes, 45 of them significant.",
    tags: ["RNA-seq", "DESeq2", "PCA", "StringTie"],
    github: "https://github.com/RishithaPulakhandam/RNA_Seq",
    results: {
      objective: "Reconstruct transcripts de novo from RNA-seq reads in G1E cells and megakaryocytes (GEO GSE51338) and identify genes that shift in expression between the two cell states, without relying on a pre-built transcript annotation.",
      approach: [
        "Quality-checked and trimmed raw reads (FastQC, Trimmomatic), then aligned to the mouse genome (mm10) with HISAT2.",
        "Reconstructed transcript structures de novo per sample with StringTie, merged across samples with StringTie-Merge, and classified transcripts against the RefSeq annotation with GFFCompare.",
        "Counted reads per transcript with featureCounts and tested for differential expression with DESeq2.",
        "Visualized results with PCA, MA plots, and heatmaps."
      ],
      keyResults: [
        "230 genes differentially expressed at adjusted p < 0.05.",
        "45 genes significant at the stricter adjusted p < 0.01 threshold — 22 upregulated, 23 downregulated.",
        "Top differentially expressed transcript: MSTRG.52.1, corresponding to the gene Hoxb13, with a log2 fold change of 11.23 (~2,300× higher expression in G1E cells than megakaryocytes)."
      ],
      highlight: "Hoxb13 is a HOX-family transcription factor involved in cell differentiation and lineage commitment, with human orthologs implicated in prostate and renal cell carcinoma — so this isn't just a statistically significant gene, it's one with a plausible, literature-backed role in hematopoietic cell-type identity.",
      interpretation: "A tight, roughly balanced split between up- and down-regulated genes (22 vs. 23) at the strict threshold suggests a genuine, symmetric transcriptional shift between cell states rather than a one-directional artifact of normalization. Finding a HOX transcription factor at the top of that list is a good sign the pipeline is surfacing biologically sensible signal, not just noise.",
      visual: { type: "bars", title: "Significant genes (adj. p < 0.01)", bars: [{ label: "Upregulated", value: 22, total: 45 }, { label: "Downregulated", value: 23, total: 45 }] }
    }
  },
  {
    title: "Single-Cell RNA-Seq Pipeline for Cell Type Identification",
    description: "Seurat-based scRNA-seq pipeline in R for PBMC data — clustering, dimensionality reduction, marker gene annotation, and gene expression profiling by cell type.",
    tags: ["Seurat", "scRNA-seq", "R"],
    github: "https://github.com/RishithaPulakhandam/scRNA-seq",
    results: {
      objective: "Take raw 10x Genomics PBMC single-cell RNA-seq data and resolve it into distinct, correctly identified immune cell populations.",
      approach: [
        "Filtered to genes detected in ≥3 cells and cells with 200–2,500 detected genes, and removed cells with >5% mitochondrial reads to exclude empty droplets, doublets, and dying cells.",
        "Log-normalized expression, then selected the top 2,000 most variable genes (vst method) for downstream analysis.",
        "Scaled the data and reduced dimensionality with PCA; an elbow plot showed most of the signal captured in the first 10 PCs.",
        "Clustered cells (graph-based, resolution 0.5) on those 10 PCs, then visualized clusters in 2D with UMAP.",
        "Identified cluster marker genes with FindAllMarkers and assigned cell-type identity using canonical markers (e.g. CD3D/T cells, MS4A1/B cells, LYZ/monocytes)."
      ],
      keyResults: [
        "Resolved 9 distinct clusters, each annotated to a known PBMC cell type: Naive CD4+ T, CD14+ Monocytes, Memory CD4+ T, B cells, CD8+ T, FCGR3A+ Monocytes, NK cells, Dendritic Cells, and Platelets.",
        "Marker genes matched canonical expectations for every cluster (e.g. MS4A1 for B cells, GNLY/NKG7 for NK cells, PPBP for platelets)."
      ],
      interpretation: "Clean UMAP separation between adaptive immune cells (T/B cells) and innate immune cells (monocytes, DCs, NK cells) tracks their known biological relationship — that alignment with expected immunology is what validates the clustering, rather than just trusting the algorithm's output at face value.",
      visual: { type: "legend", title: "9 annotated PBMC clusters", items: ["Naive CD4+ T", "Memory CD4+ T", "CD8+ T", "B cells", "CD14+ Mono", "FCGR3A+ Mono", "NK cells", "Dendritic Cells", "Platelets"] }
    }
  },
  {
    title: "Web-Based Regulatory Motif Detection & Annotation",
    description: "A sequence-based tool for detecting and annotating regulatory motifs in DNA sequences, built to cut analysis time significantly for researchers working with large datasets.",
    tags: ["Python", "JavaScript"],
    github: "https://github.com/RishithaPulakhandam/Web-Based-Tool-for-Regulatory-Motif-Detection-and-Annotation",
    results: {
      objective: "Give researchers a web-based way to submit a DNA sequence and get back annotated regulatory motifs, instead of manually cross-referencing sequences against a motif database.",
      approach: [
        "Designed a MySQL database of regulatory motifs (30 motifs sourced from JASPAR), storing each motif's ID, name, sequence pattern, functional type, and description.",
        "Built a Python CGI backend that parses uploaded FASTA sequences, uses regex-based search to locate motif matches, and annotates matches inline as highlighted HTML spans.",
        "Built an HTML/JS front end for uploading sequences and viewing annotated results plus a summary table.",
        "Validated the tool against known sequences, including a real BRCA1 gene sequence pulled from NCBI."
      ],
      keyResults: [
        "Successfully detects and annotates all 30 JASPAR motifs in the reference database against submitted sequences.",
        "Returns a summary report per sequence: motif name, JASPAR ID, and zero-based start/end position.",
        "Validated end-to-end on a real BRCA1 sequence and a short synthetic test sequence."
      ],
      interpretation: "Moving motif search from a script into a hosted web form removes the biggest barrier for a non-technical collaborator — they can drop in a FASTA file and get an annotated result without installing anything, which was the actual goal, not just running the detection logic correctly.",
      visual: { type: "flow", title: "Pipeline", steps: ["FASTA sequence upload", "Regex motif search vs. 30 JASPAR motifs (MySQL)", "Inline HTML highlighting", "Summary report (ID, position, type)"] }
    }
  },
  {
    title: "Cancer Prediction Using Neural Networks",
    description: "A neural network for disease classification from RNA-seq gene expression data, covering data exploration, preprocessing, normalization, training, and accuracy visualization across cancer types.",
    tags: ["Python", "RNA-seq", "Neural Network"],
    github: "https://github.com/RishithaPulakhandam/Cancer-prediction-Using-Neural-Networks",
    results: {
      objective: "Classify samples into one of 5 cancer types directly from high-dimensional gene expression data using a feedforward neural network.",
      approach: [
        "Explored the Kaggle Cancer Gene Expression dataset — shape, class distribution, missing values — before modeling.",
        "Label-encoded the 5 cancer type classes and scaled features with MinMaxScaler; split into train/validation/test sets.",
        "Built a feedforward network (TensorFlow/Keras): input layer of gene expression features → Dense(40, ReLU) → Dense(20, ReLU) → Softmax output over 5 classes.",
        "Trained with the Adam optimizer (lr = 0.001), sparse categorical crossentropy loss, batch size 32, for 200 epochs.",
        "Evaluated on a held-out test set and compared predicted vs. actual labels for individual samples."
      ],
      keyResults: [
        "Training and validation accuracy rose steadily together across epochs with no divergence — the signature of stable learning rather than overfitting.",
        "Training and validation loss both decreased and plateaued in later epochs.",
        "Manual review of predicted vs. actual labels on test samples showed the large majority matching correctly, with occasional confusion between biologically similar classes (e.g., predicting class 3 instead of class 1)."
      ],
      interpretation: "The fact that validation accuracy tracked training accuracy this closely — rather than plateauing while training accuracy kept climbing — is the real evidence the model generalizes, not just the final accuracy number. The specific misclassification pattern (adjacent classes confused, not random ones) also makes biological sense: gene expression profiles between related cancer types can genuinely overlap.",
      visual: { type: "network", title: "Network architecture", layers: [{ label: "Input", detail: "gene expression features" }, { label: "Dense · 40", detail: "ReLU" }, { label: "Dense · 20", detail: "ReLU" }, { label: "Softmax · 5", detail: "cancer types" }] }
    }
  },
  {
    title: "Thyroid Carcinoma Classification Pipeline",
    description: "A precision-driven classification pipeline for thyroid carcinoma, optimizing preprocessing and feature selection with k-NN and PCA for accurate classification.",
    tags: ["k-NN", "PCA", "Python"],
    github: "https://github.com/RishithaPulakhandam/Thyroid-Carcinoma-Analysis-Pipeline",
    results: {
      objective: "Distinguish papillary from anaplastic thyroid carcinoma samples (GEO dataset GSE55933) using gene expression, and identify which genes drive that separation.",
      approach: [
        "Normalized raw expression data three ways (quantile, scale, and global normalization) and compared MA plots to check normalization quality.",
        "Flagged and removed two outlier samples identified via correlation heatmaps and hierarchical clustering.",
        "Filtered out low-variance genes, keeping the top 75% by variance to reduce dimensionality.",
        "Ran a two-sample t-test per gene between the two carcinoma subtypes, with Benjamini-Hochberg correction for multiple testing.",
        "Reduced the significant gene set with PCA, then classified samples with k-NN, sweeping k from 1–8 to find the best trade-off between accuracy and overfitting."
      ],
      keyResults: [
        "1,902 genes were significantly differentially expressed between papillary and anaplastic samples (BH-adjusted p ≤ 0.05).",
        "PCA on the significant gene set showed clean separation between the two carcinoma subtypes.",
        "k = 3 was selected for k-NN classification — accuracy kept improving up to that point, while k = 7 started overfitting and increasing error.",
        "Identified the top discriminant genes driving the classification in both directions (up- and down-regulated)."
      ],
      interpretation: "The clear PCA split plus a low optimal k suggest the two subtypes have a genuinely distinct expression signature rather than a subtle one — consistent with anaplastic thyroid carcinoma being a more aggressive, transcriptionally distinct progression from papillary disease. Choosing k=3 over higher values was a deliberate bias-variance call: higher k smoothed the decision boundary enough to start misclassifying samples, which is exactly the overfitting pattern you want to catch during model selection rather than after deployment.",
      visual: { type: "stat", value: "1,902", label: "genes significantly differentially expressed (BH-adjusted p ≤ 0.05)" }
    }
  },
  {
    title: "miRNA Identification in Oxycarenus laetus",
    description: "Analyzed microbiome- and metabolism-associated small RNA-seq data to identify six novel miRNAs with miRDeep2, predicted targets with TargetScanFly and miRBase, and validated regulatory roles via stem-loop RT-PCR.",
    tags: ["miRDeep2", "RNA-seq", "RT-PCR"],
    results: {
      objective: "Identify previously uncharacterized miRNAs in Oxycarenus laetus linked to microbiome and metabolic regulation, and confirm they're real, functional molecules rather than sequencing artifacts.",
      approach: [
        "Processed small RNA-seq reads through miRDeep2 to detect novel miRNA candidates.",
        "Predicted likely gene targets for each candidate using TargetScanFly and cross-referenced against miRBase.",
        "Validated a subset of candidates experimentally with stem-loop RT-PCR."
      ],
      keyResults: [
        "Six novel miRNAs identified computationally.",
        "Predicted target genes for each candidate, pointing toward likely regulatory roles in metabolism.",
        "Experimental RT-PCR validation confirmed expression of the candidate miRNAs, supporting the computational predictions."
      ],
      interpretation: "Pairing computational discovery with wet-lab RT-PCR validation is what makes this more than a bioinformatics exercise — the RT-PCR step is the difference between 'the pipeline found something' and 'this miRNA is actually expressed in the organism.'",
      visual: { type: "flow", title: "Discovery-to-validation pipeline", steps: ["Small RNA-seq reads", "miRDeep2 → 6 novel candidates", "Target prediction (TargetScanFly, miRBase)", "Stem-loop RT-PCR validation"] }
    }
  },
  {
    title: "Protein Stability Prediction",
    description: "An MLPRegressor pipeline with Group K-Fold validation, using protein sequence embeddings and mutation data to predict ΔΔG changes, evaluated by Pearson correlation with one-hot encoding for mutation analysis.",
    tags: ["Scikit-learn", "Python", "ΔΔG"],
    github: "https://github.com/RishithaPulakhandam/Protein-Stability-Prediction",
    results: {
      objective: "Predict how much a given mutation destabilizes or stabilizes a protein (ΔΔG) directly from sequence and mutation information.",
      approach: [
        "Combined protein sequence embeddings with one-hot encoded mutation data as model input.",
        "Trained an MLPRegressor (neural network regressor) to predict ΔΔG for each mutation.",
        "Used GroupKFold cross-validation — grouping by protein rather than by individual mutation — specifically to prevent the model from leaking information about a protein it had already seen in another fold.",
        "Evaluated predictions against true ΔΔG values using Pearson correlation."
      ],
      keyResults: [
        "Model outputs a Pearson correlation score between predicted and actual ΔΔG values as the primary accuracy metric.",
        "GroupKFold (rather than standard K-Fold) was used deliberately to give a more honest estimate of how the model performs on entirely unseen proteins."
      ],
      interpretation: "The choice of GroupKFold over standard cross-validation is the key methodological detail here — without grouping by protein, a model can appear accurate simply by memorizing patterns from other mutations of the same protein, which wouldn't reflect real-world generalization to new proteins.",
      visual: { type: "flow", title: "Pipeline", steps: ["Sequence embeddings + one-hot mutation encoding", "MLPRegressor", "GroupKFold CV (by protein)", "Pearson correlation vs. true ΔΔG"] }
    }
  },
  {
    title: "Lung Cancer Trend Forecasting",
    description: "Forecasting models — ARIMA, SARIMA, and Random Forest — applied to lung cancer trend data, reaching 75% accuracy on forecasts.",
    tags: ["Random Forest", "Python", "ARIMA", "SARIMA"],
    results: {
      objective: "Forecast lung cancer incidence/mortality trends using time-series and machine learning approaches, and compare which modeling strategy generalizes best.",
      approach: [
        "Built and compared three forecasting approaches: ARIMA (captures trend and autocorrelation), SARIMA (adds seasonality), and Random Forest (a non-linear, non-time-series baseline).",
        "Trained each model on historical lung cancer trend data and evaluated forecast accuracy."
      ],
      keyResults: [
        "Best-performing model reached 75% forecast accuracy on lung cancer trend data."
      ],
      interpretation: "Testing a classical time-series model against a tree-based model on the same data is a useful sanity check — if a simpler ARIMA/SARIMA model performs competitively with Random Forest, that suggests the trend is largely driven by autocorrelation and seasonality rather than complex non-linear interactions.",
      visual: { type: "stat", value: "75%", label: "Best model forecast accuracy" }
    }
  }
];

// Skills shown as clickable chips — these are the ones that appear as tags
// on at least one project above, so every chip is clickable and meaningful.
const skillCategories = {
  "Programming": ["Python", "R", "JavaScript"],
  "Bioinformatics": ["RNA-seq", "scRNA-seq", "Seurat", "DESeq2", "miRDeep2"],
  "Data & ML": ["PCA", "k-NN", "Random Forest", "Scikit-learn"]
};

// Remaining tools from the resume that aren't tied to a specific project
// above — shown as a plain reference list beneath the heatmap.
const otherSkills = [
  "Bash", "C", "MySQL", "CSS", "Docker", "Git", "RDBMS", "NGS", "IGV",
  "Galaxy", "BWA", "STAR", "BLAST", "SRA Toolkit", "Chimera", "Samtools",
  "Kraken", "GATK", "BEDtools", "VCFtools", "ggplot2", "Biopython",
  "Power BI", "Nextflow", "SVM", "Linux", "HPC", "Azure", "UniProt",
  "NCBI", "AlphaFold", "Ensembl"
];

const roles = ["clinical NLP", "computational biology", "genomics & transcriptomics",
  "clinical data analytics","single-cell genomics", "precision oncology", "Computational biology"];

// ============================================================
// Hero read track
// ============================================================
(function buildTrack() {
  const seq = "TACGATCGGATCCAGTCATGCAGTACGGATCCGTAGCTAGCATG".split("");
  const colorClass = { A: "a", T: "t", C: "c", G: "g" };
  const track = document.getElementById("heroTrack");
  seq.forEach((base, i) => {
    const tick = document.createElement("span");
    tick.className = colorClass[base];
    const h = 8 + Math.abs(Math.sin(i * 1.7)) * 14;
    tick.style.height = h.toFixed(1) + "px";
    track.appendChild(tick);
  });
})();

// ============================================================
// Role cycling in the hero subhead
// ============================================================
(function cycleRoles() {
  const el = document.getElementById("roleCycle");
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced || !el) return;
  let i = 0;
  setInterval(() => {
    i = (i + 1) % roles.length;
    el.style.opacity = 0;
    setTimeout(() => {
      el.textContent = roles[i];
      el.style.opacity = 1;
    }, 250);
  }, 2800);
  el.style.transition = "opacity .25s ease";
})();

// ============================================================
// Mobile nav toggle
// ============================================================
(function navToggle() {
  const toggle = document.getElementById("navToggle");
  const navList = document.getElementById("navList");
  toggle.addEventListener("click", () => {
    const open = navList.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
  navList.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      navList.classList.remove("open");
      toggle.setAttribute("aria-expanded", false);
    });
  });
})();

// ============================================================
// Scroll-spy: highlight the current section's nav link
// ============================================================
(function scrollSpy() {
  const links = document.querySelectorAll("#navList a");
  const sections = Array.from(links).map((a) => document.querySelector(a.getAttribute("href")));
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = "#" + entry.target.id;
          links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === id));
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => s && observer.observe(s));
})();

// ============================================================
// Expandable experience entries
// ============================================================
(function expandableJobs() {
  document.querySelectorAll(".job-head").forEach((btn) => {
    btn.addEventListener("click", () => {
      const job = btn.closest(".job");
      const isOpen = job.getAttribute("data-open") === "true";
      job.setAttribute("data-open", String(!isOpen));
      btn.setAttribute("aria-expanded", String(!isOpen));
    });
  });
})();

// ============================================================
// Render project cards — whole card opens the detail modal
// ============================================================
function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  grid.innerHTML = "";
  projects.forEach((p, idx) => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.tags = p.tags.join("|").toLowerCase();
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-haspopup", "dialog");

    const h3 = document.createElement("h3");
    h3.textContent = p.title;
    const desc = document.createElement("p");
    desc.textContent = p.description;
    const tagWrap = document.createElement("div");
    tagWrap.className = "tags";
    p.tags.forEach((t) => {
      const span = document.createElement("span");
      span.textContent = t;
      span.dataset.tag = t.toLowerCase();
      tagWrap.appendChild(span);
    });

    card.appendChild(h3);
    card.appendChild(desc);
    card.appendChild(tagWrap);

    if (p.results) {
      const cue = document.createElement("span");
      cue.className = "card-cue";
      cue.textContent = "View project details →";
      card.appendChild(cue);
    } else if (p.github) {
      const cue = document.createElement("span");
      cue.className = "card-cue";
      cue.textContent = "View on GitHub →";
      card.appendChild(cue);
    }

    const openHandler = (e) => {
      // Don't hijack clicks on a real link inside the card
      if (e.target.closest("a")) return;
      openProjectModal(p);
    };
    card.addEventListener("click", openHandler);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openProjectModal(p);
      }
    });

    grid.appendChild(card);
  });
}

// ============================================================
// Project detail modal
// ============================================================
function openProjectModal(p) {
  const overlay = document.getElementById("modalOverlay");
  const content = document.getElementById("modalContent");

  const tagsHTML = p.tags.map((t) => `<span>${t}</span>`).join("");
  const githubHTML = p.github
    ? `<a class="repo-link" href="${p.github}" target="_blank" rel="noopener">View on GitHub →</a>`
    : "";

  content.innerHTML = `
    <h2 id="modalTitle">${p.title}</h2>
    <div class="tags modal-tags">${tagsHTML}</div>
    <p class="modal-desc">${p.description}</p>
    ${githubHTML}
    ${p.results ? buildResultsHTML(p.results) : ""}
  `;

  overlay.classList.add("open");
  overlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  document.getElementById("modalClose").focus();
}

function closeProjectModal() {
  const overlay = document.getElementById("modalOverlay");
  overlay.classList.remove("open");
  overlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

(function wireModal() {
  const overlay = document.getElementById("modalOverlay");
  document.getElementById("modalClose").addEventListener("click", closeProjectModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeProjectModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("open")) closeProjectModal();
  });
})();

function buildResultsHTML(r) {
  const list = (items) => `<ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;
  const highlightHTML = r.highlight
    ? `<div class="results-section"><span class="results-label">Notable Finding</span><p class="highlight-text">${r.highlight}</p></div>`
    : "";
  const visualsArr = r.visuals || (r.visual ? [r.visual] : []);
  const visualHTML = visualsArr.length
    ? `<div class="results-section"><span class="results-label">Visualization</span>${visualsArr.map(buildVisualHTML).join("")}</div>`
    : "";
  return `
    <div class="results-section">
      <span class="results-label">Objective</span>
      <p>${r.objective}</p>
    </div>
    <div class="results-section">
      <span class="results-label">Approach</span>
      ${list(r.approach)}
    </div>
    <div class="results-section">
      <span class="results-label">Key Results</span>
      ${list(r.keyResults)}
    </div>
    ${highlightHTML}
    ${visualHTML}
    <div class="results-section">
      <span class="results-label">Interpretation</span>
      <p>${r.interpretation}</p>
    </div>
  `;
}

// ---- SVG chart helpers ----
function scaleFn(domainMin, domainMax, rangeMin, rangeMax) {
  return (v) => rangeMin + ((v - domainMin) / (domainMax - domainMin)) * (rangeMax - rangeMin);
}

function svgScatter(groups, opts) {
  const W = 320, H = 190, padL = 30, padB = 26, padT = 14, padR = 14;
  const xs = scaleFn(0, 100, padL, W - padR);
  const ys = scaleFn(0, 100, H - padB, padT);
  const points = groups.map((g) =>
    g.points.map((p) => `<circle cx="${xs(p.x).toFixed(1)}" cy="${ys(p.y).toFixed(1)}" r="4.5" fill="${g.color}" fill-opacity="0.85" />`).join("")
  ).join("");
  const legend = groups.map((g) =>
    `<span class="viz-legend-item"><span class="viz-legend-dot" style="background:${g.color}"></span>${g.label}</span>`
  ).join("");
  return `
    <div class="viz viz-scatter">
      <span class="viz-title">${opts.title}</span>
      <svg viewBox="0 0 ${W} ${H}" class="viz-svg">
        <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${H - padB}" stroke="var(--line)" stroke-width="1" />
        <line x1="${padL}" y1="${H - padB}" x2="${W - padR}" y2="${H - padB}" stroke="var(--line)" stroke-width="1" />
        <text x="${padL - 6}" y="${padT + 6}" class="viz-axis-label" text-anchor="end">${opts.yLabel || ""}</text>
        <text x="${W - padR}" y="${H - padB + 16}" class="viz-axis-label" text-anchor="end">${opts.xLabel || ""}</text>
        ${points}
      </svg>
      <div class="viz-legend-row">${legend}</div>
      ${opts.note ? `<span class="viz-note">${opts.note}</span>` : ""}
    </div>`;
}

function svgLine(series, opts) {
  const W = 320, H = 190, padL = 32, padB = 26, padT = 14, padR = 14;
  const xs = scaleFn(opts.xMin, opts.xMax, padL, W - padR);
  const ys = scaleFn(opts.yMin, opts.yMax, H - padB, padT);
  const paths = series.map((s) => {
    const d = s.points.map((p, i) => `${i === 0 ? "M" : "L"}${xs(p.x).toFixed(1)},${ys(p.y).toFixed(1)}`).join(" ");
    return `<path d="${d}" fill="none" stroke="${s.color}" stroke-width="2.2" />`;
  }).join("");
  const xTicks = (opts.xTicks || []).map((t) =>
    `<text x="${xs(t).toFixed(1)}" y="${H - padB + 14}" class="viz-tick" text-anchor="middle">${t}</text>`
  ).join("");
  const legend = series.map((s) =>
    `<span class="viz-legend-item"><span class="viz-legend-dot" style="background:${s.color}"></span>${s.label}</span>`
  ).join("");
  return `
    <div class="viz viz-line">
      <span class="viz-title">${opts.title}</span>
      <svg viewBox="0 0 ${W} ${H}" class="viz-svg">
        <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${H - padB}" stroke="var(--line)" stroke-width="1" />
        <line x1="${padL}" y1="${H - padB}" x2="${W - padR}" y2="${H - padB}" stroke="var(--line)" stroke-width="1" />
        <text x="${padL - 8}" y="${padT + 6}" class="viz-axis-label" text-anchor="end">${opts.yLabel || ""}</text>
        <text x="${W - padR}" y="${H - padB + 16}" class="viz-axis-label" text-anchor="end">${opts.xLabel || ""}</text>
        ${xTicks}
        ${paths}
      </svg>
      <div class="viz-legend-row">${legend}</div>
      ${opts.note ? `<span class="viz-note">${opts.note}</span>` : ""}
    </div>`;
}

function buildVisualHTML(v) {
  if (v.type === "bars") {
    const rows = v.bars.map((b) => {
      const pct = b.raw ? 100 : Math.round((b.value / b.total) * 100);
      const displayValue = b.suffix ? `${b.value}${b.suffix}` : b.value;
      return `
        <div class="viz-bar-row">
          <span class="viz-bar-label">${b.label}</span>
          <div class="viz-bar-track"><div class="viz-bar-fill" style="width:${pct}%"></div></div>
          <span class="viz-bar-value">${displayValue}</span>
        </div>`;
    }).join("");
    return `<div class="viz viz-bars"><span class="viz-title">${v.title}</span>${rows}</div>`;
  }
  if (v.type === "flow") {
    const steps = v.steps.map((s, i) =>
      `<div class="viz-flow-step"><span class="viz-flow-num">${i + 1}</span><span>${s}</span></div>` +
      (i < v.steps.length - 1 ? `<div class="viz-flow-arrow">→</div>` : "")
    ).join("");
    return `<div class="viz viz-flow"><span class="viz-title">${v.title}</span><div class="viz-flow-track">${steps}</div></div>`;
  }
  if (v.type === "network") {
    const layers = v.layers.map((l, i) =>
      `<div class="viz-layer"><span class="viz-layer-label">${l.label}</span><span class="viz-layer-detail">${l.detail}</span></div>` +
      (i < v.layers.length - 1 ? `<div class="viz-flow-arrow">→</div>` : "")
    ).join("");
    return `<div class="viz viz-network"><span class="viz-title">${v.title}</span><div class="viz-flow-track">${layers}</div></div>`;
  }
  if (v.type === "legend") {
    const chips = v.items.map((i) => `<span class="viz-chip">${i}</span>`).join("");
    return `<div class="viz viz-legend"><span class="viz-title">${v.title}</span><div class="viz-chip-wrap">${chips}</div></div>`;
  }
  if (v.type === "stat") {
    return `<div class="viz viz-stat"><span class="viz-stat-value">${v.value}</span><span class="viz-stat-label">${v.label}</span></div>`;
  }
  if (v.type === "scatter") return svgScatter(v.groups, v);
  if (v.type === "line") return svgLine(v.series, v);
  return "";
}

// ============================================================
// Render the skills list and wire up filtering
// ============================================================
function renderSkillsList() {
  const container = document.getElementById("skillsList");
  container.innerHTML = "";
  let activeSkill = null;

  Object.entries(skillCategories).forEach(([category, skills]) => {
    const row = document.createElement("div");
    row.className = "skill-row";

    const label = document.createElement("div");
    label.className = "skill-label";
    label.textContent = category;
    row.appendChild(label);

    const cellsWrap = document.createElement("div");
    cellsWrap.className = "skill-cells";

    skills.forEach((skill) => {
      const cell = document.createElement("button");
      cell.className = "skill-chip";
      cell.type = "button";
      cell.textContent = skill;
      cell.dataset.skill = skill.toLowerCase();
      cell.setAttribute("aria-pressed", "false");

      cell.addEventListener("click", () => {
        const skillKey = cell.dataset.skill;
        activeSkill = activeSkill === skillKey ? null : skillKey;
        applyFilter(activeSkill);
        container.querySelectorAll(".skill-chip").forEach((c) => {
          const isActive = c.dataset.skill === activeSkill;
          c.classList.toggle("active", isActive);
          c.setAttribute("aria-pressed", String(isActive));
        });
      });

      cellsWrap.appendChild(cell);
    });

    row.appendChild(cellsWrap);
    container.appendChild(row);
  });

  // "Also used" static reference list — not tied to a specific project below
  const otherRow = document.createElement("div");
  otherRow.className = "skill-row";
  const otherLabel = document.createElement("div");
  otherLabel.className = "skill-label";
  otherLabel.textContent = "Also used";
  const otherCells = document.createElement("div");
  otherCells.className = "skill-cells";
  otherSkills.forEach((skill) => {
    const span = document.createElement("span");
    span.className = "skill-chip static";
    span.textContent = skill;
    otherCells.appendChild(span);
  });
  otherRow.appendChild(otherLabel);
  otherRow.appendChild(otherCells);
  container.appendChild(otherRow);
}

function applyFilter(skillKey) {
  const cards = document.querySelectorAll("#projectsGrid .card");
  const status = document.getElementById("filterStatus");

  cards.forEach((card) => {
    const tags = card.dataset.tags.split("|");
    const matches = !skillKey || tags.includes(skillKey);
    card.classList.toggle("hidden", !matches);
    card.querySelectorAll(".tags span").forEach((tagEl) => {
      tagEl.classList.toggle("match", skillKey && tagEl.dataset.tag === skillKey);
    });
  });

  if (skillKey) {
    const label = skillKey.replace(/\b\w/g, (c) => c.toUpperCase());
    const shown = document.querySelectorAll("#projectsGrid .card:not(.hidden)").length;
    status.innerHTML = `Showing ${shown} project${shown === 1 ? "" : "s"} using ${label}.<button id="clearFilter" type="button">Clear</button>`;
    document.getElementById("clearFilter").addEventListener("click", () => {
      applyFilter(null);
      document.querySelectorAll(".skill-chip").forEach((c) => {
        c.classList.remove("active");
        c.setAttribute("aria-pressed", "false");
      });
    });
  } else {
    status.textContent = "";
  }
}

renderProjects();
renderSkillsList();
