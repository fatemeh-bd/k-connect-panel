import { Route, Routes, useNavigate } from "react-router-dom";
import SideBar from "./components/sideBar/SideBar";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import TopBar from "./components/TopBar/TopBar";
import { routesList } from "./utils/routesList";
import Paragraph from "./components/typography/Paragraph";
import { Sizes } from "./utils/enums";

function App() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["access_token"]);
  useEffect(() => {
    if (!cookies.access_token) {
      navigate("/login");
    }
  }, [cookies, navigate]);
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
                {routesList.map((item) => (
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

export default App;
