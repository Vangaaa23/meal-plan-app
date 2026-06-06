// JsonExportStep.jsx
// Schermata finale: scarica il JSON e istruzioni per usarlo su claude.ai

import { buildJson, downloadJson } from '../../utils/buildJson'

const GOAL_LABELS = {
  lose_weight:       'Perdere peso',
  gain_muscle:       'Aumentare massa muscolare',
  maintain_weight:   'Mantenere il peso',
  improve_endurance: 'Migliorare la resistenza',
}

function JsonExportStep({ formData, onReset }) {
  function handleDownload() {
    const json     = buildJson(formData)
    const filename = `piano-${formData.personal.first_name || 'utente'}.json`
    downloadJson(json, filename)
  }

  const { personal, dietary, activity, plan } = formData

  return (
    <div className="export-container">

      {/* Intestazione */}
      <div className="export-hero">
        <span className="export-icon">✅</span>
        <h2>Profilo completato!</h2>
        <p>Il tuo file JSON è pronto. Scaricalo e portalo su Claude per generare il piano.</p>
      </div>

      {/* Riepilogo dati */}
      <div className="export-summary">
        <h3 className="summary-section-title">📋 Riepilogo profilo</h3>
        <div className="summary-chips-grid">

          <div className="summary-chip">
            <span className="chip-icon">👤</span>
            <div>
              <p className="chip-label">Nome</p>
              <p className="chip-value">{personal.first_name || '—'}</p>
            </div>
          </div>

          <div className="summary-chip">
            <span className="chip-icon">📏</span>
            <div>
              <p className="chip-label">Fisico</p>
              <p className="chip-value">{personal.height_cm} cm · {personal.weight_kg} kg</p>
            </div>
          </div>

          <div className="summary-chip">
            <span className="chip-icon">🎯</span>
            <div>
              <p className="chip-label">Obiettivo</p>
              <p className="chip-value">{GOAL_LABELS[personal.goal] || personal.goal}</p>
            </div>
          </div>

          <div className="summary-chip">
            <span className="chip-icon">🥦</span>
            <div>
              <p className="chip-label">Dieta</p>
              <p className="chip-value">{dietary.dietary_style}</p>
            </div>
          </div>

          <div className="summary-chip">
            <span className="chip-icon">🏃</span>
            <div>
              <p className="chip-label">Attività</p>
              <p className="chip-value">{activity.training_days.length} giorni/sett.</p>
            </div>
          </div>

          <div className="summary-chip">
            <span className="chip-icon">📅</span>
            <div>
              <p className="chip-label">Durata piano</p>
              <p className="chip-value">{plan.duration_weeks} {plan.duration_weeks === 1 ? 'settimana' : 'settimane'}</p>
            </div>
          </div>

        </div>

        {dietary.allergies.length > 0 && (
          <p className="summary-alert">
            ⚠️ Allergie incluse nel JSON: <strong>{dietary.allergies.join(', ')}</strong>
          </p>
        )}
      </div>

      {/* Bottone download */}
      <button className="btn-download" onClick={handleDownload}>
        ⬇️ Scarica il file JSON
      </button>

      {/* Istruzioni passo per passo */}
      <div className="instructions-box">
        <h3 className="instructions-title">Come usare il file su Claude</h3>
        <ol className="instructions-list">
          <li>
            <span className="step-badge">1</span>
            <div>
              <p>Vai su <a href="https://claude.ai" target="_blank" rel="noreferrer">claude.ai</a> e apri una nuova chat</p>
            </div>
          </li>
          <li>
            <span className="step-badge">2</span>
            <div>
              <p>Allega il file JSON appena scaricato usando l'icona <strong>📎</strong> nella chat</p>
            </div>
          </li>
          <li>
            <span className="step-badge">3</span>
            <div>
              <p>Invia questo messaggio:</p>
              <div className="prompt-box">
                Questo file contiene il mio profilo nutrizionale. Generami un piano alimentare settimanale dettagliato in italiano, con colazione, spuntino, pranzo e cena per ogni giorno, rispettando tutti i vincoli indicati. Includi anche la lista della spesa organizzata per categoria.
              </div>
            </div>
          </li>
          <li>
            <span className="step-badge">4</span>
            <div>
              <p>Claude leggerà il JSON e genererà il piano personalizzato 🎉</p>
            </div>
          </li>
        </ol>
      </div>

      {/* Azione secondaria */}
      <div className="export-actions">
        <button className="btn-secondary" onClick={onReset}>
          ← Modifica il profilo
        </button>
      </div>

    </div>
  )
}

export default JsonExportStep