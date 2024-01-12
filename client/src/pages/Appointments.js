import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../components/Layout";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Table, Tabs, Button } from "antd";
import moment from "moment";

const { TabPane } = Tabs;

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [activeAppointments, setActiveAppointments] = useState([]);
  const [canceledAppointments, setCanceledAppointments] = useState([]);
  const dispatch = useDispatch();

  const getAppointmentsData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(
        "/api/user/get-appointments-by-user-id",
        {
          withCredentials: true,
        }
      );
      dispatch(hideLoading());

      if (response.data.success) {
        setAppointments(response.data.data);

        // Filtreleme işlemleri
        const active = response.data.data.filter(
          (appointment) => appointment.isActive
        );
        const canceled = response.data.data.filter(
          (appointment) => !appointment.isActive
        );

        setActiveAppointments(active);
        setCanceledAppointments(canceled);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const columns = [
    {
      title: "Randevu Id",
      dataIndex: "_id",
    },
    {
      title: "Doktor",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.doctorInfo.firstName} {record.doctorInfo.lastName}
        </span>
      ),
    },
    {
      title: "Numara",
      dataIndex: "phoneNumber",
      render: (text, record) => <span>{record.doctorInfo.phoneNumber}</span>,
    },
    {
      title: "Tarih & Saat",
      dataIndex: "createdAt",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")}{" "}
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Durum",
      dataIndex: "status",
    },
    // Sadece "Canceled Appointments" tablosunda gösterilecek iptal etme butonu
    {
      title: "İşlemler",
      render: (text, record) => {
        return record.isActive ? (
          <Button type="danger" onClick={() => cancelAppointment(record._id)}>
            İptal Et
          </Button>
        ) : null;
      },
    },
  ];

  const cancelAppointment = async (appointmentId) => {
    try {
      dispatch(showLoading());

      const response = await axios.put(
        `/api/user/cancel-appointment/${appointmentId}`,
        {
          withCredentials: true,
        }
      );

      dispatch(hideLoading());

      if (response.data.success) {
        toast.success(response.data.message);
        getAppointmentsData();
      } else {
        toast.error("Randevu iptal edilemedi");
      }
    } catch (error) {
      console.error(error);
      dispatch(hideLoading());
      toast.error("Randevu iptal edilemedi");
    }
  };

  useEffect(() => {
    getAppointmentsData();
  }, []);

  return (
    <Layout>
      <h1 className="page-title">Randevular</h1>
      <hr />
      <Tabs defaultActiveKey="1">
        <TabPane tab="Aktif Randevular" key="1">
          <Table columns={columns} dataSource={activeAppointments} />
        </TabPane>
        <TabPane tab="Geçmiş Randevular" key="2">
          <Table columns={columns} dataSource={canceledAppointments} />
        </TabPane>
      </Tabs>
    </Layout>
  );
}

export default Appointments;
