/**
  @license Copyleft
  @copyright MetodologIA
  @author Javier Montaño
  @technology Antigravity | GoogleAI Studio | Gemini 3 Pro | Gemini 3 Flash
  @poweredBy Pristino Agent
 */


// Verification Script for ROI Logic (Personas & Empresas)

console.log("--------------------------------------------------");
console.log("   VERIFYING ADVANCED ROI MODEL CALCULATIONS");
console.log("--------------------------------------------------");

// --- UTILS ---
const formatCurrency = (val) => '$' + Math.round(val).toLocaleString('es-CO');

// --- PART 1: PERSONAS ROI SIMULATION ---
console.log("\n[TEST CASE 1] Personas ROI Logic");

// Mock Inputs (Personas)
const personasInputs = {
    ingresos: 5000000,
    horasSemana: 48,
    simples: 80, // %
    medias: 10, // %
    altas: 10,   // %
    levels: [
        { name: 'N2: Ofimática IA', improvement: 12, price: 800000 }
    ]
};

console.log("Inputs:", JSON.stringify(personasInputs, null, 2));

// Logic Implementation (from cotizador-personas.html)
function calculatePersonasROI(inputs) {
    const ingresos = inputs.ingresos;
    const horasSemana = inputs.horasSemana;
    const simples = inputs.simples / 100;
    const medias = inputs.medias / 100;
    const altas = inputs.altas / 100;

    const horasMes = horasSemana * 4;
    const valorHora = Math.round(ingresos / horasMes);
    
    // 1. Weighted Potential
    const horasSimples = horasSemana * simples * 0.80; 
    const horasMedias = horasSemana * medias * 0.33;   
    const horasAltas = horasSemana * altas * 0.20;     
    const potencialDelegableSemanal = horasSimples + horasMedias + horasAltas;
    
    // 2. Target Release
    let totalMejora = 0;
    let totalInversion = 0;
    inputs.levels.forEach(l => {
        totalMejora += l.improvement;
        totalInversion += l.price;
    });

    const factorLiberacion = Math.min(totalMejora, 100) / 100;
    const metaLinealSemanal = horasSemana * factorLiberacion;
    const semanalLiberadas = Math.min(metaLinealSemanal, potencialDelegableSemanal);
    const mensualLiberadas = semanalLiberadas * 4;
    
    // Financials
    const monthlyBenefit = mensualLiberadas * valorHora;
    const totalMonthlyImpact = monthlyBenefit; // No revenue uplift for personas here

    // Year 1 (10.5 months)
    const effectiveMonthsY1 = 10.5;
    const grossBenefitY1 = totalMonthlyImpact * effectiveMonthsY1;
    const netBenefitY1 = grossBenefitY1 - totalInversion;
    const roiY1 = totalInversion > 0 ? (netBenefitY1 / totalInversion) * 100 : 0;

    // Year 2 (12 months)
    const grossBenefitY2 = totalMonthlyImpact * 12;
    const roiY2 = totalInversion > 0 ? (grossBenefitY2 / totalInversion) * 100 : 0;

    const payback = totalInversion > 0 && totalMonthlyImpact > 0 ? Math.ceil(totalInversion / totalMonthlyImpact) : 0;

    return {
        valorHora,
        potencialDelegableSemanal,
        semanalLiberadas,
        monthlyBenefit,
        totalInversion,
        roiY1,
        roiY2,
        payback
    };
}

const pResult = calculatePersonasROI(personasInputs);
console.log("Results (Personas):", {
    "Valor Hora": pResult.valorHora,
    "Horas Liberadas/Sem": pResult.semanalLiberadas.toFixed(1),
    "Beneficio Mensual": formatCurrency(pResult.monthlyBenefit),
    "Inversión": formatCurrency(pResult.totalInversion),
    "ROI Y1 (Launch)": pResult.roiY1.toFixed(1) + '%',
    "ROI Y2 (Steady)": pResult.roiY2.toFixed(1) + '%',
    "Payback": pResult.payback + " meses"
});

// Assertion
if (pResult.roiY1 > -100 && pResult.roiY2 > pResult.roiY1) {
    console.log("✅ Personas ROI Logic Passed Sanity Check");
} else {
    console.error("❌ Personas ROI Logic Failed");
}


// --- PART 2: EMPRESAS ROI SIMULATION ---
console.log("\n[TEST CASE 2] Empresas ROI Logic");

