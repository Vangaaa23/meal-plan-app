import { useState } from 'react'
import { buildJson, downloadJson } from '../../utils/buildJson'

const GOAL_LABELS = {
  lose_weight:       'Perdere peso',
  gain_muscle:       'Aumentare massa muscolare',
  maintain_weight:   'Mantenere il peso',
  improve_endurance: 'Migliorare la resistenza',
}

const PROMPT_TEXT = `Questo file contiene il mio profilo nutrizionale. Generami un piano alimentare settimanale dettagliato in italiano, con colazione, spuntino, pranzo e cena per ogni giorno, rispettando tutti i vincoli indicati. Includi anche la lista della spesa organizzata per categoria.`

function JsonExportStep({ formData, onReset }) {
  const [copied, setCopied] = useState(false)

  function handleDownload() {
    const json     = buildJson(formData)
    const filename = `piano-${formData.personal.first_name || 'utente'}.json`
    downloadJson(json, filename)
  }

  function handleCopy() {
    navigator.clipboard.writeText(PROMPT_TEXT).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  const { personal, dietary, activity, plan } = formData

  return (
    <div className="export-container">

      <div className="export-hero">
        <span className="export-icon">✅</span>
        <h2>Profilo completato!</h2>
        <p>Il tuo file JSON è pronto. Scaricalo e portalo su Claude per generare il piano.</p>
      </div>

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

      <button className="btn-download" onClick={handleDownload}>
        ⬇️ Scarica il file JSON
      </button>

      <div className="instructions-box">
        <h3 className="instructions-title">Come usare il file su Claude</h3>
        <ol className="instructions-list">
          <li>
            <span className="step-badge">1</span>
            <p>Vai su <a href="https://claude.ai" target="_blank" rel="noreferrer">claude.ai</a> e apri una nuova chat</p>
          </li>
          <li>
            <span className="step-badge">2</span>
            <p>Allega il file JSON scaricato con l'icona <strong>📎</strong></p>
          </li>
          <li>
            <span className="step-badge">3</span>
            <div style={{ width: '100%' }}>
              <p>Invia questo messaggio (clicca per copiarlo):</p>
              <div className="prompt-box">
                <p>{PROMPT_TEXT}</p>
                <button className="btn-copy" onClick={handleCopy}>
                  {copied ? '✓ Copiato!' : '📋 Copia'}
                </button>
              </div>
            </div>
          </li>
          <li>
            <span className="step-badge">4</span>
            <p>Claude leggerà il JSON e genererà il piano personalizzato 🎉</p>
          </li>
        </ol>
      </div>

      <div className="export-actions">
        <button className="btn-secondary" onClick={onReset}>← Modifica il profilo</button>
      </div>

    </div>
  )
}

export default JsonExportStep