function PersonalSection({ data, onChange, errors = {} }) {
  function handle(field, value) { onChange({ [field]: value }) }

  return (
    <div className="form-section">
      <h2 className="section-title">👤 Profilo personale</h2>
      <p className="section-desc">Questi dati servono a calibrare calorie e macro.</p>

      <div className="field-group">
        <label className="field-label" htmlFor="first_name">Nome *</label>
        <input
          id="first_name"
          className={`field-input ${errors.first_name ? 'field-input--error' : ''}`}
          type="text"
          placeholder="Es. Mario"
          value={data.first_name}
          onChange={e => handle('first_name', e.target.value)}
        />
        {errors.first_name && <p className="field-error">{errors.first_name}</p>}
      </div>

      <div className="field-row">
        <div className="field-group">
          <label className="field-label" htmlFor="age">Età *</label>
          <input
            id="age"
            className={`field-input ${errors.age ? 'field-input--error' : ''}`}
            type="number" placeholder="Es. 34" min="16" max="99"
            value={data.age}
            onChange={e => handle('age', e.target.value)}
          />
          {errors.age && <p className="field-error">{errors.age}</p>}
        </div>

        <div className="field-group">
          <label className="field-label" htmlFor="gender">Sesso biologico</label>
          <select
            id="gender" className="field-input"
            value={data.gender}
            onChange={e => handle('gender', e.target.value)}
          >
            <option value="male">Uomo</option>
            <option value="female">Donna</option>
            <option value="other">Altro</option>
          </select>
        </div>
      </div>

      <div className="field-row">
        <div className="field-group">
          <label className="field-label" htmlFor="height_cm">Altezza (cm) *</label>
          <input
            id="height_cm"
            className={`field-input ${errors.height_cm ? 'field-input--error' : ''}`}
            type="number" placeholder="Es. 178" min="140" max="220"
            value={data.height_cm}
            onChange={e => handle('height_cm', e.target.value)}
          />
          {errors.height_cm && <p className="field-error">{errors.height_cm}</p>}
        </div>

        <div className="field-group">
          <label className="field-label" htmlFor="weight_kg">Peso (kg) *</label>
          <input
            id="weight_kg"
            className={`field-input ${errors.weight_kg ? 'field-input--error' : ''}`}
            type="number" placeholder="Es. 75" min="30" max="300" step="0.5"
            value={data.weight_kg}
            onChange={e => handle('weight_kg', e.target.value)}
          />
          {errors.weight_kg && <p className="field-error">{errors.weight_kg}</p>}
        </div>
      </div>

      <div className="field-group">
        <label className="field-label" htmlFor="goal">Obiettivo principale</label>
        <select
          id="goal" className="field-input"
          value={data.goal}
          onChange={e => handle('goal', e.target.value)}
        >
          <option value="lose_weight">Perdere peso</option>
          <option value="gain_muscle">Aumentare massa muscolare</option>
          <option value="maintain_weight">Mantenere il peso attuale</option>
          <option value="improve_endurance">Migliorare la resistenza</option>
        </select>
      </div>
    </div>
  )
}

export default PersonalSection