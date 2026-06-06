const CUISINE_OPTIONS = ['Italiana','Mediterranea','Giapponese','Greca','Francese','Asiatica','Mediorientale']

function PlanSection({ data, onChange, errors = {} }) {
  const today = new Date().toISOString().split('T')[0]

  const macroSum = ['protein_pct','carbohydrates_pct','fat_pct']
    .reduce((sum, k) => sum + (Number(data.macro_targets[k]) || 0), 0)
  const anyMacro = data.macro_targets.protein_pct || data.macro_targets.carbohydrates_pct || data.macro_targets.fat_pct
  const macroOk  = macroSum === 100

  function updateMacro(key, val) {
    onChange({ macro_targets: { ...data.macro_targets, [key]: val } })
  }

  function toggleCuisine(c) {
    const updated = data.cuisine_preferences.includes(c)
      ? data.cuisine_preferences.filter(x => x !== c)
      : [...data.cuisine_preferences, c]
    onChange({ cuisine_preferences: updated })
  }

  return (
    <div className="form-section">
      <h2 className="section-title">📋 Impostazioni piano</h2>
      <p className="section-desc">Date, obiettivi calorici e preferenze finali.</p>

      <div className="field-row">
        <div className="field-group">
          <label className="field-label" htmlFor="start_date">Data inizio piano</label>
          <input id="start_date" className="field-input" type="date"
            min={today}
            value={data.start_date || today}
            onChange={e => onChange({ start_date: e.target.value })} />
        </div>
        <div className="field-group">
          <label className="field-label" htmlFor="duration_weeks">Durata</label>
          <select id="duration_weeks" className="field-input"
            value={data.duration_weeks}
            onChange={e => onChange({ duration_weeks: Number(e.target.value) })}>
            <option value={1}>1 settimana</option>
            <option value={2}>2 settimane</option>
            <option value={3}>3 settimane</option>
            <option value={4}>4 settimane</option>
          </select>
        </div>
      </div>

      <div className="field-row">
        <div className="field-group">
          <label className="field-label" htmlFor="budget">Budget spesa</label>
          <select id="budget" className="field-input"
            value={data.budget_level}
            onChange={e => onChange({ budget_level: e.target.value })}>
            <option value="low">Basso (ingredienti economici)</option>
            <option value="medium">Medio</option>
            <option value="high">Alto (ingredienti premium)</option>
          </select>
        </div>
        <div className="field-group">
          <span className="field-label">Stagionalità</span>
          <label className="toggle-label" style={{ marginTop: 8 }}>
            <input type="checkbox"
              checked={data.prefer_seasonal_and_fresh}
              onChange={e => onChange({ prefer_seasonal_and_fresh: e.target.checked })} />
            <span className="toggle-text">
              {data.prefer_seasonal_and_fresh ? 'Preferisci prodotti stagionali' : 'Nessuna preferenza'}
            </span>
          </label>
        </div>
      </div>

      <div className="field-group">
        <label className="field-label" htmlFor="calories">
          Target calorico giornaliero (vuoto = calcolo automatico)
        </label>
        <input id="calories" className="field-input" type="number"
          placeholder="Es. 2100 kcal" min="1200" max="5000" step="50"
          value={data.caloric_target_kcal_day}
          onChange={e => onChange({ caloric_target_kcal_day: e.target.value })} />
      </div>

      <div className="field-group">
        <span className="field-label">Target macro % (opzionale — devono sommare a 100)</span>
        <div className="field-row" style={{ marginTop: 6 }}>
          {[
            { key: 'protein_pct',       label: 'Proteine %',     placeholder: '30' },
            { key: 'carbohydrates_pct', label: 'Carboidrati %',  placeholder: '45' },
            { key: 'fat_pct',           label: 'Grassi %',       placeholder: '25' },
          ].map(({ key, label, placeholder }) => (
            <div key={key} className="field-group">
              <label className="field-label">{label}</label>
              <input
                className={`field-input ${anyMacro && !macroOk ? 'field-input--error' : ''}`}
                type="number" min="0" max="100" placeholder={placeholder}
                value={data.macro_targets[key]}
                onChange={e => updateMacro(key, e.target.value)} />
            </div>
          ))}
        </div>
        {anyMacro && (
          <div className={`macro-sum-indicator ${macroOk ? 'macro-sum--ok' : 'macro-sum--error'}`}>
            Totale: {macroSum}% {macroOk ? '✓ perfetto' : `— ${macroSum < 100 ? `mancano ${100 - macroSum}%` : `eccesso di ${macroSum - 100}%`}`}
          </div>
        )}
      </div>

      <div className="field-group">
        <span className="field-label">Cucine preferite</span>
        <div className="checkbox-grid">
          {CUISINE_OPTIONS.map(c => (
            <label key={c} className="checkbox-label">
              <input type="checkbox"
                checked={data.cuisine_preferences.includes(c)}
                onChange={() => toggleCuisine(c)} />
              {c}
            </label>
          ))}
        </div>
      </div>

      <div className="summary-box">
        <p className="summary-title">📌 Riepilogo piano</p>
        <p>Inizio: <strong>{data.start_date || today}</strong> · Durata: <strong>{data.duration_weeks} settimane</strong></p>
        <p>Budget: <strong>{data.budget_level}</strong> · Stagionale: <strong>{data.prefer_seasonal_and_fresh ? 'sì' : 'no'}</strong></p>
        {data.cuisine_preferences.length > 0 && (
          <p>Cucine: <strong>{data.cuisine_preferences.join(', ')}</strong></p>
        )}
      </div>
    </div>
  )
}

export default PlanSection