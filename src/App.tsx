import { Route, Routes, useNavigate } from "react-router-dom";
import SideBar from "./components/sideBar/SideBar";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import TopBar from "./components/TopBar/TopBar";

function App() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["access_token"]);
  useEffect(() => {
    if (!cookies.access_token) {
      navigate("/login");
    }
  }, [cookies]);
  return (
    <>
      <Routes>
        {cookies.access_token && (
          <div className="flex items-start gap-4 w-full">
            <SideBar />

            <div className="w-[80%] p-4">
              <TopBar />
              <div className="py-4">
                <Route path="/" element={<p>در حال پیاده سازی</p>} />
              </div>
            </div>
          </div>
        )}
      </Routes>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
