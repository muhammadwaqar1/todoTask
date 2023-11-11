import './App.css';
import Todos from './pages/todos';
import heroPattern from "./assets/images/image.webp"

function App() {
  return (
    <div className="App bg-cover bg-center h-screen  w-full flex justify-center " style={{ backgroundImage: `url(${heroPattern})` }}>
      <Todos />
    </div>
  );
}

export default App;
