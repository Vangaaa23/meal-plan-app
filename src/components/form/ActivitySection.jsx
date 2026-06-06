// ActivitySection.jsx
// Raccoglie il livello di attività fisica e i giorni di allenamento

const DAYS = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica']
const DAYS_EN = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

function ActivitySection({ data, onChange }) {
  function toggleDay(dayEn) {
    const current = data.training_days
    const updated  = current.includes(dayEn)
      ? current.filter(d => d !== dayEn)
      : [...current, dayEn]
    onChange({ training_days: updated })
  }

  return (
    <div className="form-section">
      <h2 className="section-title">🏃 Attività fisica</h2>
      <p className="section-desc">Serve a calcolare il fabbisogno calorico giornaliero.</p>

      <div className="field-group">
        <label className="field-label" htmlFor="general_level">Livello di attività generale</label>
        <select
          id="general_level"
          className="field-input"
          value={data.general_level}
          onChange={e => onChange({ general_level: e.target.value })}
        >
          <option value="sedentary">Sedentario (lavoro a scrivania, niente sport)</option>
          <option value="lightly_active">Leggermente attivo (1-2 allenamenti/sett.)</option>
          <option value="moderately_active">Moderatamente attivo (3-4 allenamenti/sett.)</option>
          <option value="very_active">Molto attivo (5+ allenamenti/sett. o lavoro fisico)</option>
        </select>
      </div>

      <div className="field-group">
        <span className="field-label">Giorni di allenamento</span>
        <div className="day-grid">
          {DAYS.map((label, i) => {
            const dayEn = DAYS_EN[i]
            const active = data.training_days.includes(dayEn)
            return (
              <button
                key={dayEn}
                type="button"
                className={`day-btn ${active ? 'day-btn--active' : ''}`}
                onClick={() => toggleDay(dayEn)}
              >
                {label.slice(0, 3)}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ActivitySection