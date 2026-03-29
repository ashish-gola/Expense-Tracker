import { Layout, theme } from "antd";
import PropTypes from "prop-types";

const { Header, Content, Footer } = Layout;

const Homelayout = ({ children }) => {

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>   
      <Header className="bg-[#FF735C]! flex items-center justify-center px-4">
        <h1 className="text-white text-xl md:text-3xl font-bold text-center tracking-wide">
          Expense Tracker App
        </h1>
      </Header> 
      <Content 
        style={{
          margin: '20px 16px',
          padding: 24,
          minHeight: 280,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        {children}
      </Content>
      <Footer className="bg-[#FF735C]! flex items-center justify-center px-4 py-5">
        <h1 className="text-white text-base md:text-2xl font-semibold text-center tracking-wide">
          Footer Content
        </h1>
      </Footer>
    </Layout>
  );  
};

Homelayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Homelayout;