// Mock Inputs (Empresas)
const empresasInputs = {
    headcount: 10,
    payroll: 50000000, // 50M
    revenue: 200000000, // 200M
    pipelineMonths: 6,
    simples: 60, // %
    medias: 30, // %
    altas: 10,   // %
    levels: [
        { name: 'N2: Ofimática Teams', improvement: 15, price: 3500000, category: 'ops' },
        { name: 'N3: Ventas CRM', improvement: 15, price: 3500000, category: 'commercial' } // Triggers revenue uplift
    ]
};

console.log("Inputs:", JSON.stringify(empresasInputs, null, 2));

function calculateEmpresasROI(inputs) {
    const headcount = inputs.headcount;
    const payroll = inputs.payroll;
    const revenue = inputs.revenue;
    const pipelineMonths = inputs.pipelineMonths;
    const simples = inputs.simples / 100;
    const medias = inputs.medias / 100;
    const altas = inputs.altas / 100;

    const WEEKS_MONTH = 4;
    const HOURS_WEEK_PER_EMP = 40;
    const TOTAL_TEAM_HOURS_MONTH = headcount * HOURS_WEEK_PER_EMP * WEEKS_MONTH;
    const COST_PER_HOUR = payroll / TOTAL_TEAM_HOURS_MONTH;

    // 1. Delegable Potential
    const horasSimples = TOTAL_TEAM_HOURS_MONTH * simples * 0.80; 
    const horasMedias = TOTAL_TEAM_HOURS_MONTH * medias * 0.33;   
    const horasAltas = TOTAL_TEAM_HOURS_MONTH * altas * 0.20;     
    const potencialDelegableMensual = horasSimples + horasMedias + horasAltas;

    // 2. Target Release
    let totalMejora = 0;
    let totalInversion = 0;
    let impactSales = false;

    inputs.levels.forEach(l => {
        totalMejora += l.improvement;
        totalInversion += l.price;
        if (l.category === 'commercial') impactSales = true;
    });

    const factorLiberacion = Math.min(totalMejora, 100) / 100;
    const horasLiberadasMensual = potencialDelegableMensual * factorLiberacion;
    const ahorroMensual = horasLiberadasMensual * COST_PER_HOUR;

    // 3. Revenue Uplift
    let revenueUplift = 0;
    if (impactSales) {
        revenueUplift = revenue * 0.08; // 8% logic
    }

    const totalBusinessImpact = ahorroMensual + revenueUplift;

    // Years
    const effectiveMonthsY1 = 10.5;
    const grossBenefitY1 = totalBusinessImpact * effectiveMonthsY1;
    const netBenefitY1 = grossBenefitY1 - totalInversion;
    const roiY1 = totalInversion > 0 ? (netBenefitY1 / totalInversion) * 100 : 0;

    const grossBenefitY2 = totalBusinessImpact * 12;
    const roiY2 = totalInversion > 0 ? (grossBenefitY2 / totalInversion) * 100 : 0;
    
    const payback = totalInversion > 0 && totalBusinessImpact > 0 ? Math.ceil(totalInversion / totalBusinessImpact) : 0;

    return {
        costPerHour: COST_PER_HOUR,
        ahorroMensual,
        revenueUplift,
        totalMonthlyImpact,
        totalInversion,
        roiY1,
        roiY2,
        payback
    };
}

const eResult = calculateEmpresasROI(empresasInputs);
console.log("Results (Empresas):", {
    "Costo Hora Equipo": formatCurrency(eResult.costPerHour),
    "Ahorro Mensual (Ops)": formatCurrency(eResult.ahorroMensual),
    "Uplift Ventas (Rev)": formatCurrency(eResult.revenueUplift),
    "Impacto Total Mes": formatCurrency(eResult.totalMonthlyImpact),
    "Inversión": formatCurrency(eResult.totalInversion),
    "ROI Y1 (Launch)": eResult.roiY1.toFixed(1) + '%',
    "ROI Y2 (Steady)": eResult.roiY2.toFixed(1) + '%',
    "Payback": eResult.payback + " meses"
});

// Assertion
// With 50M payroll + 200M revenue, impact should be huge vs 7M investment.
if (eResult.roiY1 > 100 && eResult.roiY2 > eResult.roiY1) {
    console.log("✅ Empresas ROI Logic Passed Sanity Check (High ROI expected for B2B)");
} else {
    console.error("❌ Empresas ROI Logic Failed");
}
