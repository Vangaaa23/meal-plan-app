import { useState } from 'react'

const PROTEIN_SOURCES = [
  { key: 'pollo',     label: 'Pollo' },
  { key: 'tacchino',  label: 'Tacchino' },
  { key: 'manzo',     label: 'Manzo' },
  { key: 'maiale',    label: 'Maiale' },
  { key: 'uova',      label: 'Uova' },
  { key: 'salmone',   label: 'Salmone' },
  { key: 'tonno',     label: 'Tonno' },
  { key: 'merluzzo',  label: 'Merluzzo' },
  { key: 'gamberi',   label: 'Gamberi' },
  { key: 'legumi',    label: 'Legumi' },
  { key: 'formaggio', label: 'Formaggio' },
]

const SLOT_OPTIONS = [
  { value: '',              label: 'Qualsiasi pasto' },
  { value: 'breakfast',     label: 'Colazione' },
  { value: 'morning_snack', label: 'Spuntino mattina' },
  { value: 'lunch',         label: 'Pranzo' },
  { value: 'dinner',        label: 'Cena' },
]

const SLOT_LABELS = {
  breakfast: 'Colazione', morning_snack: 'Spuntino', lunch: 'Pranzo', dinner: 'Cena',
}

const EMPTY_FOOD = { food: '', pin_to_meal: '', max_times_per_week: 3 }

function FoodPreferencesSection({ data, onChange, errors = {} }) {
  const [newFood, setNewFood] = useState(EMPTY_FOOD)

  function addFood() {
    if (!newFood.food.trim()) return
    onChange({ preferred_foods: [...data.preferred_foods, { ...newFood, pin_to_meal: newFood.pin_to_meal || null }] })
    setNewFood(EMPTY_FOOD)
  }

  function removeFood(i) {
    onChange({ preferred_foods: data.preferred_foods.filter((_, idx) => idx !== i) })
  }

  function updateProtein(key, value) {
    onChange({ protein_source_limits: { ...data.protein_source_limits, [key]: Number(value) } })
  }

  function updateSlot(slotId, field, value) {
    onChange({
      meal_slot_repetition: {
        ...data.meal_slot_repetition,
        [slotId]: {
          ...data.meal_slot_repetition[slotId],
          [field]: value === '' ? null : Number(value),
        }
      }
    })
  }

  return (
    <div className="form-section">
      <h2 className="section-title">🍽️ Preferenze alimentari</h2>
      <p className="section-desc">Personalizza frequenza e varietà degli alimenti nel piano.</p>

      {/* Alimenti preferiti */}
      <div className="field-group">
        <span className="field-label">Alimenti preferiti</span>
        <p className="field-hint">Aggiungi alimenti che vuoi vedere spesso nel piano, con pasto e frequenza preferiti.</p>

        {data.preferred_foods.length > 0 && (
          <div className="food-tags">
            {data.preferred_foods.map((item, i) => (
              <div key={i} className="food-tag">
                <span className="food-tag-name">{item.food}</span>
                {item.pin_to_meal && (
                  <span className="food-tag-slot">· {SLOT_LABELS[item.pin_to_meal]}</span>
                )}
                <span className="food-tag-freq">max {item.max_times_per_week}×/sett.</span>
                <button className="food-tag-remove" onClick={() => removeFood(i)}>×</button>
              </div>
            ))}
          </div>
        )}

        <div className="add-food-form">
          <input className="field-input" type="text"
            placeholder="Nome alimento (es. porridge d'avena)"
            value={newFood.food}
            onChange={e => setNewFood(f => ({ ...f, food: e.target.value }))}
            onKeyDown={e => e.key === 'Enter' && addFood()} />
          <div className="field-row" style={{ marginTop: 8 }}>
            <div className="field-group">
              <label className="field-label">Pasto preferito</label>
              <select className="field-input"
                value={newFood.pin_to_meal}
                onChange={e => setNewFood(f => ({ ...f, pin_to_meal: e.target.value }))}>
                {SLOT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <div className="field-group">
              <label className="field-label">Max volte/sett.</label>
              <input className="field-input" type="number" min="1" max="7"
                value={newFood.max_times_per_week}
                onChange={e => setNewFood(f => ({ ...f, max_times_per_week: Number(e.target.value) }))} />
            </div>
          </div>
          <button className="btn-add-item"
            onClick={addFood} disabled={!newFood.food.trim()}>
            + Aggiungi alimento
          </button>
        </div>
      </div>

      {/* Limiti proteine */}
      <div className="field-group">
        <span className="field-label">Frequenza massima sorgenti proteiche (volte/settimana)</span>
        <p className="field-hint">Quante volte al massimo ogni proteina può essere il protagonista di un pasto.</p>
        <div className="protein-grid">
          {PROTEIN_SOURCES.map(({ key, label }) => (
            <div key={key} className="protein-item">
              <label className="field-label">{label}</label>
              <input className="field-input field-input--sm" type="number" min="0" max="14"
                value={data.protein_source_limits[key]}
                onChange={e => updateProtein(key, e.target.value)} />
            </div>
          ))}
        </div>
      </div>

      {/* Ripetizione per slot */}
      <div className="field-group">
        <span className="field-label">Ripetizione per fascia oraria (volte/settimana)</span>
        <p className="field-hint">Quante volte lo stesso pasto può ripetersi nello stesso slot.</p>
        <div className="slot-repetition-grid">
          {Object.entries(data.meal_slot_repetition).map(([slotId, vals]) => (
            <div key={slotId} className="slot-rep-card">
              <p className="slot-rep-title">{SLOT_LABELS[slotId] || slotId}</p>
              <div className="field-row">
                <div className="field-group">
                  <label className="field-label">Min (opz.)</label>
                  <input className="field-input field-input--sm" type="number"
                    min="0" max="7" placeholder="—"
                    value={vals.min_times_per_week ?? ''}
                    onChange={e => updateSlot(slotId, 'min_times_per_week', e.target.value)} />
                </div>
                <div className="field-group">
                  <label className="field-label">Max</label>
                  <input className="field-input field-input--sm" type="number"
                    min="1" max="7"
                    value={vals.max_times_per_week}
                    onChange={e => updateSlot(slotId, 'max_times_per_week', e.target.value)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Impostazioni globali */}
      <div className="field-row">
        <div className="field-group">
          <label className="field-label" htmlFor="max_same_meal">Max stesso pasto a settimana (globale)</label>
          <input id="max_same_meal" className="field-input" type="number" min="1" max="7"
            value={data.max_same_meal_per_week}
            onChange={e => onChange({ max_same_meal_per_week: Number(e.target.value) })} />
        </div>
        <div className="field-group">
          <span className="field-label">Avanzi</span>
          <label className="toggle-label" style={{ marginTop: 8 }}>
            <input type="checkbox"
              checked={data.allow_leftover_meals}
              onChange={e => onChange({ allow_leftover_meals: e.target.checked })} />
            <span className="toggle-text">
              {data.allow_leftover_meals ? 'Consenti riutilizzo avanzi' : 'Sempre ricette nuove'}
            </span>
          </label>
        </div>
      </div>
    </div>
  )
}

export default FoodPreferencesSection