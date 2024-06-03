import { Col, Row, Select } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export function Menu() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  return (
    <div>
      <div className="main">
        <div style={{ marginTop: "20rem" }}>
          <Row gutter={16} align={"middle"}>
            <Col
              className="gutter-row"
              span={12}
              style={{
                display: "inline-flex",
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "50%",
                  height: "112px",
                  backgroundColor: "#fff",
                  paddingLeft: "1rem",
                  paddingBottom: "0.5rem",
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/test1");
                }}
              >
                <h3>{t("test_1")}</h3>
                <p style={{ marginTop: "2rem" }}>{t("layout_and_style")}</p>
              </div>
            </Col>
            <Col
              className="gutter-row"
              span={12}
              style={{
                display: "inline-flex",
                justifyContent: "start",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "50%",
                  height: "112px",
                  backgroundColor: "#fff",
                  cursor: "pointer",
                  paddingLeft: "1rem",
                  paddingBottom: "0.5rem",
                }}
                onClick={() => {
                  navigate("/test2");
                }}
              >
                <h3>{t("test_2")}</h3>
                <p style={{ marginTop: "2rem" }}>{t("form_and_table")}</p>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
