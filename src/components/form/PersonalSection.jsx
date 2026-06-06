function PersonalSection({ data, onChange, errors = {} }) {
  const h = (field, value) => onChange({ [field]: value })

  return (
    <div className="form-section">
      <h2 className="section-title">👤 Profilo personale</h2>
      <p className="section-desc">I campi con * sono obbligatori.</p>

      <div className="field-row">
        <div className="field-group">
          <label className="field-label" htmlFor="first_name">Nome *</label>
          <input id="first_name" className={`field-input ${errors.first_name ? 'field-input--error' : ''}`}
            type="text" placeholder="Es. Mario"
            value={data.first_name} onChange={e => h('first_name', e.target.value)} />
          {errors.first_name && <p className="field-error">{errors.first_name}</p>}
        </div>
        <div className="field-group">
          <label className="field-label" htmlFor="last_name">Cognome (opz.)</label>
          <input id="last_name" className="field-input"
            type="text" placeholder="Es. Rossi"
            value={data.last_name} onChange={e => h('last_name', e.target.value)} />
        </div>
      </div>

      <div className="field-group">
        <label className="field-label" htmlFor="email">Email (opz.)</label>
        <input id="email" className="field-input"
          type="email" placeholder="mario.rossi@email.com"
          value={data.email} onChange={e => h('email', e.target.value)} />
      </div>

      <div className="field-row">
        <div className="field-group">
          <label className="field-label" htmlFor="age">Età *</label>
          <input id="age" className={`field-input ${errors.age ? 'field-input--error' : ''}`}
            type="number" placeholder="Es. 34" min="16" max="99"
            value={data.age} onChange={e => h('age', e.target.value)} />
          {errors.age && <p className="field-error">{errors.age}</p>}
        </div>
        <div className="field-group">
          <label className="field-label" htmlFor="gender">Sesso biologico</label>
          <select id="gender" className="field-input"
            value={data.gender} onChange={e => h('gender', e.target.value)}>
            <option value="male">Uomo</option>
            <option value="female">Donna</option>
            <option value="other">Altro</option>
          </select>
        </div>
      </div>

      <div className="field-row">
        <div className="field-group">
          <label className="field-label" htmlFor="height_cm">Altezza (cm) *</label>
          <input id="height_cm" className={`field-input ${errors.height_cm ? 'field-input--error' : ''}`}
            type="number" placeholder="Es. 178" min="100" max="250"
            value={data.height_cm} onChange={e => h('height_cm', e.target.value)} />
          {errors.height_cm && <p className="field-error">{errors.height_cm}</p>}
        </div>
        <div className="field-group">
          <label className="field-label" htmlFor="weight_kg">Peso (kg) *</label>
          <input id="weight_kg" className={`field-input ${errors.weight_kg ? 'field-input--error' : ''}`}
            type="number" placeholder="Es. 75" min="30" max="300" step="0.5"
            value={data.weight_kg} onChange={e => h('weight_kg', e.target.value)} />
          {errors.weight_kg && <p className="field-error">{errors.weight_kg}</p>}
        </div>
      </div>

      <div className="field-row">
        <div className="field-group">
          <label className="field-label" htmlFor="body_fat">% Massa grassa (opz.)</label>
          <input id="body_fat" className="field-input"
            type="number" placeholder="Es. 18.5" min="3" max="60" step="0.1"
            value={data.body_fat_percentage} onChange={e => h('body_fat_percentage', e.target.value)} />
        </div>
        <div className="field-group">
          <label className="field-label" htmlFor="waist_cm">Circonferenza vita cm (opz.)</label>
          <input id="waist_cm" className="field-input"
            type="number" placeholder="Es. 82" min="40" max="200"
            value={data.waist_cm} onChange={e => h('waist_cm', e.target.value)} />
        </div>
      </div>

      <div className="field-group">
        <label className="field-label" htmlFor="goal">Obiettivo principale</label>
        <select id="goal" className="field-input"
          value={data.goal} onChange={e => h('goal', e.target.value)}>
          <option value="lose_weight">Perdere peso</option>
          <option value="gain_muscle">Aumentare massa muscolare</option>
          <option value="maintain_weight">Mantenere il peso attuale</option>
          <option value="improve_endurance">Migliorare la resistenza</option>
        </select>
      </div>

      <div className="section-divider">
        <span>Salute</span>
      </div>

      <div className="field-group">
        <label className="field-label" htmlFor="conditions">
          Condizioni mediche rilevanti (separate da virgola, opz.)
        </label>
        <input id="conditions" className="field-input"
          type="text" placeholder="Es. ipertensione lieve, diabete tipo 2"
          value={data.conditions} onChange={e => h('conditions', e.target.value)} />
      </div>

      <div className="field-group">
        <label className="field-label" htmlFor="medications">
          Farmaci in uso (separati da virgola, opz.)
        </label>
        <input id="medications" className="field-input"
          type="text" placeholder="Es. metformina, ramipril"
          value={data.medications} onChange={e => h('medications', e.target.value)} />
      </div>
    </div>
  )
}

export default PersonalSection