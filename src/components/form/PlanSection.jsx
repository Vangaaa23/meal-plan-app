// PlanSection.jsx
// Impostazioni finali del piano: durata, calorie, cucine preferite

const CUISINE_OPTIONS = ['Italiana', 'Mediterranea', 'Giapponese', 'Greca', 'Francese', 'Asiatica']

function PlanSection({ data, onChange }) {
  function toggleCuisine(cuisine) {
    const current = data.cuisine_preferences
    const updated  = current.includes(cuisine)
      ? current.filter(c => c !== cuisine)
      : [...current, cuisine]
    onChange({ cuisine_preferences: updated })
  }

  return (
    <div className="form-section">
      <h2 className="section-title">📋 Impostazioni piano</h2>
      <p className="section-desc">Ultimi dettagli per personalizzare il tuo piano.</p>

      <div className="field-row">
        <div className="field-group">
          <label className="field-label" htmlFor="duration_weeks">Durata (settimane)</label>
          <select
            id="duration_weeks"
            className="field-input"
            value={data.duration_weeks}
            onChange={e => onChange({ duration_weeks: Number(e.target.value) })}
          >
            <option value={1}>1 settimana</option>
            <option value={2}>2 settimane</option>
            <option value={3}>3 settimane</option>
            <option value={4}>4 settimane</option>
          </select>
        </div>

        <div className="field-group">
          <label className="field-label" htmlFor="budget_level">Budget spesa</label>
          <select
            id="budget_level"
            className="field-input"
            value={data.budget_level}
            onChange={e => onChange({ budget_level: e.target.value })}
          >
            <option value="low">Basso (ingredienti economici)</option>
            <option value="medium">Medio</option>
            <option value="high">Alto (ingredienti premium)</option>
          </select>
        </div>
      </div>

      <div className="field-group">
        <label className="field-label" htmlFor="calories">
          Target calorico giornaliero (lascia vuoto per calcolo automatico)
        </label>
        <input
          id="calories"
          className="field-input"
          type="number"
          placeholder="Es. 2100 kcal"
          min="1200" max="5000" step="50"
          value={data.caloric_target_kcal_day}
          onChange={e => onChange({ caloric_target_kcal_day: e.target.value })}
        />
      </div>

      <div className="field-group">
        <span className="field-label">Cucine preferite</span>
        <div className="checkbox-grid">
          {CUISINE_OPTIONS.map(c => (
            <label key={c} className="checkbox-label">
              <input
                type="checkbox"
                checked={data.cuisine_preferences.includes(c)}
                onChange={() => toggleCuisine(c)}
              />
              {c}
            </label>
          ))}
        </div>
      </div>

      <div className="summary-box">
        <p className="summary-title">📌 Riepilogo rapido</p>
        <p>Durata: <strong>{data.duration_weeks} {data.duration_weeks === 1 ? 'settimana' : 'settimane'}</strong></p>
        <p>Budget: <strong>{data.budget_level}</strong></p>
        <p>Cucine: <strong>{data.cuisine_preferences.length > 0 ? data.cuisine_preferences.join(', ') : 'nessuna preferenza'}</strong></p>
      </div>
    </div>
  )
}

export default PlanSection