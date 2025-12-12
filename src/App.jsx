import { NavigationProvider } from './context/NavigationContext';
import { MusicProvider } from './context/MusicContext';
import { useNavigation } from './hooks/useNavigation';
import NavigationArrows from './components/NavigationArrows';
import MusicControl from './components/MusicControl';
import Opening from './pages/Opening';
import Teacher from './pages/Teacher';
import Spring from './pages/Spring';
import Summer from './pages/Summer';
import Autumn from './pages/Autumn';
import Winter from './pages/Winter';
import Annoying from './pages/Annoying';
import Korea from './pages/Korea';
import Indonesia from './pages/Indonesia';
import Prayer from './pages/Prayer';
import Closing from './pages/Closing';
import './App.css';

function PageRenderer() {
  const { currentPageName, isTransitioning } = useNavigation();

  const renderPage = () => {
    switch (currentPageName) {
      case 'opening':
        return <Opening />;
      case 'teacher':
        return <Teacher />;
      case 'spring':
        return <Spring />;
      case 'summer':
        return <Summer />;
      case 'autumn':
        return <Autumn />;
      case 'winter':
        return <Winter />;
      case 'annoying':
        return <Annoying />;
      case 'korea':
        return <Korea />;
      case 'indonesia':
        return <Indonesia />;
      case 'prayer':
        return <Prayer />;
      case 'closing':
        return <Closing />;
      default:
        return <Opening />;
    }
  };

  return (
    <div className={`page-container ${isTransitioning ? 'transitioning' : ''}`}>
      {renderPage()}
    </div>
  );
}

function App() {
  return (
    <NavigationProvider>
      <MusicProvider>
        <div className="app">
          <MusicControl />
          <PageRenderer />
          <NavigationArrows />
        </div>
      </MusicProvider>
    </NavigationProvider>
  );
}

export default App;
