import { useState } from 'react'
import PersonalSection  from './components/form/PersonalSection'
import DietarySection   from './components/form/DietarySection'
import ActivitySection  from './components/form/ActivitySection'
import PlanSection      from './components/form/PlanSection'
import './App.css'

// Stato iniziale del form — rispecchia la struttura del JSON template
const INITIAL_FORM = {
  personal: {
    first_name: '',
    age: '',
    gender: 'male',
    height_cm: '',
    weight_kg: '',
    goal: 'maintain_weight',
  },
  dietary: {
    dietary_style: 'omnivore',
    allergies: [],
    intolerances: [],
    excluded_foods: '',
  },
  activity: {
    general_level: 'moderately_active',
    training_days: [],
  },
  plan: {
    duration_weeks: 2,
    caloric_target_kcal_day: '',
    cuisine_preferences: [],
    budget_level: 'medium',
  },
}

const STEPS = ['Profilo', 'Dieta', 'Attività', 'Piano']

function App() {
  const [step, setStep]       = useState(0)       // step corrente (0-3)
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [appState, setAppState] = useState('form') // 'form' | 'loading' | 'result'

  // Aggiorna una sezione del form mantenendo tutti gli altri dati intatti
  // section = 'personal' | 'dietary' | 'activity' | 'plan'
  function updateSection(section, newValues) {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...newValues }
    }))
  }

  function goNext() { setStep(s => Math.min(s + 1, 3)) }
  function goPrev() { setStep(s => Math.max(s - 1, 0)) }

  function handleSubmit() {
    console.log('JSON da inviare:', JSON.stringify(formData, null, 2))
    setAppState('loading') // nella Fase 4 qui chiameremo l'API
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🥗 Meal Plan Generator</h1>
        <p>Piano alimentare personalizzato con AI</p>
      </header>

      {/* Indicatore di step */}
      <nav className="step-nav" aria-label="Progresso form">
        {STEPS.map((label, i) => (
          <div
            key={label}
            className={`step-dot ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}
          >
            <span className="step-number">{i < step ? '✓' : i + 1}</span>
            <span className="step-label">{label}</span>
          </div>
        ))}
      </nav>

      <main className="app-main">
        {appState === 'form' && (
          <>
            {step === 0 && (
              <PersonalSection
                data={formData.personal}
                onChange={v => updateSection('personal', v)}
              />
            )}
            {step === 1 && (
              <DietarySection
                data={formData.dietary}
                onChange={v => updateSection('dietary', v)}
              />
            )}
            {step === 2 && (
              <ActivitySection
                data={formData.activity}
                onChange={v => updateSection('activity', v)}
              />
            )}
            {step === 3 && (
              <PlanSection
                data={formData.plan}
                onChange={v => updateSection('plan', v)}
              />
            )}

            {/* Navigazione tra step */}
            <div className="form-nav">
              {step > 0 && (
                <button className="btn-secondary" onClick={goPrev}>
                  ← Indietro
                </button>
              )}
              {step < 3 ? (
                <button className="btn-primary" onClick={goNext}>
                  Avanti →
                </button>
              ) : (
                <button className="btn-primary btn-generate" onClick={handleSubmit}>
                  🚀 Genera il mio piano
                </button>
              )}
            </div>
          </>
        )}

        {appState === 'loading' && (
          <div className="loading-state">
            <div className="spinner" />
            <p>Sto generando il tuo piano personalizzato...</p>
            <button className="btn-secondary" onClick={() => setAppState('form')}>
              Torna al form
            </button>
          </div>
        )}

        {appState === 'result' && (
          <div>
            <p>Risultato in arrivo nella Fase 4!</p>
            <button className="btn-secondary" onClick={() => setAppState('form')}>
              ← Nuovo piano
            </button>
          </div>
        )}
      </main>
    </div>
  )
}

export default App