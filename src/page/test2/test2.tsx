import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  FormProps,
  Input,
  Radio,
  Row,
  Select,
  Space,
  Table,
} from "antd";
import "./test2.scss";
import Flag from "react-flagkit";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  setCurrentPage,
  setDataTable,
  setEditKey,
  setSelectRowKey,
} from "../../redux/dataTableSlice";
import { formatToTimeZone } from "date-fns-timezone";
import dayjs from "dayjs";
// import moment from "react-moment";

interface DataType {
  key: React.ReactNode;
  name: string;
  age: number;
  address: string;
  children?: DataType[];
}

type FieldType = {
  title: string;
  firstname: string;
  lastname: string;
  birthday: Date;
  nationality: string;
  citizen_id1?: string;
  citizen_id2?: string;
  citizen_id3?: string;
  citizen_id4?: string;
  citizen_id5?: string;
  gender: string;
  mobile_phone: string;
  prefix_mobile: string;
  passport_no?: string;
  expected_salary: string;
};

const { Option } = Select;

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

export function Test2() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const selectedRowKeys = useSelector(
    (state: RootState) => state.dataTable.selectedRowKeys
  );
  const PAGE_SIZE = useSelector(
    (state: RootState) => state.dataTable.page_size
  );
  const currentPage = useSelector(
    (state: RootState) => state.dataTable.currentPage
  );
  const currentDataTable = useSelector(
    (state: RootState) => state.dataTable.dataTable
  );
  const editKey = useSelector((state: RootState) => state.dataTable.editKey);
  const dispatch = useDispatch();

  const onSelectChange = (selectedKeys: React.Key[]) => {
    dispatch(setSelectRowKey(selectedKeys));
  };

  const columns = [
    {
      title: t("name"),
      dataIndex: "name",
      key: "name",
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: t("gender"),
      dataIndex: "gender",
      key: "gender",
      sorter: (a: any, b: any) => a.gender.localeCompare(b.gender),
    },
    {
      title: t("mobile_phone"),
      dataIndex: "mobile_phone",
      key: "mobile_phone",
      sorter: (a: any, b: any) => a.mobile_phone.localeCompare(b.mobile_phone),
    },
    {
      title: t("nationality"),
      dataIndex: "nationality",
      key: "nationality",
      sorter: (a: any, b: any) => a.nationality.localeCompare(b.nationality),
    },
    {
      title: t("manage"),
      key: "action",
      render: (record: DataType) => (
        <Space size="middle">
          <a
            href="#"
            onClick={() => {
              dispatch(setEditKey(record.key?.toString()));
              setValueFormForEdit(record.key!.toString());
            }}
            className="a-custom-style"
          >
            {t("edit")}
          </a>
          <a
            href="#"
            onClick={() => {
              deleteDataByKey(record.key?.toString());
            }}
            className="a-custom-style"
          >
            {t("delete")}
          </a>
        </Space>
      ),
    },
  ];

  const handleSelectAll = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      const startIdx = (currentPage - 1) * PAGE_SIZE;
      const endIdx = startIdx + PAGE_SIZE;
      const currentData = currentDataTable
        .slice(startIdx, endIdx)
        .map((item) => ({
          ...item,
          gender: t(item.gender),
          nationality: t(item.nationality),
        }))
        .sort((a, b) => Number(a.key) - Number(b.key));
      dispatch(setSelectRowKey(currentData.map((item) => item.key)));
    } else {
      dispatch(setSelectRowKey([]));
    }
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    dispatch(setSelectRowKey([]));
  };

  const rowSelection = {
    selectedRowKeys: selectedRowKeys,
    onChange: onSelectChange,
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    let data;
    if (
      values.citizen_id1?.length &&
      values.citizen_id2?.length &&
      values.citizen_id3?.length &&
      values.citizen_id4?.length &&
      values.citizen_id5?.length
    ) {
      data = {
        title: values.title,
        firstname: values.firstname,
        lastname: values.lastname,
        birthday: values.birthday
          ? formatToTimeZone(values.birthday, "YYYY-MM-DDTHH:mm:ss.SSSZ", {
              timeZone: "Asia/Bangkok",
            })
          : "",
        nationality: values.nationality,
        citizen_id1: values.citizen_id1,
        citizen_id2: values.citizen_id2,
        citizen_id3: values.citizen_id3,
        citizen_id4: values.citizen_id4,
        citizen_id5: values.citizen_id5,
        gender: values.gender,
        mobile_phone: values.mobile_phone,
        prefix_mobile: values.prefix_mobile,
        passport_no: values.passport_no,
        expected_salary: values.expected_salary,
      };
    } else {
      data = {
        title: values.title,
        firstname: values.firstname,
        lastname: values.lastname,
        birthday: values.birthday
          ? formatToTimeZone(values.birthday, "YYYY-MM-DDTHH:mm:ss.SSSZ", {
              timeZone: "Asia/Bangkok",
            })
          : "",
        nationality: values.nationality,
        citizen_id1: "",
        citizen_id2: "",
        citizen_id3: "",
        citizen_id4: "",
        citizen_id5: "",
        gender: values.gender,
        mobile_phone: values.mobile_phone,
        prefix_mobile: values.prefix_mobile,
        passport_no: values.passport_no,
        expected_salary: values.expected_salary,
      };
    }
    if (editKey) {
      updateDataByKey(editKey, data);
    } else {
      createDataSource(data);
    }
    setDatasourceToDataTable();
  };

  function createDataSource(data: any) {
    let storedData = localStorage.getItem("data");
    let dataSource: any[] = [];

    if (storedData) {
      dataSource = JSON.parse(storedData);
    }
    const key =
      dataSource.length > 0
        ? (parseInt(dataSource[dataSource.length - 1].key) + 1).toString()
        : "1";
    const newData = { ...data, key };
    dataSource.push(newData);
    localStorage.setItem("data", JSON.stringify(dataSource));
    alert(t("save_success"));
    form.resetFields();
  }

  const updateDataByKey = (keyToUpdate: string, newData: any) => {
    const storedData = localStorage.getItem("data");
    if (!storedData) {
      console.error("No data found in localStorage");
      return;
    }

    const parsedData = JSON.parse(storedData);

    if (!Array.isArray(parsedData)) {
      console.error("Stored data is not an array");
      return;
    }

    const updatedData = parsedData.map((item) => {
      if (item.key === keyToUpdate) {
        return { ...item, ...newData };
      } else {
        return item;
      }
    });

    localStorage.setItem("data", JSON.stringify(updatedData));
    dispatch(setEditKey(null));
    alert(t("save_success"));
    form.resetFields();
  };

  const deleteMultipleDataByKey = (keysToDelete: React.Key[]) => {
    // ดึงข้อมูลจาก localStorage
    if (!keysToDelete.length) {
      return;
    }
    const storedData = localStorage.getItem("data");
    if (!storedData) {
      console.error("No data found in localStorage");
      return;
    }
    const parsedData = JSON.parse(storedData);
    if (!Array.isArray(parsedData)) {
      console.error("Stored data is not an array");
      return;
    }

    const updatedData = parsedData.filter(
      (item) => !keysToDelete.includes(item.key)
    );
    localStorage.setItem("data", JSON.stringify(updatedData));
    setDatasourceToDataTable();
    alert(t("delete_success"));
    dispatch(setSelectRowKey([]));
  };

  const deleteDataByKey = (keyToDelete: string | undefined) => {
    // ดึงข้อมูลจาก localStorage
    const storedData = localStorage.getItem("data");
    if (!storedData) {
      console.error("No data found in localStorage");
      return;
    }
    const parsedData = JSON.parse(storedData);
    if (!Array.isArray(parsedData)) {
      console.error("Stored data is not an array");
      return;
    }

    const updatedData = parsedData.filter((item) => item.key !== keyToDelete);
    localStorage.setItem("data", JSON.stringify(updatedData));
    setDatasourceToDataTable();
    alert(t("delete_success"));
    dispatch(setSelectRowKey([]));
  };

  function setValueFormForEdit(key: string) {
    const storedData = localStorage.getItem("data");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (!Array.isArray(parsedData)) {
        console.error("Stored data is not an array");
        return;
      }
      const setVal = parsedData.filter((item) => item.key === key)[0];
      form.setFieldsValue({ ...setVal, birthday: dayjs(setVal.birthday) });
    }
  }

  function setDatasourceToDataTable() {
    const localStorageData = localStorage.getItem("data");
    const parsedData = localStorageData ? JSON.parse(localStorageData) : [];
    const tData = parsedData.map((item: any, index: any) => ({
      key: item.key,
      name: `${item.firstname} ${item.lastname}`,
      gender: item.gender,
      mobile_phone: `${item.prefix_mobile}${item.mobile_phone}`,
      nationality: item.nationality,
    }));
    dispatch(setDataTable(tData));
  }

  function randerDataTable() {
    const startIdx = (currentPage - 1) * PAGE_SIZE;
    const endIdx = startIdx + PAGE_SIZE;
    const currentData = currentDataTable
      .slice(startIdx, endIdx)
      .map((item) => ({
        ...item,
        gender: t(item.gender),
        nationality: t(item.nationality),
      }))
      .sort((a, b) => Number(a.key) - Number(b.key));
    return currentData;
  }

  useEffect(() => {
    setDatasourceToDataTable();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          border: "2px solid black",
          borderRadius: "8px",
          padding: "10px 10px 10px 10px",
        }}
      >
        <Form
          name="basic"
          form={form}
          wrapperCol={{ span: 24 }}
          style={{ minWidth: 1000 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Row gutter={9}>
            <Col span={4} style={{ justifyContent: "start" }}>
              <Form.Item<FieldType>
                label={t("title")}
                name="title"
                style={{ display: "inline-block", width: "100%" }}
                rules={[
                  { required: true, message: t("Please choose a title") },
                ]}
              >
                <Select placeholder={t("title")} allowClear>
                  <Option value="mr">{t("mr")}</Option>
                  <Option value="mrs">{t("mrs")}</Option>
                  <Option value="ms">{t("ms")}</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item<FieldType>
                label={t("firstname")}
                name="firstname"
                style={{ display: "inline-block", width: "100%" }}
                rules={[
                  {
                    required: true,
                    message: t("Please enter your first name"),
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item<FieldType>
                label={t("lastname")}
                name="lastname"
                style={{ display: "inline-block", width: "100%" }}
                rules={[
                  { required: true, message: t("Please enter your last name") },
                ]}
              >
                <Input style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={9}>
            <Col span={6} style={{ justifyContent: "start" }}>
              <Form.Item<FieldType>
                label={t("birthday")}
                name="birthday"
                style={{ display: "inline-block", width: "100%" }}
                rules={[
                  {
                    required: true,
                    message: t("Please select your birth date"),
                  },
                ]}
              >
                <DatePicker
                  format={"MM/DD/YYYY"}
                  placeholder={t("mm//dd//yy")}
                />
              </Form.Item>
            </Col>
            <Col span={10} style={{ justifyContent: "start" }}>
              <Form.Item<FieldType>
                label={t("nationality")}
                name="nationality"
                style={{ display: "inline-block", width: "100%" }}
                rules={[
                  {
                    required: true,
                    message: t("Please select your nationality"),
                  },
                ]}
              >
                <Select placeholder={t("please_select")} allowClear>
                  <Option value="thai">{t("thai")}</Option>
                  <Option value="france">{t("france")}</Option>
                  <Option value="american">{t("american")}</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={9}>
            <Col span={4}>
              <Form.Item<FieldType>
                label={t("citizen_id")}
                name="citizen_id1"
                style={{ display: "inline-block", width: "100%" }}
              >
                <Input
                  width={"100%"}
                  maxLength={1}
                  style={{ textAlign: "center" }}
                  onKeyDown={(event) => {
                    const key = event.key;
                    if (!/[\d\b]/.test(key) && key !== "Backspace") {
                      event.preventDefault();
                    }
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={1} style={{ display: "flex", justifyContent: "center" }}>
              <p style={{ margin: 0, marginTop: "3px" }}>-</p>
            </Col>
            <Col span={4}>
              <Form.Item<FieldType>
                name="citizen_id2"
                style={{ display: "inline-block", width: "100%" }}
              >
                <Input
                  width={"100%"}
                  maxLength={4}
                  style={{ textAlign: "center" }}
                  onKeyDown={(event) => {
                    const key = event.key;
                    if (!/[\d\b]/.test(key) && key !== "Backspace") {
                      event.preventDefault();
                    }
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={1} style={{ display: "flex", justifyContent: "center" }}>
              <p style={{ margin: 0, marginTop: "3px" }}>-</p>
            </Col>
            <Col span={4}>
              <Form.Item<FieldType>
                name="citizen_id3"
                style={{ display: "inline-block", width: "100%" }}
              >
                <Input
                  width={"100%"}
                  maxLength={5}
                  style={{ textAlign: "center" }}
                  onKeyDown={(event) => {
                    const key = event.key;
                    if (!/[\d\b]/.test(key) && key !== "Backspace") {
                      event.preventDefault();
                    }
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={1} style={{ display: "flex", justifyContent: "center" }}>
              <p style={{ margin: 0, marginTop: "3px" }}>-</p>
            </Col>
            <Col span={3}>
              <Form.Item<FieldType>
                name="citizen_id4"
                style={{ display: "inline-block", width: "100%" }}
              >
                <Input
                  width={"100%"}
                  maxLength={2}
                  style={{ textAlign: "center" }}
                  onKeyDown={(event) => {
                    const key = event.key;
                    if (!/[\d\b]/.test(key) && key !== "Backspace") {
                      event.preventDefault();
                    }
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={1} style={{ display: "flex", justifyContent: "center" }}>
              <p style={{ margin: 0, marginTop: "3px" }}>-</p>
            </Col>
            <Col span={2}>
              <Form.Item<FieldType>
                name="citizen_id5"
                style={{ display: "inline-block", width: "100%" }}
              >
                <Input
                  width={"100%"}
                  maxLength={1}
                  style={{ textAlign: "center" }}
                  onKeyDown={(event) => {
                    const key = event.key;
                    if (!/[\d\b]/.test(key) && key !== "Backspace") {
                      event.preventDefault();
                    }
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={9}>
            <Col span={10} style={{ justifyContent: "start" }}>
              <Form.Item
                label={t("gender")}
                name={"gender"}
                rules={[
                  { required: true, message: t("Please select your gender") },
                ]}
              >
                <Radio.Group>
                  <Radio value="male"> {t("male")} </Radio>
                  <Radio value="female"> {t("female")} </Radio>
                  <Radio value="unsex"> {t("unsex")} </Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={9}>
            <Col span={8} style={{ justifyContent: "start" }}>
              <Form.Item<FieldType>
                label={t("mobile_phone")}
                name="prefix_mobile"
                style={{ display: "inline-block", width: "100%" }}
                rules={[
                  {
                    required: true,
                    message: t("Please select your mobile phone country code"),
                  },
                ]}
              >
                <Select
                  allowClear
                  options={[
                    {
                      value: "+66",
                      label: (
                        <>
                          <Flag country="TH" size={12} /> +66
                        </>
                      ),
                    },
                    {
                      value: "+1",
                      label: (
                        <>
                          <Flag country="US" size={12} /> +1
                        </>
                      ),
                    },
                    {
                      value: "+33",
                      label: (
                        <>
                          <Flag country="FR" size={12} /> +33
                        </>
                      ),
                    },
                  ]}
                ></Select>
              </Form.Item>
            </Col>
            <Col span={1} style={{ display: "flex", justifyContent: "center" }}>
              <p style={{ margin: 0, marginTop: "3px" }}>-</p>
            </Col>
            <Col span={8}>
              <Form.Item<FieldType>
                name="mobile_phone"
                style={{ display: "inline-block", width: "100%" }}
                rules={[
                  {
                    required: true,
                    message: t("Please enter your mobile phone number"),
                  },
                ]}
              >
                <Input
                  width={"100%"}
                  maxLength={10}
                  onKeyDown={(event) => {
                    const key = event.key;
                    if (!/[\d\b]/.test(key) && key !== "Backspace") {
                      event.preventDefault();
                    }
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={9}>
            <Col span={12}>
              <Form.Item<FieldType>
                label={t("passport_no")}
                name="passport_no"
                style={{ display: "inline-block", width: "100%" }}
              >
                <Input maxLength={7} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={9}>
            <Col span={12}>
              <Form.Item<FieldType>
                label={t("expected_salary")}
                name="expected_salary"
                style={{ display: "inline-block", width: "100%" }}
                rules={[
                  {
                    required: true,
                    message: t("Please enter your expected salary"),
                  },
                ]}
              >
                <Input
                  onKeyDown={(event) => {
                    const key = event.key;
                    if (!/[\d\b]/.test(key) && key !== "Backspace") {
                      event.preventDefault();
                    }
                  }}
                  maxLength={7}
                />
              </Form.Item>
            </Col>
            <Col span={6} style={{ display: "flex", justifyContent: "end" }}>
              <Button
                onClick={() => {
                  form.resetFields();
                  dispatch(setEditKey(null));
                }}
              >
                {t("reset")}
              </Button>
            </Col>
            <Col span={6} style={{ display: "flex", justifyContent: "center" }}>
              <Button htmlType="submit">{t("submit")}</Button>
            </Col>
          </Row>
        </Form>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "90%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignSelf: "start",
          }}
        >
          <Checkbox
            onChange={handleSelectAll}
            checked={selectedRowKeys.length === randerDataTable().length}
            indeterminate={
              selectedRowKeys.length > 0 &&
              selectedRowKeys.length < randerDataTable().length
            }
          />
          <p style={{ marginLeft: "0.8rem", marginRight: "0.8rem" }}>
            {t("select_all")}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              onClick={() => {
                deleteMultipleDataByKey(selectedRowKeys);
              }}
            >
              {t("delete")}
            </Button>
          </div>
        </div>
        <Table
          style={{ minWidth: "90%", marginBottom: "5rem" }}
          columns={columns}
          rowSelection={{ ...rowSelection }}
          dataSource={randerDataTable()}
          pagination={{
            current: currentPage,
            pageSize: PAGE_SIZE,
            total: currentDataTable.length,
            onChange: handlePageChange,
            position: ["topRight"],
            itemRender: (page, type, originalElement) => {
              if (type === "prev") {
                return (
                  <a className={currentPage === 1 ? "disabled" : "active"}>
                    {t("prev")}
                  </a>
                );
              }
              if (type === "next") {
                return (
                  <a
                    className={
                      currentPage ===
                      Math.ceil(currentDataTable.length / PAGE_SIZE)
                        ? "disabled"
                        : "active"
                    }
                  >
                    {t("next")}
                  </a>
                );
              }
              return originalElement;
            },
            className: "custom-pagination",
          }}
        />
      </div>
    </div>
  );
}
