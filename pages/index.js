import Layout from "../components/Layout";
import Articles from "../components/Articles";
import LoginPopup from "../components/LoginPopup";

export default function Page() {
  return (
    <Layout>
      <Articles />
      <LoginPopup />
    </Layout>
  );
}
