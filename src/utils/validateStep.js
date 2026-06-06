export function validateStep(step, formData) {
  const errors = {}

  if (step === 0) {
    const { first_name, age, height_cm, weight_kg } = formData.personal
    if (!first_name.trim())                            errors.first_name = 'Inserisci il tuo nome'
    if (!age || age < 16 || age > 99)                 errors.age        = 'Età non valida (16–99)'
    if (!height_cm || height_cm < 100 || height_cm > 250) errors.height_cm = 'Altezza non valida (100–250 cm)'
    if (!weight_kg || weight_kg < 30  || weight_kg > 300) errors.weight_kg = 'Peso non valido (30–300 kg)'
  }

  // Step 1, 2, 3, 4: nessun campo strettamente obbligatorio

  if (step === 5) {
    const { macro_targets } = formData.plan
    const anyMacro = macro_targets.protein_pct || macro_targets.carbohydrates_pct || macro_targets.fat_pct
    if (anyMacro) {
      const sum = ['protein_pct','carbohydrates_pct','fat_pct']
        .reduce((s, k) => s + (Number(macro_targets[k]) || 0), 0)
      if (sum !== 100) errors.macro_targets = `I macro devono sommare a 100% (attuale: ${sum}%)`
    }
  }

  return { valid: Object.keys(errors).length === 0, errors }
}