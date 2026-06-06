import { useState } from 'react'
import PersonalSection       from './components/form/PersonalSection'
import DietarySection        from './components/form/DietarySection'
import ActivitySection       from './components/form/ActivitySection'
import FoodPreferencesSection from './components/form/FoodPreferencesSection'
import MealPrepSection       from './components/form/MealPrepSection'
import PlanSection           from './components/form/PlanSection'
import JsonExportStep        from './components/output/JsonExportStep'
import { validateStep }      from './utils/validateStep'
import './App.css'

const DAYS_EN = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday']

const DEFAULT_DAY = {
  active: false, type: 'gym', focus: '', period: 'evening',
  start_time: '18:00', duration_min: 60, effort: 'medium',
}

const INITIAL_FORM = {
  personal: {
    first_name: '', last_name: '', age: '', gender: 'male', email: '',
    height_cm: '', weight_kg: '', body_fat_percentage: '', waist_cm: '',
    goal: 'maintain_weight', conditions: '', medications: '',
  },
  dietary: {
    dietary_style: 'omnivore', allergies: [], intolerances: [],
    excluded_foods: '', excluded_ingredients: '', cuisine_to_avoid: [],
  },
  activity: {
    general_level: 'moderately_active',
    weekly_schedule: Object.fromEntries(DAYS_EN.map(d => [d, { ...DEFAULT_DAY }])),
  },
  preferences: {
    preferred_foods: [],
    protein_source_limits: {
      pollo: 4, tacchino: 2, manzo: 2, maiale: 1, uova: 3,
      salmone: 2, tonno: 2, merluzzo: 1, gamberi: 1, legumi: 3, formaggio: 2,
    },
    max_same_meal_per_week: 2,
    allow_leftover_meals: true,
    meal_slot_repetition: {
      breakfast:     { min_times_per_week: null, max_times_per_week: 5 },
      morning_snack: { min_times_per_week: null, max_times_per_week: 3 },
      lunch:         { min_times_per_week: null, max_times_per_week: 2 },
      dinner:        { min_times_per_week: null, max_times_per_week: 2 },
    },
  },
  mealPrep: {
    enabled: false, prefer_batch_cooking: true, fridge_days: 4, freezer: true,
    sessions: [{
      prep_day: 'sunday', covers_days: [],
      lunch_portable: true, dinner_portable: false,
    }],
  },
  plan: {
    duration_weeks: 2, start_date: '', caloric_target_kcal_day: '',
    macro_targets: { protein_pct: '', carbohydrates_pct: '', fat_pct: '' },
    budget_level: 'medium', prefer_seasonal_and_fresh: true,
    cuisine_preferences: [],
  },
}

const STEPS = ['Profilo', 'Dieta', 'Attività', 'Preferenze', 'Meal Prep', 'Piano']

function App() {
  const [step, setStep]         = useState(0)
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [exported, setExported] = useState(false)
  const [errors, setErrors]     = useState({})
  const [shake, setShake]       = useState(false)

  function updateSection(section, newValues) {
    setFormData(prev => ({ ...prev, [section]: { ...prev[section], ...newValues } }))
    const changed = Object.keys(newValues)[0]
    if (changed in errors) {
      setErrors(prev => { const e = { ...prev }; delete e[changed]; return e })
    }
  }

  function goNext() {
    const { valid, errors: newErrors } = validateStep(step, formData)
    if (!valid) {
      setErrors(newErrors)
      setShake(true)
      setTimeout(() => setShake(false), 500)
      return
    }
    setErrors({})
    setStep(s => Math.min(s + 1, STEPS.length - 1))
  }

  function goPrev() {
    setErrors({})
    setStep(s => Math.max(s - 1, 0))
  }

  function handleExport() {
    const { valid, errors: newErrors } = validateStep(step, formData)
    if (!valid) { setErrors(newErrors); return }
    setExported(true)
  }

  function handleReset() {
    setExported(false); setStep(0)
    setFormData(INITIAL_FORM); setErrors({})
  }

  if (exported) {
    return (
      <div className="app-container">
        <header className="app-header">
          <h1>🥗 Meal Plan Generator</h1>
          <p>Piano alimentare personalizzato con AI</p>
        </header>
        <JsonExportStep formData={formData} onReset={handleReset} />
      </div>
    )
  }

  const lastStep = STEPS.length - 1

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🥗 Meal Plan Generator</h1>
        <p>Piano alimentare personalizzato con AI</p>
      </header>

      <nav className="step-nav">
        {STEPS.map((label, i) => (
          <div
            key={label}
            className={`step-dot ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}
            onClick={() => i < step && (setErrors({}), setStep(i))}
            style={{ cursor: i < step ? 'pointer' : 'default' }}
          >
            <span className="step-number">{i < step ? '✓' : i + 1}</span>
            <span className="step-label">{label}</span>
          </div>
        ))}
      </nav>

      <main className={`app-main ${shake ? 'shake' : ''}`}>
        {Object.keys(errors).length > 0 && (
          <div className="error-banner">⚠️ Compila i campi evidenziati per continuare</div>
        )}

        <div className="step-fade" key={step}>
          {step === 0 && <PersonalSection        data={formData.personal}     onChange={v => updateSection('personal',     v)} errors={errors} />}
          {step === 1 && <DietarySection         data={formData.dietary}      onChange={v => updateSection('dietary',      v)} errors={errors} />}
          {step === 2 && <ActivitySection        data={formData.activity}     onChange={v => updateSection('activity',     v)} errors={errors} />}
          {step === 3 && <FoodPreferencesSection data={formData.preferences}  onChange={v => updateSection('preferences',  v)} errors={errors} />}
          {step === 4 && <MealPrepSection        data={formData.mealPrep}     onChange={v => updateSection('mealPrep',     v)} errors={errors} />}
          {step === 5 && <PlanSection            data={formData.plan}         onChange={v => updateSection('plan',         v)} errors={errors} />}
        </div>

        <div className="form-nav">
          {step > 0 && <button className="btn-secondary" onClick={goPrev}>← Indietro</button>}
          {step < lastStep
            ? <button className="btn-primary" onClick={goNext}>Avanti →</button>
            : <button className="btn-primary btn-generate" onClick={handleExport}>📄 Genera il mio JSON</button>
          }
        </div>
      </main>
    </div>
  )
}

export default App