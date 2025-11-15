// Tradutor de mensagens em inglês para português

//  (?) Níveis de impacto, possivelmente útil
//  -------------------------------------------------
//  const impactLevels = [
//      "Menor",
//      "Moderado", 
//      "Sério",
//      "Critical"
//  ]
//
//  const translateImpact = (impact) => {
//      switch (impact) {
//          case "minor":
//              return "Menor";
//  
//          case "moderate":
//              return "Moderado";
//  
//          case "serious":
//              return "Sério";
//  
//          case "critical":
//              return "Crítico";
//  
//          default:
//              break;
//      }
//      return "Erro ao definir impacto";
//  }
//  ----------------------------------------------------------

//  (?) Wrapper de tradução, caso haja mais coisa a traduzir
//  ----------------------------------------------------------
//  const translate = (results) => {
//      results.violations.forEach( violation => translateViolation(violation));
//  }
//  ----------------------------------------------------------

const translateViolation = (violation) => {
    const id = violation.id;
    // const violationDescription = ptBRrules.rules[id].description;
    // const violationImpact = translateImpact(violation.impact);
    const violationHelp = ptBRrules.rules[id].help;
    violation.help = violationHelp;
}