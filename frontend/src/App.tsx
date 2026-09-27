import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import Home from './pages/Home'
import Chat from './pages/Chat'
import { StandardsExplorer, StandardDetails } from './pages/Standards'
import { CertificationPage, HallmarkingPage, LabsPage, SourcesPage } from './pages/Guides'
import './App.css'

function App() {
  return <BrowserRouter><div className="page-shell flex flex-col"><Navbar /><div className="flex-1"><Routes><Route path="/" element={<Home />} /><Route path="/chat" element={<Chat />} /><Route path="/standards" element={<StandardsExplorer />} /><Route path="/standards/:id" element={<StandardDetails />} /><Route path="/certification" element={<CertificationPage />} /><Route path="/labs" element={<LabsPage />} /><Route path="/hallmarking" element={<HallmarkingPage />} /><Route path="/sources" element={<SourcesPage />} /></Routes></div><Footer /></div></BrowserRouter>
}
export default App
