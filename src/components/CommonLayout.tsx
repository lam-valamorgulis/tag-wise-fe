import {
  AimOutlined,
  CommentOutlined,
  FileTextOutlined,
  GoldOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import HeaderBar from "../components/HeaderBar";
import LogoApp from "../components/LogoApp";

const { Sider, Content } = Layout;

const CommonLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

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
          onClick={({ key }) => {
            navigate(
              key === "1"
                ? "/"
                : key === "2"
                ? "/checklist"
                : key === "3"
                ? "/comments"
                : "/hqrules"
            );
          }}
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
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: "auto",
            height: "calc(100vh - 112px)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default CommonLayout;
