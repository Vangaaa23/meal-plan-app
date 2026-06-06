const DAYS_EN = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday']
const DAYS_IT = ['Lunedì','Martedì','Mercoledì','Giovedì','Venerdì','Sabato','Domenica']

const ACTIVITY_TYPES = [
  { value: 'gym',       label: 'Palestra' },
  { value: 'jogging',   label: 'Jogging' },
  { value: 'cycling',   label: 'Ciclismo' },
  { value: 'pilates',   label: 'Pilates' },
  { value: 'yoga',      label: 'Yoga' },
  { value: 'nuoto',     label: 'Nuoto' },
  { value: 'camminata', label: 'Camminata' },
  { value: 'altro',     label: 'Altro' },
]

function ActivitySection({ data, onChange, errors = {} }) {
  function updateDay(day, field, value) {
    onChange({
      weekly_schedule: {
        ...data.weekly_schedule,
        [day]: { ...data.weekly_schedule[day], [field]: value },
      }
    })
  }

  function toggleDay(day) {
    updateDay(day, 'active', !data.weekly_schedule[day].active)
  }

  return (
    <div className="form-section">
      <h2 className="section-title">🏃 Attività fisica</h2>
      <p className="section-desc">Clicca un giorno per attivarlo e inserire i dettagli dell'allenamento.</p>

      <div className="field-group">
        <label className="field-label" htmlFor="general_level">Livello di attività generale</label>
        <select id="general_level" className="field-input"
          value={data.general_level}
          onChange={e => onChange({ general_level: e.target.value })}>
          <option value="sedentary">Sedentario (lavoro a scrivania, niente sport)</option>
          <option value="lightly_active">Leggermente attivo (1-2 allenamenti/sett.)</option>
          <option value="moderately_active">Moderatamente attivo (3-4 allenamenti/sett.)</option>
          <option value="very_active">Molto attivo (5+ allenamenti/sett. o lavoro fisico)</option>
        </select>
      </div>

      <div className="field-group">
        <span className="field-label">Pianificazione settimanale</span>
        <div className="schedule-grid">
          {DAYS_EN.map((day, i) => {
            const d = data.weekly_schedule[day]
            return (
              <div key={day} className={`schedule-day ${d.active ? 'schedule-day--active' : ''}`}>

                {/* Header giorno */}
                <div className="schedule-day-header" onClick={() => toggleDay(day)}>
                  <label className="checkbox-label"
                    style={{ cursor: 'pointer', border: 'none', padding: 0, gap: 10 }}>
                    <input type="checkbox" checked={d.active} readOnly />
                    <strong>{DAYS_IT[i]}</strong>
                  </label>
                  <span className={`day-badge ${d.active ? 'day-badge--active' : ''}`}>
                    {d.active ? d.type : 'Riposo'}
                  </span>
                </div>

                {/* Dettagli allenamento (visibili solo se il giorno è attivo) */}
                {d.active && (
                  <div className="schedule-day-details">
                    <div className="field-row">
                      <div className="field-group">
                        <label className="field-label">Tipo attività</label>
                        <select className="field-input field-input--sm"
                          value={d.type}
                          onChange={e => updateDay(day, 'type', e.target.value)}>
                          {ACTIVITY_TYPES.map(t => (
                            <option key={t.value} value={t.value}>{t.label}</option>
                          ))}
                        </select>
                      </div>
                      <div className="field-group">
                        <label className="field-label">Focus (opz.)</label>
                        <input className="field-input field-input--sm" type="text"
                          placeholder="Es. gambe, cardio, core"
                          value={d.focus}
                          onChange={e => updateDay(day, 'focus', e.target.value)} />
                      </div>
                    </div>

                    <div className="field-row">
                      <div className="field-group">
                        <label className="field-label">Periodo</label>
                        <select className="field-input field-input--sm"
                          value={d.period}
                          onChange={e => updateDay(day, 'period', e.target.value)}>
                          <option value="morning">Mattina</option>
                          <option value="afternoon">Pomeriggio</option>
                          <option value="evening">Sera</option>
                        </select>
                      </div>
                      <div className="field-group">
                        <label className="field-label">Orario inizio</label>
                        <input className="field-input field-input--sm" type="time"
                          value={d.start_time}
                          onChange={e => updateDay(day, 'start_time', e.target.value)} />
                      </div>
                    </div>

                    <div className="field-row">
                      <div className="field-group">
                        <label className="field-label">Durata (min)</label>
                        <input className="field-input field-input--sm"
                          type="number" min="15" max="300" step="5"
                          value={d.duration_min}
                          onChange={e => updateDay(day, 'duration_min', Number(e.target.value))} />
                      </div>
                      <div className="field-group">
                        <label className="field-label">Intensità</label>
                        <select className="field-input field-input--sm"
                          value={d.effort}
                          onChange={e => updateDay(day, 'effort', e.target.value)}>
                          <option value="low">Bassa</option>
                          <option value="medium">Media</option>
                          <option value="high">Alta</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ActivitySection