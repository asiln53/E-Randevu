import { Button, Col, Form, Input, Row, TimePicker } from "antd";
import moment from "moment";
import React from "react";

function DoctorForm({ onFinish, initivalValues }) {
  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        ...initivalValues,
        ...(initivalValues && {
          timings: [
            moment(initivalValues?.timings[0], "HH:mm"),
            moment(initivalValues?.timings[1], "HH:mm"),
          ],
        }),
      }}
    >
      <h1 className="card-title mt-3">Kişisel Bilgiler</h1>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Adınız"
            name="firstName"
            rules={[{ required: true }]}
          >
            <Input placeholder="Ad" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Soyadınız"
            name="lastName"
            rules={[{ required: true }]}
          >
            <Input placeholder="Soyad" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Telefon"
            name="phoneNumber"
            rules={[{ required: true }]}
          >
            <Input placeholder="Numara" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Web Sitesi"
            name="website"
            rules={[{ required: true }]}
          >
            <Input placeholder="Web Sitesi" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Adres"
            name="address"
            rules={[{ required: true }]}
          >
            <Input placeholder="Adres" />
          </Form.Item>
        </Col>
      </Row>
      <hr />
      <h1 className="card-title mt-3">Profesyonel Bilgiler</h1>
      <Row gutter={20}>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Uzmanlık"
            name="specialization"
            rules={[{ required: true }]}
          >
            <Input placeholder="Uzmanlık" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Deneyim"
            name="experience"
            rules={[{ required: true }]}
          >
            <Input placeholder="Deneyim" type="number" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Ücret"
            name="feePerCunsultation"
            rules={[{ required: true }]}
          >
            <Input placeholder="Ücret" type="number" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Çalışma Saatleri"
            name="timings"
            rules={[{ required: true }]}
          >
            <TimePicker.RangePicker format="HH:mm" />
          </Form.Item>
        </Col>
        <Col span={8} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label="Randevu Süresi"
            name="maxAppointmentDuration"
            rules={[{ required: true }]}
          >
            <Input placeholder="Randevu Süresi" type="number" />
          </Form.Item>
        </Col>
      </Row>

      <div className="d-flex justify-content-end">
        <Button className="primary-button" htmlType="submit">
          Gönder
        </Button>
      </div>
    </Form>
  );
}

export default DoctorForm;
