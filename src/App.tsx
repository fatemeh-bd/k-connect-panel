import { Route, Routes, useNavigate } from "react-router-dom";
import SideBar from "./components/sideBar/SideBar";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import TopBar from "./components/TopBar/TopBar";
import { routesList } from "./utils/routesList";

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
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
      {cookies.access_token && (
        <div className="flex lg:flex-row flex-col items-start h-screen overflow-hidden gap-2 w-full">
          <SideBar />

          <div className="w-full px-2  pb-4 h-screen overflow-auto">
            <TopBar />

            <div className="py-4">
              <Routes>
                {routesList.map((item) => (
                  <>
                    <Route
                      key={item.id}
                      path={item.path}
                      element={item.element}
                    />
                    {item.subRoutes?.map((sub) => (
                      <Route
                        key={sub.id}
                        path={sub.path}
                        element={sub.element}
                      />
                    ))}
                  </>
                ))}
              </Routes>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
