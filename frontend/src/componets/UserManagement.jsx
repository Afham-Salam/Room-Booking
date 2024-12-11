import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm, message, Modal, Form, Input } from "antd";
import api from "../api";

export default function UserManagement() {
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/users/all");
        setData(res.data.users);
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error("Failed to load user data.");
      }
    };
    fetchData();
  }, []);

  // Open edit modal
  const openEditModal = (record) => {
    setEditId(record._id);
    form.setFieldsValue({
      name: record.name,
      email: record.email,
      role: record.role,
    });
    setIsModalOpen(true);
  };

  // Handle edit save
  const handleSave = async () => {
    try {
      const values = form.getFieldsValue();
      await api.put(`/users/edit/${editId}`, values);
      setData((prev) =>
        prev.map((user) =>
          user._id === editId ? { ...user, ...values } : user
        )
      );
      message.success("User updated successfully.");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
      message.error("Failed to update user.");
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await api.delete(`/users/delete/${id}`);
      setData((prev) => prev.filter((user) => user._id !== id));
      message.success("User deleted successfully.");
    } catch (error) {
      console.error("Error deleting user:", error);
      message.error("Failed to delete user.");
    }
  };

  // Table columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div className="flex flex-wrap gap-2">
          <Button
            type="primary"
            size="small"
            onClick={() => openEditModal(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger size="small">
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="h-full w-full px-4 sm:px-8 bg-gray-50 py-6">
      <h1 className="text-2xl font-semibold text-center mb-6">
        User Management
      </h1>
      <Table
        dataSource={data}
        columns={columns}
        rowKey="_id"
        pagination={{ pageSize: 5 }}
        bordered
        className="bg-white shadow-sm"
        scroll={{ x: "100%" }}
      />
      <Modal
        title="Edit User"
        open={isModalOpen}
        onOk={handleSave}
        onCancel={() => setIsModalOpen(false)}
        okText="Save"
        cancelText="Cancel"
        centered
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[
              { required: true, message: "Please enter the user's name." },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please enter a valid email." }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[
              { required: true, message: "Please specify the user's role." },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
