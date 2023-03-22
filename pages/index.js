import Layout from "../components/Layout";
// import Profile from "../components/Profile";
import Articles from "../components/Articles";
import LoginPopup from "../components/LoginPopup";

export default function Page() {
  return (
    <Layout>
      {/* <Profile /> */}
      <Articles />
      <LoginPopup />
    </Layout>
  );
}
