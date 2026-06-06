// DietarySection.jsx
// Raccoglie allergie, intolleranze e preferenze alimentari

const ALLERGY_OPTIONS    = ['Glutine', 'Lattosio', 'Frutta a guscio', 'Uova', 'Crostacei', 'Soia', 'Pesce']
const INTOLERANCE_OPTIONS = ['Lattosio', 'Glutine', 'Fruttosio', 'Istamina', 'Nichel']

function DietarySection({ data, onChange }) {
  // Gestione checkbox: aggiunge o rimuove il valore dall'array
  function toggleItem(field, item) {
    const current = data[field]
    const updated  = current.includes(item)
      ? current.filter(x => x !== item)   // rimuovi
      : [...current, item]                 // aggiungi
    onChange({ [field]: updated })
  }

  return (
    <div className="form-section">
      <h2 className="section-title">🥦 Dieta e salute</h2>
      <p className="section-desc">Nessun alimento escluso verrà mai incluso nel piano.</p>

      <div className="field-group">
        <label className="field-label" htmlFor="dietary_style">Stile alimentare</label>
        <select
          id="dietary_style"
          className="field-input"
          value={data.dietary_style}
          onChange={e => onChange({ dietary_style: e.target.value })}
        >
          <option value="omnivore">Onnivoro</option>
          <option value="vegetarian">Vegetariano</option>
          <option value="vegan">Vegano</option>
          <option value="pescatarian">Pescetariano</option>
          <option value="keto">Chetogenico</option>
          <option value="mediterranean">Mediterraneo</option>
        </select>
      </div>

      <div className="field-group">
        <span className="field-label">Allergie</span>
        <div className="checkbox-grid">
          {ALLERGY_OPTIONS.map(item => (
            <label key={item} className="checkbox-label">
              <input
                type="checkbox"
                checked={data.allergies.includes(item)}
                onChange={() => toggleItem('allergies', item)}
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      <div className="field-group">
        <span className="field-label">Intolleranze</span>
        <div className="checkbox-grid">
          {INTOLERANCE_OPTIONS.map(item => (
            <label key={item} className="checkbox-label">
              <input
                type="checkbox"
                checked={data.intolerances.includes(item)}
                onChange={() => toggleItem('intolerances', item)}
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      <div className="field-group">
        <label className="field-label" htmlFor="excluded_foods">
          Alimenti da escludere (separati da virgola)
        </label>
        <input
          id="excluded_foods"
          className="field-input"
          type="text"
          placeholder="Es. fegato, cavoletti di Bruxelles, acciughe"
          value={data.excluded_foods}
          onChange={e => onChange({ excluded_foods: e.target.value })}
        />
      </div>
    </div>
  )
}

export default DietarySection