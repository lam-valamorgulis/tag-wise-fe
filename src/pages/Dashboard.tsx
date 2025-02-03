import LocalRules from "../features/LocalRules/LocalRules";

// const { Sider, Content } = Layout;

const Dashboard = () => {
  // const [collapsed, setCollapsed] = useState(false);
  // const toggleCollapsed = () => {
  //   setCollapsed(!collapsed);
  // };

  // const {
  //   token: { colorBgContainer, borderRadiusLG },
  // } = theme.useToken();

  return (
    <>
      {/* <Layout className="h-screen">
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
        <Layout>
          <HeaderBar collapsed={collapsed} setCollapsed={toggleCollapsed} />
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <LocalRules />
          </Content>
        </Layout>
      </Layout> */}
      <LocalRules />
    </>
  );
};

export default Dashboard;
