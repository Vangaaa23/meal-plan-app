// validateStep.js
// Restituisce un oggetto { valid: boolean, errors: { campo: "messaggio" } }
// per ogni step del form.

export function validateStep(step, formData) {
  const errors = {}

  if (step === 0) {
    const { first_name, age, height_cm, weight_kg } = formData.personal
    if (!first_name.trim())          errors.first_name  = 'Inserisci il tuo nome'
    if (!age || age < 16 || age > 99)errors.age         = 'Età non valida (16–99)'
    if (!height_cm || height_cm < 100 || height_cm > 250)
                                      errors.height_cm   = 'Altezza non valida (100–250 cm)'
    if (!weight_kg || weight_kg < 30 || weight_kg > 300)
                                      errors.weight_kg   = 'Peso non valido (30–300 kg)'
  }

  if (step === 1) {
    // dietary_style ha sempre un valore di default → nessun check obbligatorio
    // Aggiungiamo solo un controllo opzionale per gli esclusi
  }

  if (step === 2) {
    // Nessun campo obbligatorio — il livello di attività ha già un default
  }

  if (step === 3) {
    const { duration_weeks } = formData.plan
    if (!duration_weeks || duration_weeks < 1 || duration_weeks > 4)
      errors.duration_weeks = 'Scegli una durata tra 1 e 4 settimane'
  }

  return {
    valid:  Object.keys(errors).length === 0,
    errors,
  }
}