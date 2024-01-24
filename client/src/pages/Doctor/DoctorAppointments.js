import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Button, Table, Tabs } from "antd";
import moment from "moment";

const { TabPane } = Tabs;

function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();

  const getAppointmentsData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(
        "/api/doctor/get-appointments-by-doctor-id",
        {
          withCredentials: true,
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        // Ayırma işlemi
        const active = response.data.data.filter(
          (appointment) => appointment.isActive
        );
        const inactive = response.data.data.filter(
          (appointment) => !appointment.isActive
        );

        setAppointments({ active, inactive });
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const changeAppointmentStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/doctor/change-appointment-status",
        { appointmentId: record._id, status: status },
        {
          withCredentials: true,
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        getAppointmentsData();
      }
    } catch (error) {
      toast.error("Error changing doctor account status");
      dispatch(hideLoading());
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      dispatch(showLoading());

      const response = await axios.put(
        `/api/doctor/cancel-appointment/${appointmentId}`,
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

  const columns = [
    {
      title: "Randevu Id",
      dataIndex: "_id",
    },
    {
      title: "Hasta Adı",
      dataIndex: "name",
      render: (text, record) => <span>{record.userInfo.name}</span>,
    },
    {
      title: "Hasta Telefon",
      dataIndex: "phoneNumber",
      render: (text, record) => <span>{record.userInfo.phoneNumber}</span>,
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
    {
      title: "İşlemler",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "İşlemde" && (
            <div className="d-flex">
              <h1
                className="anchor px-2"
                onClick={() => changeAppointmentStatus(record, "Onaylandı")}
              >
                Onayla
              </h1>
              <h1
                className="anchor"
                onClick={() => changeAppointmentStatus(record, "Onaylanmadı")}
              >
                Red Et
              </h1>
            </div>
          )}
          {record.status === "Onaylandı" && (
            <Button type="danger" onClick={() => cancelAppointment(record._id)}>
              İptal Et
            </Button>
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    getAppointmentsData();
  }, []);

  return (
    <Layout>
      <h1 className="page-header">Randevular</h1>
      <hr />
      <Tabs defaultActiveKey="1">
        <TabPane tab="Aktif Randevular" key="1">
          <Table columns={columns} dataSource={appointments.active} />
        </TabPane>
        <TabPane tab="Geçmiş Randevular" key="2">
          <Table columns={columns} dataSource={appointments.inactive} />
        </TabPane>
      </Tabs>
    </Layout>
  );
}

export default DoctorAppointments;
