import HomePage from './pages/HomePage'
import BackgroundDucks from './components/BackgroundDucks'
import { StyleProvider, useStyle } from './contexts/StyleContext'
import { useEffect } from 'react'
import './App.css'

const AppContent: React.FC = () => {
  const { isVintageStyle } = useStyle();
  
  useEffect(() => {
    if (isVintageStyle) {
      document.body.classList.add('vintage-style');
      document.documentElement.classList.add('vintage-style');
    } else {
      document.body.classList.remove('vintage-style');
      document.documentElement.classList.remove('vintage-style');
    }
  }, [isVintageStyle]);
  
  return (
    <div className={`app ${isVintageStyle ? 'vintage-style' : ''}`}>
      <BackgroundDucks />
      <HomePage />
    </div>
  )
}

function App() {
  return (
    <StyleProvider>
      <AppContent />
    </StyleProvider>
  )
}

export default App
