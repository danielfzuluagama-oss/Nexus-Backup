import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  assessProposalIntake,
  buildProposalClarificationReply,
} from "../../src/proposals/proposal-intake.js";

const acConsultoresRequest = readFileSync(
  new URL("../fixtures/proposals/ac-consultores-request.txt", import.meta.url),
  "utf8",
);

describe("proposal intake", () => {
  it("flags incomplete proposal requests before generation", () => {
    const assessment = assessProposalIntake(
      "Necesito una propuesta comercial en html.",
    );

    expect(assessment.isReady).toBe(false);
    expect(assessment.missingRequiredFields.map((field) => field.id)).toEqual([
      "client_name",
      "service_name",
      "objective",
    ]);
  });

  it("accepts proposal requests with enough business context", () => {
    const assessment = assessProposalIntake(
      [
        "Necesito una propuesta comercial para Acme Corp.",
        "Servicio: desarrollo de agentes.",
        "Objetivo: acelerar la preventa y reducir tiempos de respuesta.",
        "Modalidad virtual para equipo comercial.",
        "Cronograma: 6 semanas.",
        "Moneda: USD, inversion pendiente.",
        "Siguiente paso: preparar version final para presentacion.",
      ].join(" "),
    );

    expect(assessment.isReady).toBe(true);
    expect(assessment.snapshot.clientName).toBe("Acme Corp");
    expect(assessment.snapshot.serviceName).toBe("Desarrollo de Agentes");
    expect(assessment.snapshot.timeline).toContain("6 semanas");
  });

  it("cleans the client name and infers the service from the request", () => {
    const assessment = assessProposalIntake(
      [
        "Necesito una propuesta comercial para Mansuela de Ecuador https.",
        "Servicio: ofimática con IA en Google Workspace.",
        "Objetivo: ordenar la operación administrativa y reducir trabajo manual.",
        "Cronograma: 6 semanas.",
        "Siguiente paso: enviar versión final.",
      ].join(" "),
    );

    expect(assessment.isReady).toBe(true);
    expect(assessment.snapshot.clientName).toBe("Mansuela de Ecuador");
    expect(assessment.snapshot.serviceName).toBe("Ofimática con IA en Google Workspace");
    expect(assessment.snapshot.objective).toContain("ordenar la operación administrativa");
  });

  it("extracts a concise objective from a noisy commercial request", () => {
    const assessment = assessProposalIntake(
      [
        "Quiero que hagas una propuesta comercial para el cliente Mansuela de Ecuador https://www.mansuera.com/.",
        "En el cual se ejecutará ofimática con IA enfocado en Google Workspace, Gemini, propuestas comerciales y presentaciones.",
        "El grupo será de 25 a 30 personas, durará 20 horas y empieza en la semana del 13 de abril.",
      ].join(" "),
    );

    expect(assessment.snapshot.clientName).toBe("Mansuela de Ecuador");
    expect(assessment.snapshot.objective).toContain("ofimática con IA");
    expect(assessment.snapshot.objective).not.toContain("Quiero que hagas");
    expect(assessment.snapshot.objective).not.toContain("https://");
  });

  it("keeps the client and objective clean for a long proposal brief", () => {
    const assessment = assessProposalIntake(
      [
        "Quiero que hagas una propuesta comercial para el cliente santafeenergy de medellin colombia, en el cual se ejecutará ofimática con IA enfocado en la plataforma de workspace de google donde se enseñará a gemini, se enseñará a hacer propuestas comerciales, se enseñará a hacer presentaciones.",
        "Recorre todos los SOP que tenemos para que documentes muy bien esta propuesta comercial.",
        "El grupo será de 25 a 30 personas.",
        "Será ejecutado en 20 horas que se propone empezar en la semana del 13 de abril y serán clases tal cual como lo muestra la metodología de workshops, clínicas y masterclass.",
        "Revisa toda tu documentación y la informacion sobre este servicio en la pagina de metodologIA antes de llenar la plantilla de HTML.",
      ].join(" "),
    );

    expect(assessment.isReady).toBe(true);
    expect(assessment.snapshot.clientName).toBe("Santafeenergy de Medellin Colombia");
    expect(assessment.snapshot.objective).toContain("ofimática con IA");
    expect(assessment.snapshot.objective).not.toContain("Quiero que hagas");
    expect(assessment.snapshot.objective).not.toContain("Revisa toda tu documentación");
  });

  it("strips template instructions from noisy proposal requests", () => {
    const assessment = assessProposalIntake(
      [
        "Quiero que me ayudes a construir una propuesta comercial para el cliente IEB consuiltores de energia, verifica la plantilla de propuesta y todo lo que debas llenar en ella preguntamelo antes de generarla.",
        "Esta es la plantilla que pretendo generar.",
      ].join(" "),
    );

    expect(assessment.snapshot.clientName).toBe("IEB Consuiltores de Energia");
    expect(assessment.snapshot.objective ?? "").not.toMatch(/verifica|plantilla|preguntamelo/i);
  });

  it("parses the A&C consultores request without leaking prompt or publishing instructions", () => {
    const assessment = assessProposalIntake(acConsultoresRequest);

    expect(assessment.isReady).toBe(true);
    expect(assessment.snapshot.clientName).toBe("A&C Consultores");
    expect(assessment.snapshot.serviceName).toBe("Ofimática con IA");
    expect(assessment.snapshot.geography).toContain("medellin");
    expect(assessment.snapshot.scope).toContain("programa");
    expect(assessment.snapshot.timeline).toContain("13 de abril");
    expect(assessment.snapshot.nextStep).toContain("cotizar espacio de kickoff");
    expect(assessment.snapshot.objective ?? "").toContain("ofimática con IA");
    expect(assessment.snapshot.objective ?? "").not.toMatch(/github|plantilla|preguntamelo|adjunto/i);
  });

  it("builds a clarification reply listing known and missing fields", () => {
    const assessment = assessProposalIntake(
      "Necesito una propuesta comercial para Acme Corp en html.",
    );
    const reply = buildProposalClarificationReply(assessment);

    expect(reply).toContain("Antes de generar la propuesta completa");
    expect(reply).toContain("<b>Cliente:</b>");
    expect(reply).toContain("Objetivo o problema");
  });
});
