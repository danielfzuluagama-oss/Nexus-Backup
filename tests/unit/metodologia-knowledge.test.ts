import { describe, expect, it } from "vitest";
import { loadMetodologiaKnowledge } from "../../src/proposals/metodologia-knowledge.js";

const foundersHtml = `
<!doctype html>
<html lang="es">
  <head>
    <title>Nosotros | Estrategas de la (R)Evolución Digital | MetodologIA</title>
    <meta name="description" content="Conoce al equipo de MetodologIA.">
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "mainEntity": {
        "@type": "Organization",
        "member": [
          { "@type": "Person", "name": "Daniel Zuluaga", "jobTitle": "Chief Efficiency Officer", "description": "Optimización y Eficiencia Operativa" },
          { "@type": "Person", "name": "Germán Eliécer Sepúlveda", "jobTitle": "Chief Ecosystem Officer", "description": "Ecosistemas y Alianzas" },
          { "@type": "Person", "name": "Javier Montaño", "jobTitle": "Chief Empowerment Officer", "description": "(R)Evolución Estratégica" },
          { "@type": "Person", "name": "Katherine Oquendo", "jobTitle": "Chief Enablement Officer", "description": "Entornos Habilitadores y Experiencia" }
        ]
      }
    }
    </script>
  </head>
  <body>
    <h3>Daniel Zuluaga</h3>
    <p>Chief Efficiency Officer</p>
    <p>Optimización y Eficiencia Operativa</p>
    <p>Optimizador de procesos que transforma la complejidad en eficiencia.</p>
    <h3>Germán Eliécer Sepúlveda</h3>
    <p>Chief Ecosystem Officer</p>
    <p>Ecosistemas y Alianzas</p>
    <p>Constructor de ecosistemas que conectan talento, visión y propósito.</p>
    <h3>Javier Montaño</h3>
    <p>Chief Empowerment Officer</p>
    <p>(R)Evolución Estratégica</p>
    <p>Diseñador de sistemas y metodologías que convierten potencial en resultados.</p>
    <h3>Katherine Oquendo</h3>
    <p>Chief Enablement Officer</p>
    <p>Entornos Habilitadores y Experiencia</p>
    <p>Líder que cree en la presencia antes que la velocidad.</p>
  </body>
</html>
`;

const servicesHtml = `
<!doctype html>
<html lang="es">
  <head>
    <title>Catálogo de Servicios | MetodologIA</title>
    <meta name="description" content="Catálogo de Servicios de Venta Amplificada: Workshops, Bootcamps y Consultoría de alto rendimiento potenciada con IA.">
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "item": {
            "@type": "Course",
            "name": "Workshop Venta Amplificada",
            "description": "Formación intensiva para equipos comerciales (B2B).",
            "offers": { "@type": "Offer", "price": "3000000", "priceCurrency": "COP" }
          }
        },
        {
          "@type": "ListItem",
          "item": {
            "@type": "Course",
            "name": "Bootcamp Ventas IA",
            "description": "Programa inmersivo de 3 semanas para dominar la Venta Amplificada.",
            "offers": { "@type": "Offer", "price": "12000000", "priceCurrency": "COP" }
          }
        }
      ]
    }
    </script>
  </head>
  <body></body>
</html>
`;

const resourcesHtml = `
<!doctype html>
<html lang="es">
  <head>
    <title>Recursos y Herramientas IA | MetodologIA</title>
    <meta name="description" content="Kit táctico de MetodologIA: Bibliotecas de Prompts, Mini-Apps y Guías de automatización.">
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Recursos y Herramientas IA",
      "description": "Biblioteca táctica de prompts, playbooks y mini-apps para la soberanía digital, profesional y estratégica.",
      "hasPart": [
        { "@type": "CreativeWork", "name": "Asistentes GPT/Gemini", "description": "Agentes IA pre-configurados" },
        { "@type": "CreativeWork", "name": "Playbooks Estratégicos", "description": "Guías paso a paso" },
        { "@type": "CreativeWork", "name": "Mini-Apps", "description": "Herramientas tácticas de IA" },
        { "@type": "CreativeWork", "name": "Ebooks", "description": "Literatura de profundidad" }
      ]
    }
    </script>
  </head>
  <body></body>
</html>
`;

describe("metodologia knowledge loader", () => {
  it("extracts services, resources, and founder bios from public pages", async () => {
    const knowledge = await loadMetodologiaKnowledge(async (url) => {
      if (url.includes("/nosotros/")) return foundersHtml;
      if (url.includes("/servicios/")) return servicesHtml;
      if (url.includes("/recursos/")) return resourcesHtml;
      throw new Error(`Unexpected URL: ${url}`);
    });

    expect(knowledge.services).toHaveLength(2);
    expect(knowledge.services[0].title).toBe("Workshop Venta Amplificada");
    expect(knowledge.services[0].description).toContain("Formación intensiva");
    expect(knowledge.resources).toHaveLength(4);
    expect(knowledge.resources[0].title).toBe("Asistentes GPT/Gemini");
    expect(knowledge.founders).toHaveLength(4);
    expect(knowledge.founders[0].name).toBe("Daniel Zuluaga");
    expect(knowledge.founders[0].bio).toContain("Optimización y Eficiencia Operativa");
    expect(knowledge.founders[2].bio).toContain("Diseñador de sistemas");
  });
});
