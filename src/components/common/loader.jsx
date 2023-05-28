import React from "react";
import { Space, Spin } from "antd";

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-3">
      <Space size="middle">
        <Spin size="large" />
      </Space>
    </div>
  );
}
