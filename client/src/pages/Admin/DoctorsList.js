import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Table } from "antd";
import moment from "moment";

function DoctorsList() {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();
  const getDoctorsData = async () => {
    try {
      dispatch(showLoading());
      const resposne = await axios.get("/api/admin/get-all-doctors", {
        withCredentials: true,
      });
      dispatch(hideLoading());
      if (resposne.data.success) {
        setDoctors(resposne.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const changeDoctorStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const resposne = await axios.post(
        "/api/admin/change-doctor-account-status",
        { doctorId: record._id, userId: record.userId, status: status },
        {
          withCredentials: true,
        }
      );
      dispatch(hideLoading());
      if (resposne.data.success) {
        toast.success(resposne.data.message);
        getDoctorsData();
      }
    } catch (error) {
      toast.error("Error changing doctor account status");
      dispatch(hideLoading());
    }
  };
  useEffect(() => {
    getDoctorsData();
  }, []);
  const columns = [
    {
      title: "İsim",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Telefon",
      dataIndex: "phoneNumber",
    },
    {
      title: "Oluşturulma Tarihi",
      dataIndex: "createdAt",
      render: (text, record) => moment(record.createdAt).format("DD-MM-YYYY"),
    },
    {
      title: "Durum",
      dataIndex: "status",
    },
    {
      title: "İşlemler",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "İşlemde" && (
            <h1
              className="anchor"
              onClick={() => changeDoctorStatus(record, "Onaylandı")}
            >
              Onayla
            </h1>
          )}
          {record.status === "Onaylandı" && (
            <h1
              className="anchor"
              onClick={() => changeDoctorStatus(record, "Silindi")}
            >
              Sil
            </h1>
          )}
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h1 className="page-header">Doktor Listesi</h1>
      <hr />
      <Table columns={columns} dataSource={doctors} />
    </Layout>
  );
}

export default DoctorsList;
