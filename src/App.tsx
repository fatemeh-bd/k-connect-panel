import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import SideBar from "./components/sideBar/SideBar";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import TopBar from "./components/TopBar/TopBar";
import { routesList } from "./utils/routesList";
import Paragraph from "./components/typography/Paragraph";
import { Sizes } from "./utils/enums";
import { LangProvider, useLang } from "./context/LangProvider";

function AppContent() {
  const navigate = useNavigate();
  const { lang } = useLang();
  const routes = routesList(lang);

  const { pathname } = useLocation();
  const [cookies] = useCookies(["access_token"]);
  useEffect(() => {
    if (!cookies.access_token && pathname !== "/signUp") {
      navigate("/login");
    }
  }, [cookies, navigate, pathname]);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
      {cookies.access_token && (
        <div className="flex text-gray-700 shadow-sm lg:flex-row flex-col items-start h-screen overflow-hidden  w-full">
          <SideBar />

          <div className="w-full  px-4  pb-4 h-screen overflow-auto">
            <TopBar />

            <div className="py-4">
              <Routes>
                  {routes.map((item) => (
                    <React.Fragment key={item.id}>
                      <Route path={item.path} element={item.element} />
                      {item.subRoutes?.map((sub) => (
                        <Route
                          key={sub.id}
                          path={sub.path}
                          element={sub.element}
                        />
                      ))}
                    </React.Fragment>
                  ))}
                  <Route
                    path="*"
                    element={
                      <Paragraph size={Sizes.lg} className="text-center mt-4">
                        صفحه مورد نظر یافت نشد
                      </Paragraph>
                    }
                  />
              </Routes>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <LangProvider>
      <AppContent />
    </LangProvider>
  );
}

export default App;
