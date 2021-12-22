import AppRouter from "./routers/AppRouter";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/layouts/Layout";
import AuthProvider from "./auth/AuthProvider";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Layout>
            <AppRouter />
          </Layout>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
