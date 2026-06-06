const DAYS_EN = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday']
const DAYS_IT = ['Lunedì','Martedì','Mercoledì','Giovedì','Venerdì','Sabato','Domenica']

function MealPrepSection({ data, onChange, errors = {} }) {
  function updateSession(i, field, value) {
    const sessions = data.sessions.map((s, idx) => idx === i ? { ...s, [field]: value } : s)
    onChange({ sessions })
  }

  function toggleDayInSession(sessionIdx, day) {
    const s = data.sessions[sessionIdx]
    const covers_days = s.covers_days.includes(day)
      ? s.covers_days.filter(d => d !== day)
      : [...s.covers_days, day]
    updateSession(sessionIdx, 'covers_days', covers_days)
  }

  function addSession() {
    onChange({
      sessions: [...data.sessions, {
        prep_day: 'wednesday', covers_days: [],
        lunch_portable: true, dinner_portable: false,
      }]
    })
  }

  function removeSession(i) {
    onChange({ sessions: data.sessions.filter((_, idx) => idx !== i) })
  }

  return (
    <div className="form-section">
      <h2 className="section-title">🥡 Meal Prep</h2>
      <p className="section-desc">Pianifica sessioni di preparazione anticipata dei pasti.</p>

      <label className="toggle-label">
        <input type="checkbox"
          checked={data.enabled}
          onChange={e => onChange({ enabled: e.target.checked })} />
        <span className="toggle-text">
          {data.enabled ? 'Meal prep abilitato ✓' : 'Meal prep disabilitato'}
        </span>
      </label>

      {data.enabled && (
        <>
          <div className="field-row">
            <div className="field-group">
              <label className="field-label" htmlFor="fridge_days">Giorni conservazione in frigo</label>
              <input id="fridge_days" className="field-input"
                type="number" min="1" max="7"
                value={data.fridge_days}
                onChange={e => onChange({ fridge_days: Number(e.target.value) })} />
            </div>
            <div className="field-group">
              <span className="field-label">Opzioni</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 6 }}>
                <label className="toggle-label">
                  <input type="checkbox" checked={data.freezer}
                    onChange={e => onChange({ freezer: e.target.checked })} />
                  <span className="toggle-text">Freezer disponibile</span>
                </label>
                <label className="toggle-label">
                  <input type="checkbox" checked={data.prefer_batch_cooking}
                    onChange={e => onChange({ prefer_batch_cooking: e.target.checked })} />
                  <span className="toggle-text">Preferisci batch cooking</span>
                </label>
              </div>
            </div>
          </div>

          <div className="field-group">
            <span className="field-label">Sessioni di preparazione</span>
            <p className="field-hint">Indica quando cucini e per quali giorni successivi.</p>

            {data.sessions.map((session, i) => (
              <div key={i} className="prep-session-card">
                <div className="prep-session-header">
                  <span className="prep-session-title">Sessione {i + 1}</span>
                  <button className="btn-remove" onClick={() => removeSession(i)}>Rimuovi</button>
                </div>

                <div className="field-group">
                  <label className="field-label">Giorno di preparazione</label>
                  <select className="field-input"
                    value={session.prep_day}
                    onChange={e => updateSession(i, 'prep_day', e.target.value)}>
                    {DAYS_EN.map((d, idx) => (
                      <option key={d} value={d}>{DAYS_IT[idx]}</option>
                    ))}
                  </select>
                </div>

                <div className="field-group">
                  <span className="field-label">Giorni coperti dalla sessione</span>
                  <div className="day-grid">
                    {DAYS_EN.map((d, idx) => {
                      if (d === session.prep_day) return null
                      const active = session.covers_days.includes(d)
                      return (
                        <button key={d} type="button"
                          className={`day-btn ${active ? 'day-btn--active' : ''}`}
                          onClick={() => toggleDayInSession(i, d)}>
                          {DAYS_IT[idx].slice(0, 3)}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="field-group">
                  <span className="field-label">🧳 Portabilità pasti preparati</span>
                  <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginTop: 4 }}>
                    <label className="toggle-label">
                      <input type="checkbox" checked={session.lunch_portable}
                        onChange={e => updateSession(i, 'lunch_portable', e.target.checked)} />
                      <span className="toggle-text">Pranzo da portare fuori casa</span>
                    </label>
                    <label className="toggle-label">
                      <input type="checkbox" checked={session.dinner_portable}
                        onChange={e => updateSession(i, 'dinner_portable', e.target.checked)} />
                      <span className="toggle-text">Cena da portare fuori casa</span>
                    </label>
                  </div>
                </div>
              </div>
            ))}

            {data.sessions.length < 3 && (
              <button className="btn-add-item" onClick={addSession}>
                + Aggiungi sessione
              </button>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default MealPrepSection