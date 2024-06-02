import { useEffect } from "react";
import "./App.css";
import { Button, Col, Row, Select, SelectProps } from "antd";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Menu } from "./page/Menu";
import { Test1 } from "./page/test1/test1";
import { useTranslation } from "react-i18next";
import { Test2 } from "./page/test2/test2";

type LabelRender = SelectProps["labelRender"];

function App() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("lang", i18n.language);
  }, [i18n.language, t]);

  const labelRender: LabelRender = (props) => {
    const { value } = props;

    return t(value.toString());
  };

  return (
    <div>
      <header>
        <Row>
          <Col span={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "start",
                marginLeft: "10px",
              }}
            >
              {location.pathname === "/test1" ? (
                <h1>{t("layout_and_style")}</h1>
              ) : location.pathname === "/test2" ? (
                <h1>{t("form_and_table")}</h1>
              ) : null}
            </div>
          </Col>
          <Col span={12}>
            {" "}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",

                padding: "10px",
              }}
            >
              <div
                className="my-select-container"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "end",
                }}
              >
                <Select
                  className="t1"
                  defaultValue={"en"}
                  onChange={(value) => {
                    i18n.changeLanguage(value);
                  }}
                  labelRender={labelRender}
                  style={{ width: 100 }}
                  options={[
                    { value: "th", label: t("th") }, // Initial option assuming "TH" translation
                    { value: "en", label: t("en") }, // Initial option assuming "EN" translation
                  ]}
                />
                {location.pathname === "/test1" ? (
                  <Button
                    onClick={() => {
                      navigate("/");
                    }}
                    style={{
                      width: 70,
                      marginTop: "1rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {t("home")}
                  </Button>
                ) : location.pathname === "/test2" ? (
                  <Button
                    onClick={() => {
                      navigate("/");
                    }}
                    style={{
                      width: 70,
                      marginTop: "1rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {t("home")}
                  </Button>
                ) : null}
              </div>
            </div>
          </Col>
        </Row>
      </header>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/test1" element={<Test1 />} />
        <Route path="/test2" element={<Test2 />} />
      </Routes>
    </div>
  );
}

export default App;
