import { useState } from "react";
import ProfileTab1 from "./ProfileTab1";
import { useNavigate } from "react-router-dom";
import { setCartItemCount } from "./store";
import { useDispatch } from "react-redux";
import ProfileTab2 from "./ProfileTab2";
import ProfileTab3 from "./ProfileTab3";

function ProfilePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("tab1");

  const dispatch = useDispatch();

  return (
    <div className="profilePage">
      <section className="profile-title">Мій профіль</section>
      <section className="profile-list">
        <ul>
          <li
            className={activeTab === "tab1" ? "active-tab" : ""}
            onClick={() => setActiveTab("tab1")}
          >
            Особисті дані
          </li>
          <li
            className={activeTab === "tab2" ? "active-tab" : ""}
            onClick={() => setActiveTab("tab2")}
          >
            Мої замовлення
          </li>
          <li
            className={activeTab === "tab3" ? "active-tab" : ""}
            onClick={() => setActiveTab("tab3")}
          >
            Змінити дані
          </li>
        </ul>
      </section>
      <section className="profile-container">
        {" "}
        {activeTab === "tab1" && <ProfileTab1></ProfileTab1>}
        {activeTab === "tab2" && <ProfileTab2></ProfileTab2>}
        {activeTab === "tab3" && <ProfileTab3></ProfileTab3>}
      </section>
      <section
        className="profile-exit"
        onClick={() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          navigate("/");
          dispatch(setCartItemCount(0));
        }}
      >
        Вийти
      </section>
    </div>
  );
}

export default ProfilePage;
