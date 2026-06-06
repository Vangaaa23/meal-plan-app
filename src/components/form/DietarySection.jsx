const ALLERGY_OPTIONS     = ['Glutine','Lattosio','Frutta a guscio','Uova','Crostacei','Soia','Pesce','Sesamo']
const INTOLERANCE_OPTIONS = ['Lattosio','Glutine','Fruttosio','Istamina','Nichel','Sorbitolo']
const AVOID_CUISINE       = ['Messicana','Indiana','Cinese','Tailandese','Tex-Mex','Fast food','Piccante']

function DietarySection({ data, onChange, errors = {} }) {
  function toggleItem(field, item) {
    const updated = data[field].includes(item)
      ? data[field].filter(x => x !== item)
      : [...data[field], item]
    onChange({ [field]: updated })
  }

  return (
    <div className="form-section">
      <h2 className="section-title">🥦 Dieta e salute</h2>
      <p className="section-desc">Nessun alimento escluso verrà mai inserito nel piano.</p>

      <div className="field-group">
        <label className="field-label" htmlFor="dietary_style">Stile alimentare</label>
        <select id="dietary_style" className="field-input"
          value={data.dietary_style} onChange={e => onChange({ dietary_style: e.target.value })}>
          <option value="omnivore">Onnivoro</option>
          <option value="vegetarian">Vegetariano</option>
          <option value="vegan">Vegano</option>
          <option value="pescatarian">Pescetariano</option>
          <option value="keto">Chetogenico</option>
          <option value="mediterranean">Mediterraneo</option>
          <option value="flexitarian">Flexitariano</option>
          <option value="paleo">Paleo</option>
        </select>
      </div>

      <div className="field-group">
        <span className="field-label">Allergie</span>
        <div className="checkbox-grid">
          {ALLERGY_OPTIONS.map(item => (
            <label key={item} className="checkbox-label">
              <input type="checkbox"
                checked={data.allergies.includes(item)}
                onChange={() => toggleItem('allergies', item)} />
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
              <input type="checkbox"
                checked={data.intolerances.includes(item)}
                onChange={() => toggleItem('intolerances', item)} />
              {item}
            </label>
          ))}
        </div>
      </div>

      <div className="field-group">
        <label className="field-label" htmlFor="excluded_foods">
          Alimenti da escludere (separati da virgola)
        </label>
        <input id="excluded_foods" className="field-input" type="text"
          placeholder="Es. fegato, cavoletti di Bruxelles, trippa"
          value={data.excluded_foods}
          onChange={e => onChange({ excluded_foods: e.target.value })} />
      </div>

      <div className="field-group">
        <label className="field-label" htmlFor="excluded_ingredients">
          Ingredienti da escludere (separati da virgola)
        </label>
        <input id="excluded_ingredients" className="field-input" type="text"
          placeholder="Es. acciughe, capperi, aglio"
          value={data.excluded_ingredients}
          onChange={e => onChange({ excluded_ingredients: e.target.value })} />
        <p className="field-hint">A differenza degli alimenti, questi vengono esclusi anche come ingredienti secondari nelle ricette.</p>
      </div>

      <div className="field-group">
        <span className="field-label">Cucine da evitare</span>
        <div className="checkbox-grid">
          {AVOID_CUISINE.map(item => (
            <label key={item} className="checkbox-label">
              <input type="checkbox"
                checked={data.cuisine_to_avoid.includes(item)}
                onChange={() => toggleItem('cuisine_to_avoid', item)} />
              {item}
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DietarySection