// buildJson.js
// Converte i dati del form React nella struttura del meal_plan_template.json

function getDateRange(durationWeeks) {
  const start = new Date()
  const end   = new Date()
  end.setDate(end.getDate() + durationWeeks * 7 - 1)

  const fmt = d => d.toISOString().split('T')[0] // → "YYYY-MM-DD"
  return { startDate: fmt(start), endDate: fmt(end) }
}

function buildWeeklySchedule(trainingDays) {
  const allDays = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday']
  return allDays.map(day => ({
    day,
    activities: trainingDays.includes(day)
      ? [{
          type:         'training',
          period:       'evening',
          start_time:   '18:00',
          duration_min: 60,
          effort:       'medium',
        }]
      : [],
  }))
}

export function buildJson(formData) {
  const { personal, dietary, activity, plan } = formData
  const { startDate, endDate } = getDateRange(plan.duration_weeks)

  // Calcolo BMI automatico
  const bmi = personal.height_cm && personal.weight_kg
    ? Number((personal.weight_kg / Math.pow(personal.height_cm / 100, 2)).toFixed(1))
    : null

  // Alimenti esclusi: stringa con virgole → array
  const excludedFoods = dietary.excluded_foods
    ? dietary.excluded_foods.split(',').map(f => f.trim()).filter(Boolean)
    : []

  return {
    user_profile: {
      personal: {
        first_name: personal.first_name || 'Utente',
        age:        Number(personal.age),
        gender:     personal.gender,
      },
      physical: {
        height_cm:          Number(personal.height_cm),
        weight_kg:          Number(personal.weight_kg),
        bmi,
        body_fat_percentage: null,
        muscle_mass_kg:      null,
        waist_cm:            null,
        goal:               personal.goal,
      },
      health: {
        conditions:  [],
        medications: [],
      },
      output_language: 'it',
    },

    plan_settings: {
      duration_weeks:            plan.duration_weeks,
      prefer_seasonal_and_fresh: true,
      caloric_target_kcal_day:   plan.caloric_target_kcal_day
        ? Number(plan.caloric_target_kcal_day)
        : null,
      macro_targets: null,
      budget_level:  plan.budget_level,
      plan_start: { date: startDate, meal: 'breakfast' },
      plan_end:   { date: endDate,   meal: 'dinner'    },
    },

    physical_activity: {
      general_level:   activity.general_level,
      weekly_schedule: buildWeeklySchedule(activity.training_days),
    },

    dietary_constraints: {
      allergies:          dietary.allergies,
      intolerances:       dietary.intolerances,
      dietary_style:      dietary.dietary_style,
      excluded_foods:     excludedFoods,
      excluded_ingredients: [],
    },

    food_preferences: {
      preferred_foods:      [],
      cuisine_preferences:  plan.cuisine_preferences,
      cuisine_to_avoid:     [],
      meal_repetition: {
        max_same_meal_per_week: 2,
        allow_leftover_meals:   true,
      },
    },

    meal_structure: {
      meals_per_day: 4,
      meal_slots: [
        { id: 'breakfast',     label: 'Colazione',        approx_time: '07:30' },
        { id: 'morning_snack', label: 'Spuntino mattina', approx_time: '10:30' },
        { id: 'lunch',         label: 'Pranzo',           approx_time: '13:00' },
        { id: 'dinner',        label: 'Cena',             approx_time: '19:30' },
      ],
      main_meals:         ['breakfast', 'lunch', 'dinner'],
      hydration_reminder: true,
    },

    meal_prep: {
      enabled: false,
    },

    recipe_sources: {
      fallback_to_NB_recipes: true,
    },
  }
}

// Scarica un oggetto JS come file .json nel browser
export function downloadJson(data, filename = 'meal-plan-profile.json') {
  const text = JSON.stringify(data, null, 2)
  const blob = new Blob([text], { type: 'application/json' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href     = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}