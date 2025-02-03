import {
  AimOutlined,
  CommentOutlined,
  FileTextOutlined,
  GoldOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import HeaderBar from "../components/HeaderBar";
import LogoApp from "../components/LogoApp";

const { Sider, Content } = Layout;

const CommonLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="h-screen">
      {/* Sidebar */}
      <Sider
        width={210}
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
        style={{ borderRight: "1px solid #d9d9d9" }}
      >
        <LogoApp />
        <Menu
          theme="light"
          mode="inline"
          style={{ borderInlineEndStyle: "none" }}
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <AimOutlined />,
              label: "Local Rules",
            },
            {
              key: "2",
              icon: <FileTextOutlined />,
              label: "Check List",
            },
            {
              key: "3",
              icon: <CommentOutlined />,
              label: "Comments Template",
            },
            {
              key: "4",
              icon: <GoldOutlined />,
              label: "HQ Rules",
            },
          ]}
        />
      </Sider>

      {/* Main Layout */}
      <Layout>
        <HeaderBar collapsed={collapsed} setCollapsed={toggleCollapsed} />
        <Content
          style={{
            margin: "12px 8px",
            padding: 12,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {/* Render Outlet for child routes */}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default CommonLayout;
