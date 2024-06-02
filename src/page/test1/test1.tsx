import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./test1.scss";
import { Col, Divider, Row } from "antd";

interface ShapesValue {
  id: number;
  shape: string;
}

export function Test1() {
  const { t } = useTranslation();
  const [movePosition, setMovePosition] = useState<boolean>(false);
  const [shapesValue, setShapesValue] = useState<ShapesValue[]>([
    {
      id: 1,
      shape: "square",
    },
    {
      id: 2,
      shape: "circle",
    },
    {
      id: 3,
      shape: "ellipse",
    },
    {
      id: 4,
      shape: "trapezium",
    },
    {
      id: 5,
      shape: "rectangle",
    },
    {
      id: 6,
      shape: "parallelogram",
    },
  ]);

  function handleMovePosition() {
    setMovePosition(!movePosition);
    console.log("movePosition", movePosition);
  }

  function sortingByid(shapesValue: ShapesValue[]): ShapesValue[] {
    return shapesValue.sort((a, b) => a.id - b.id);
  }

  function handleIncrement(shapesValue: ShapesValue[]) {
    let newValue: ShapesValue[] = [];
    shapesValue.map((val) => {
      if (val.id >= 6) {
        val.id = 1;
      } else {
        val.id = val.id += 1;
      }

      newValue.push({
        id: val.id,
        shape: val.shape,
      });
    });
    setShapesValue(newValue);
  }

  function handleDecrement(shapesValue: ShapesValue[]) {
    let newValue: ShapesValue[] = [];
    shapesValue.map((val) => {
      if (val.id - 1 <= 0) {
        val.id = 6;
      } else {
        val.id = val.id - 1;
        console.log("val.id", val.id);
      }

      newValue.push({
        id: val.id,
        shape: val.shape,
      });
    });
    console.log(newValue);

    setShapesValue(newValue);
  }

  function getRandomUniqueNumbers(
    count: number,
    min: number,
    max: number
  ): number[] {
    if (max - min + 1 < count) {
      throw new Error(
        "The range is too small to generate the required number of unique numbers."
      );
    }

    const uniqueNumbers = new Set<number>();

    while (uniqueNumbers.size < count) {
      const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
      uniqueNumbers.add(randomNum);
    }
    console.log(Array.from(uniqueNumbers));

    return Array.from(uniqueNumbers);
  }

  function randomShapesPosition(shapesValue: ShapesValue[]) {
    let newValue: ShapesValue[] = [];
    getRandomUniqueNumbers(6, 1, 6).map((val, index) => {
      newValue.push({
        id: val,
        shape: shapesValue[index].shape,
      });
    });
    setShapesValue(newValue);
  }

  return (
    <section style={{ display: "flex", justifyContent: "center" }}>
      <div className="content">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Row gutter={9} align={"middle"} style={{ width: "100%" }}>
            <Col span={6} style={{ display: "flex" }}>
              <div
                className="button"
                onClick={() => {
                  handleDecrement(shapesValue);
                }}
              >
                <div className="triangle1" />
                <div className="warpper-text">
                  <p className="text">{t("move_shape")}</p>
                </div>
              </div>
            </Col>
            <Col span={12} style={{ display: "flex" }}>
              <div
                className="button"
                style={{}}
                onClick={() => {
                  handleMovePosition();
                }}
              >
                <Row
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    padding: "0.8rem 0rem 0.8rem 0rem",
                  }}
                >
                  <Col
                    span={12}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <div className="triangle2" />
                  </Col>
                  <Col
                    span={12}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <div className="triangle3" />
                  </Col>
                </Row>
                <div className="warpper-text">
                  <p className="text">{t("move_position")}</p>
                </div>
              </div>
            </Col>
            <Col span={6} style={{ display: "flex" }}>
              <div
                className="button"
                onClick={() => {
                  handleIncrement(shapesValue);
                }}
              >
                <div className="triangle4"></div>
                <div className="warpper-text">
                  <p className="text">{t("move_shape")}</p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <Divider style={{ marginTop: "2.5rem" }} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            order: movePosition ? 2 : 1,
            marginTop: movePosition ? "0.5rem" : 0,
          }}
        >
          <Row gutter={9} align={"middle"} style={{ width: "100%" }}>
            <Col span={6} style={{ display: "flex" }}></Col>
            <Col span={6} style={{ display: "flex" }}>
              <div
                className="button"
                onClick={() => {
                  randomShapesPosition(shapesValue);
                }}
              >
                <div className={sortingByid(shapesValue)[0].shape} />
              </div>
            </Col>
            <Col span={6} style={{ display: "flex" }}>
              <div
                className="button"
                onClick={() => {
                  randomShapesPosition(shapesValue);
                }}
              >
                <div className={sortingByid(shapesValue)[1].shape} />
              </div>
            </Col>
            <Col span={6} style={{ display: "flex" }}>
              <div
                className="button"
                onClick={() => {
                  randomShapesPosition(shapesValue);
                }}
              >
                <div className={sortingByid(shapesValue)[2].shape} />
              </div>
            </Col>
          </Row>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: movePosition ? 0 : "0.5rem",
            order: movePosition ? 1 : 2,
          }}
        >
          <Row gutter={9} align={"middle"} style={{ width: "100%" }}>
            <Col span={6} style={{ display: "flex", marginLeft: "12rem" }}>
              <div
                className="button"
                onClick={() => {
                  randomShapesPosition(shapesValue);
                }}
              >
                <div className={sortingByid(shapesValue)[3].shape} />
              </div>
            </Col>
            <Col span={6} style={{ display: "flex" }}>
              <div
                className="button"
                onClick={() => {
                  randomShapesPosition(shapesValue);
                }}
              >
                <div className={sortingByid(shapesValue)[4].shape} />
              </div>
            </Col>
            <Col span={6} style={{ display: "flex" }}>
              <div
                className="button"
                onClick={() => {
                  randomShapesPosition(shapesValue);
                }}
              >
                <div className={sortingByid(shapesValue)[5].shape} />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
}
