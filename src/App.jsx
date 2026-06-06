import { useState } from 'react'
import PersonalSection from './components/form/PersonalSection'
import DietarySection  from './components/form/DietarySection'
import ActivitySection from './components/form/ActivitySection'
import PlanSection     from './components/form/PlanSection'
import JsonExportStep  from './components/output/JsonExportStep'
import './App.css'

const INITIAL_FORM = {
  personal: { first_name: '', age: '', gender: 'male', height_cm: '', weight_kg: '', goal: 'maintain_weight' },
  dietary:  { dietary_style: 'omnivore', allergies: [], intolerances: [], excluded_foods: '' },
  activity: { general_level: 'moderately_active', training_days: [] },
  plan:     { duration_weeks: 2, caloric_target_kcal_day: '', cuisine_preferences: [], budget_level: 'medium' },
}

const STEPS = ['Profilo', 'Dieta', 'Attività', 'Piano']

function App() {
  const [step, setStep]         = useState(0)
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [exported, setExported] = useState(false)  // true = mostra schermata export

  function updateSection(section, newValues) {
    setFormData(prev => ({ ...prev, [section]: { ...prev[section], ...newValues } }))
  }

  function goNext() { setStep(s => Math.min(s + 1, 3)) }
  function goPrev() { setStep(s => Math.max(s - 1, 0)) }

  function handleReset() {
    setExported(false)
    setStep(0)
    setFormData(INITIAL_FORM)
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

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🥗 Meal Plan Generator</h1>
        <p>Piano alimentare personalizzato con AI</p>
      </header>

      <nav className="step-nav">
        {STEPS.map((label, i) => (
          <div key={label} className={`step-dot ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
            <span className="step-number">{i < step ? '✓' : i + 1}</span>
            <span className="step-label">{label}</span>
          </div>
        ))}
      </nav>

      <main className="app-main">
        {step === 0 && <PersonalSection  data={formData.personal} onChange={v => updateSection('personal', v)} />}
        {step === 1 && <DietarySection   data={formData.dietary}  onChange={v => updateSection('dietary',  v)} />}
        {step === 2 && <ActivitySection  data={formData.activity} onChange={v => updateSection('activity', v)} />}
        {step === 3 && <PlanSection      data={formData.plan}     onChange={v => updateSection('plan',     v)} />}

        <div className="form-nav">
          {step > 0 && (
            <button className="btn-secondary" onClick={goPrev}>← Indietro</button>
          )}
          {step < 3
            ? <button className="btn-primary" onClick={goNext}>Avanti →</button>
            : <button className="btn-primary btn-generate" onClick={() => setExported(true)}>
                📄 Genera il mio JSON
              </button>
          }
        </div>
      </main>
    </div>
  )
}

export default App