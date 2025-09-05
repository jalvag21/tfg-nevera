// Reglas simples de frescura (0-100)
export function computeFreshness(food, recentTemps = []){
  const now = new Date();
  let score = 100;

  if(food.expiryDate){
    const msLeft = new Date(food.expiryDate) - now;
    const daysLeft = msLeft / (1000*60*60*24);
    const horizon = categoryHorizon(food.category);
    const base = Math.max(0, Math.min(100, (daysLeft / horizon) * 100));
    score = Math.min(score, base);
  }

  if(food.openDate){
    const daysOpen = (now - new Date(food.openDate)) / (1000*60*60*24);
    score -= 2 * Math.max(0, daysOpen);
  }

  // Penalización por desviaciones térmicas
  const { upper, lower } = tempBounds(food.category);
  for(const t of recentTemps){
    if(t > upper) score -= (t - upper) * 5;
    if(t < lower) score -= (lower - t) * 2;
  }

  return Math.max(0, Math.round(score));
}

function categoryHorizon(cat){
  switch(cat){
    case 'pescado': return 2;
    case 'carne': return 4;
    case 'huevo': return 5;
    case 'lacteo': return 7;
    case 'verdura': return 10;
    case 'fruta': return 12;
    case 'preparado': return 3;
    default: return 14;
  }
}

function tempBounds(cat){
  // límites aproximados
  return { lower: 0, upper: 6 };
}
