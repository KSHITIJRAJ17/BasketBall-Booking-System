import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Page from './page2/Page';
// import LoginPage from './pages/Login';
// import SignUpPage from './pages/SignUp';
// import Home from './pages/Home';
// import ViewBookings from './pages/ViewBookings';
import './App.css';

function App() {
  // const handleLogin = ({ username, password, keepSignedIn }) => {
  //   // Do something with username and password, e.g., send them to a server
  //   console.log('Username:', username);
  //   console.log('Password:', password);
  //   console.log('Keep Signed In Status:',keepSignedIn);
  //   window.location.href = '/UploadPage';
  // };
  return (
    <>
      {/* <Layout> */}
        <Routes>
          <Route path="/" element={<Page />} />
          {/* <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/viewBooking" element={<ViewBookings />} /> */}
          {/* <Route path="/page2" element={<MainContent2 />} /> */}
        </Routes>
      {/* </Layout> */}
    </>
  );
}

export default App;
