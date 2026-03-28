# Client Dossier HTML Template
**Full HTML Template:**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dossier — [Company Name] | JM Labs</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Inter:wght@400;500&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg:#0d0d0d; --card:#1a1a2e; --navy:#122562;
      --gold:#FFD700; --blue:#137DC5; --text:#e0e0e0; --muted:#9e9e9e;
    }
    * { box-sizing:border-box; margin:0; padding:0; }
    body { background:var(--bg); color:var(--text); font-family:'Inter',sans-serif; padding:2rem; max-width:960px; margin:0 auto; }
    h1,h2,h3 { font-family:'Poppins',sans-serif; }
    .header { border-left:4px solid var(--gold); padding-left:1.25rem; margin-bottom:2rem; }
    .header h1 { color:var(--gold); font-size:2rem; }
    .header .meta { color:var(--muted); font-size:0.82rem; margin-top:0.3rem; }
    .section { background:var(--card); border-radius:8px; padding:1.5rem; margin-bottom:1.5rem; border-top:3px solid var(--navy); }
    .section h2 { color:var(--blue); font-size:1rem; font-weight:600; margin-bottom:1rem; text-transform:uppercase; letter-spacing:0.06em; }
    .grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:1rem; }
    .data-row { display:flex; justify-content:space-between; padding:0.4rem 0; border-bottom:1px solid #2a2a3e; font-size:0.875rem; }
    .data-row .label { color:var(--muted); }
    .data-row .value { color:var(--text); font-weight:500; text-align:right; max-width:60%; }
    .contact-card { background:#12122a; border-radius:6px; padding:1rem; border-left:3px solid var(--gold); }
    .contact-card .name { color:var(--gold); font-family:'Poppins',sans-serif; font-weight:600; }
    .contact-card .title { color:var(--muted); font-size:0.82rem; margin-bottom:0.5rem; }
    .contact-card p { font-size:0.85rem; line-height:1.5; }
    .pain-item { padding:0.75rem 1rem; background:#1f1f35; border-radius:4px; margin-bottom:0.5rem; }
    .pain-item .pain-label { font-weight:600; font-size:0.9rem; }
    .pain-item .evidence { color:var(--muted); font-size:0.8rem; margin-top:0.25rem; }
    .tag { display:inline-block; background:var(--navy); color:var(--gold); padding:0.2rem 0.6rem; border-radius:4px; font-size:0.75rem; margin:0.15rem; font-family:'Poppins',sans-serif; }
    .badge-urgent { background:#5a1010; color:#ff9999; }
    .badge-medium { background:#3a3a00; color:#ffe066; }
    .badge-inferred { background:#1a2a1a; color:#88cc88; }
    .strategy { counter-reset:step; list-style:none; }
    .strategy li { counter-increment:step; display:flex; gap:1rem; margin-bottom:1.25rem; align-items:flex-start; }
    .strategy li::before { content:counter(step); min-width:2rem; height:2rem; background:var(--gold); color:#000; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:700; font-family:'Poppins',sans-serif; flex-shrink:0; font-size:0.9rem; }
    .strategy .step-body strong { color:var(--text); font-size:0.9rem; display:block; }
    .strategy .step-body span { color:var(--muted); font-size:0.82rem; line-height:1.5; }
    .tldr { background:#111128; border-left:4px solid var(--gold); padding:1rem 1.25rem; border-radius:0 6px 6px 0; margin-bottom:2rem; }
    .tldr h3 { color:var(--gold); font-size:0.85rem; text-transform:uppercase; letter-spacing:0.08em; margin-bottom:0.5rem; }
    .tldr ul { list-style:none; }
    .tldr li { color:var(--text); font-size:0.88rem; padding:0.2rem 0; }
    .tldr li::before { content:"→ "; color:var(--gold); }
    .footer { text-align:center; color:var(--muted); font-size:0.75rem; margin-top:3rem; padding-top:1rem; border-top:1px solid #2a2a3e; }
    @media print {
      body { background:#fff; color:#000; padding:1rem; }
      .section { background:#f8f8f8; border-color:#ccc; page-break-inside:avoid; }
      .contact-card { background:#f0f0f0; }
      .header h1,.section h2 { color:#122562; }
      .tag { background:#122562; color:#FFD700; }
    }
  </style>
</head>
<body>

  <div class="header">
    <h1 data-l="es">[Company Name]</h1>
    <p class="meta" data-l="es">Dossier de Inteligencia Comercial · JM Labs · [DATE] · Confidencial</p>
    <p class="meta" data-l="en" style="display:none">Commercial Intelligence Dossier · JM Labs · [DATE] · Confidential</p>
  </div>

  <!-- TL;DR Executive Brief -->
  <div class="tldr">
    <h3 data-l="es">Resumen ejecutivo</h3>
    <ul>
      <li data-l="es">[Key finding 1: company stage + primary pain]</li>
      <li data-l="es">[Key finding 2: best contact + entry angle]</li>
      <li data-l="es">[Key finding 3: urgency driver + recommended ask]</li>
    </ul>
  </div>

  <!-- S1: Company DNA -->
  <div class="section">
    <h2 data-l="es">ADN de la Empresa</h2>
    <div class="grid-2">
      <div>
        <div class="data-row"><span class="label" data-l="es">Empresa</span><span class="value">[Company]</span></div>
        <div class="data-row"><span class="label" data-l="es">Industria</span><span class="value">[Industry]</span></div>
        <div class="data-row"><span class="label" data-l="es">Fundada</span><span class="value">[Year]</span></div>
        <div class="data-row"><span class="label" data-l="es">Etapa</span><span class="value">[Stage]</span></div>
        <div class="data-row"><span class="label" data-l="es">Sede</span><span class="value">[HQ Location]</span></div>
      </div>
      <div>
        <div class="data-row"><span class="label" data-l="es">Empleados</span><span class="value">[Headcount] [est.]</span></div>
        <div class="data-row"><span class="label" data-l="es">Ingresos est.</span><span class="value">[Revenue range] [est.]</span></div>
        <div class="data-row"><span class="label" data-l="es">Financiamiento</span><span class="value">[Last round + date]</span></div>
        <div class="data-row"><span class="label" data-l="es">Modelo</span><span class="value">[B2B SaaS / services / etc.]</span></div>
        <div class="data-row"><span class="label" data-l="es">Sitio web</span><span class="value"><a href="[URL]" style="color:var(--blue)">[domain]</a></span></div>
      </div>
    </div>
    <div style="margin-top:1rem;">
      <p style="color:var(--muted);font-size:0.8rem;margin-bottom:0.5rem;" data-l="es">Stack tecnológico inferido:</p>
      <span class="tag">[Tech 1]</span><span class="tag">[Tech 2]</span><span class="tag">[Tech 3]</span><span class="tag badge-inferred">[est.]</span>
    </div>
    <p style="margin-top:1rem;font-size:0.85rem;color:var(--muted);" data-l="es">
      Última señal relevante: [News item or trigger event — date]
    </p>
  </div>

  <!-- S2: Key Contacts -->
  <div class="section">
    <h2 data-l="es">Mapa de Contactos Clave</h2>
    <div class="grid-2">
      <div class="contact-card">
        <div class="name">[Decision Maker Name]</div>
        <div class="title">[Title] · [X] años en la empresa</div>
        <p>[2-sentence career arc. Prior companies. What they talk about publicly.]</p>
        <p style="margin-top:0.5rem;"><span class="tag">[Best channel]</span><span class="tag badge-inferred">[email pattern est.]</span></p>
      </div>
      <div class="contact-card">
        <div class="name">[Champion / Influencer Name]</div>
        <div class="title">[Title] · [X] años en la empresa</div>
        <p>[2-sentence profile. LinkedIn active. Likely internal champion for our type of solution.]</p>
        <p style="margin-top:0.5rem;"><span class="tag">[Best channel]</span></p>
      </div>
    </div>
    <p style="margin-top:1rem;font-size:0.82rem;color:var(--muted);" data-l="es">
      Conexión mutua: [Name + path] · Gatekeeper: [EA name if known]
    </p>
  </div>

  <!-- S3: Pain Hypotheses -->
  <div class="section">
    <h2 data-l="es">Hipótesis de Dolor</h2>
    <div class="pain-item">
      <div class="pain-label">[Primary Pain — 1-sentence label] <span class="tag badge-urgent">Urgente · Alta confianza</span></div>
      <div class="evidence" data-l="es">Evidencia: [Signal 1 + source] · [Signal 2 + source]</div>
      <div class="evidence" data-l="es">Hook: [How our offering maps to this pain in 1 line]</div>
    </div>
    <div class="pain-item">
      <div class="pain-label">[Secondary Pain] <span class="tag badge-medium">Media confianza</span></div>
      <div class="evidence" data-l="es">Evidencia: [Signal 1] · Pregunta de validación: [Q to ask on the call]</div>
    </div>
    <div class="pain-item">
      <div class="pain-label">[Tertiary Pain — optional]</div>
      <div class="evidence" data-l="es">Evidencia: [Signal 1] · Confianza: Baja — validar antes de mencionar</div>
    </div>
  </div>

  <!-- S4: Approach Strategy -->
  <div class="section">
    <h2 data-l="es">Estrategia de Entrada</h2>
    <ol class="strategy">
      <li>
        <div class="step-body">
          <strong data-l="es">Ángulo de apertura: [Hook type — news-led / pain-led / peer-led]</strong>
          <span data-l="es">[Opening message draft — 2 sentences, specific, one soft ask]</span>
        </div>
      </li>
      <li>
        <div class="step-body">
          <strong data-l="es">LinkedIn — Conexión + mensaje (Día 1)</strong>
          <span data-l="es">[1-paragraph LinkedIn message text. Trigger + pain + ask.]</span>
        </div>
      </li>
      <li>
        <div class="step-body">
          <strong data-l="es">Email de seguimiento (Día 5)</strong>
          <span data-l="es">Asunto: [Subject line] · Primer párrafo: [Opening line that adds new value]</span>
        </div>
      </li>
      <li>
        <div class="step-body">
          <strong data-l="es">Intro cálida vía [Mutual Connection] — si aplica</strong>
          <span data-l="es">[Brief note on how to activate this path]</span>
        </div>
      </li>
    </ol>
  </div>

  <div class="footer">
    <p data-l="es">JM Labs Intelligence · Uso interno · No distribuir sin autorización · [DATE]</p>
  </div>

</body>
</html>
```

> [EXPLICIT] Replace every `[placeholder]` with researched data before delivery.
> Label any inferred or estimated field with `[est.]` or `[INFERRED]` inline.
> Do not deliver a dossier with unfilled placeholders.

---

