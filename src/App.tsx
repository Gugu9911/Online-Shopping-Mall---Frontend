import ReactDOM from 'react-dom';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux'; // 引入Provider组件
import { store } from './redux/store'; // 引入您创建的store
import Home from './pages/Home';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Provider store={store}> {/* 使用Provider包裹应用，并传递store */}
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/navbar" element={<Navbar />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
