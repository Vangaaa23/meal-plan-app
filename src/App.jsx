// App.jsx — componente radice dell'applicazione
// Qui assembliamo tutti i pezzi principali dell'interfaccia

import { useState } from 'react'
import './App.css'

function App() {
  // useState è un "contenitore" per i dati che cambiano nel tempo.
  // step tiene traccia di quale schermata mostrare all'utente.
  const [step, setStep] = useState('form') // 'form' | 'loading' | 'result'

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🥗 Meal Plan Generator</h1>
        <p>Piano alimentare personalizzato con AI</p>
      </header>

      <main className="app-main">
        {/* Segnaposto temporaneo — lo sostituiremo nella Fase 3 */}
        <p>Form in arrivo nella Fase 3...</p>
        <p>Stato attuale: <strong>{step}</strong></p>
        <button onClick={() => setStep('loading')}>Simula loading</button>
        <button onClick={() => setStep('result')}>Simula risultato</button>
        <button onClick={() => setStep('form')}>Torna al form</button>
      </main>
    </div>
  )
}

export default App