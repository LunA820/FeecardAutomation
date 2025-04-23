import viteLogo from '/vite.svg'
import CsvUpload from './components/CsvUpload'
import './App.css'

function App() {
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Feecard UI</h1>
      <div className="card">
        <p>
          Automate the feecard release process
        </p>
        <CsvUpload />
      </div>
      <p className="read-the-docs">
        Work in Progress
      </p>
    </>
  )
}

export default App
