import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { Spin } from 'antd';
import useGetData from './helper/useGetData';
import OrganizationsContext from './context/organizationsContext';
import LandingPage from './components/LandingPage';
import Organization from './components/Organization';
import ReportDetails from './components/ReportDetails';

const ENDPOINT = "https://my.api.mockaroo.com/organizations.json?key=78fbcc90";

function App() {
  const { data, loading, error } = useGetData(ENDPOINT);

  if (loading) {
    return <section className="loading_wrapper">
    <Spin tip="Loading" size="large"></Spin>
    </section>
  }

  return (
    <div className="App">
      <OrganizationsContext.Provider value={{ data, loading, error }}>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/organization/:id" element={<Organization />} />
            <Route path="/organization/:id/report/:id" element={<ReportDetails />} />
          </Routes>
        </Router>
      </OrganizationsContext.Provider>
    </div>
  );
}

export default App;
