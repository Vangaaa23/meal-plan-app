// buildJson.js — v2.0 — copre tutti i campi del meal_plan_template.json

function toArray(str) {
  return str ? str.split(',').map(s => s.trim()).filter(Boolean) : []
}

function getStartDate(str) {
  return str || new Date().toISOString().split('T')[0]
}

function getEndDate(startStr, weeks) {
  const d = new Date(startStr || new Date())
  d.setDate(d.getDate() + weeks * 7 - 1)
  return d.toISOString().split('T')[0]
}

function buildWeeklySchedule(weeklySchedule) {
  const DAYS = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday']
  return DAYS.map(day => {
    const d = weeklySchedule[day]
    return {
      day,
      activities: d.active
        ? [{ type: d.type, focus: d.focus || null, period: d.period,
             start_time: d.start_time, duration_min: d.duration_min, effort: d.effort }]
        : [],
    }
  })
}

function buildMealPrepSessions(sessions) {
  return sessions
    .filter(s => s.covers_days.length > 0)
    .map(session => {
      const covers_meals = {}
      session.covers_days.forEach(day => {
        covers_meals[day] = [
          { slot_id: 'lunch',  portable: session.lunch_portable  },
          { slot_id: 'dinner', portable: session.dinner_portable },
        ]
      })
      return {
        prep_day:    session.prep_day,
        covers_days: session.covers_days,
        covers_meals,
      }
    })
}

export function buildJson(formData) {
  const { personal, dietary, activity, preferences, mealPrep, plan } = formData

  const startDate = getStartDate(plan.start_date)
  const endDate   = getEndDate(plan.start_date, plan.duration_weeks)

  const bmi = personal.height_cm && personal.weight_kg
    ? Number((personal.weight_kg / Math.pow(personal.height_cm / 100, 2)).toFixed(1))
    : null

  const allMacros = plan.macro_targets.protein_pct &&
                    plan.macro_targets.carbohydrates_pct &&
                    plan.macro_targets.fat_pct
  const macroTargets = allMacros
    ? {
        protein_pct:       Number(plan.macro_targets.protein_pct),
        carbohydrates_pct: Number(plan.macro_targets.carbohydrates_pct),
        fat_pct:           Number(plan.macro_targets.fat_pct),
      }
    : null

  // meal_slot_repetition: object → array
  const mealSlotRepetition = Object.entries(preferences.meal_slot_repetition)
    .map(([slot_id, vals]) => ({
      slot_id,
      min_times_per_week: vals.min_times_per_week,
      max_times_per_week: vals.max_times_per_week,
    }))

  // preferred_foods
  const preferredFoods = preferences.preferred_foods.map(f => ({
    food:               f.food,
    pin_to_meal:        f.pin_to_meal || null,
    pin_to_day:         null,
    max_times_per_week: f.max_times_per_week,
  }))

  return {
    user_profile: {
      personal: {
        first_name: personal.first_name || 'Utente',
        last_name:  personal.last_name  || null,
        age:        Number(personal.age),
        gender:     personal.gender,
        email:      personal.email      || null,
      },
      physical: {
        height_cm:           Number(personal.height_cm),
        weight_kg:           Number(personal.weight_kg),
        bmi,
        body_fat_percentage: personal.body_fat_percentage ? Number(personal.body_fat_percentage) : null,
        muscle_mass_kg:      null,
        waist_cm:            personal.waist_cm ? Number(personal.waist_cm) : null,
        goal:                personal.goal,
      },
      health: {
        conditions:  toArray(personal.conditions),
        medications: toArray(personal.medications),
      },
      output_language: 'it',
    },

    plan_settings: {
      duration_weeks:            plan.duration_weeks,
      prefer_seasonal_and_fresh: plan.prefer_seasonal_and_fresh,
      caloric_target_kcal_day:   plan.caloric_target_kcal_day ? Number(plan.caloric_target_kcal_day) : null,
      macro_targets:             macroTargets,
      budget_level:              plan.budget_level,
      plan_start: { date: startDate, meal: 'breakfast' },
      plan_end:   { date: endDate,   meal: 'dinner'    },
    },

    physical_activity: {
      general_level:   activity.general_level,
      weekly_schedule: buildWeeklySchedule(activity.weekly_schedule),
    },

    dietary_constraints: {
      allergies:            dietary.allergies,
      intolerances:         dietary.intolerances,
      dietary_style:        dietary.dietary_style,
      excluded_foods:       toArray(dietary.excluded_foods),
      excluded_ingredients: toArray(dietary.excluded_ingredients),
    },

    food_preferences: {
      preferred_foods:      preferredFoods,
      cuisine_preferences:  plan.cuisine_preferences,
      cuisine_to_avoid:     dietary.cuisine_to_avoid,
      meal_slot_repetition: mealSlotRepetition,
      meal_repetition: {
        max_same_meal_per_week: preferences.max_same_meal_per_week,
        allow_leftover_meals:   preferences.allow_leftover_meals,
      },
      protein_source_limits: preferences.protein_source_limits,
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
      enabled:              mealPrep.enabled,
      sessions:             mealPrep.enabled ? buildMealPrepSessions(mealPrep.sessions) : [],
      storage_available: {
        fridge_days: mealPrep.fridge_days,
        freezer:     mealPrep.freezer,
      },
      prefer_batch_cooking: mealPrep.prefer_batch_cooking,
    },

    recipe_sources: {
      priority_order: [{
        id: 'NB_recipes', label: 'Ricette originali assistente',
        file: null, allow: true, note: 'Ricette generate automaticamente',
      }],
      fallback_to_NB_recipes: true,
    },
  }
}

export function downloadJson(data, filename = 'meal-plan-profile.json') {
  const text = JSON.stringify(data, null, 2)
  const blob = new Blob([text], { type: 'application/json' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href = url; a.download = filename
  document.body.appendChild(a); a.click()
  document.body.removeChild(a); URL.revokeObjectURL(url)
}