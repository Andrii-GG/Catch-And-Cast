import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <section className="socialMedia-block">
        <p className="footer-title">Шукайте нас</p>
        <ul>
          <li>
            <img src="icons/instagram.svg"></img>
          </li>
          <li>
            <img src="icons/telegram.svg"></img>
          </li>
          <li>
            <img src="icons/facebook.svg"></img>
          </li>
          <li>
            <img src="icons/discord.svg"></img>
          </li>
        </ul>
      </section>
      <section className="contacts-block">
        <p className="footer-title">Контакти</p>
        <ul>
          <li>+380 987654675</li>
          <li>+380 564537565</li>
          <li>catchandcast@gmail.com</li>
        </ul>
      </section>
      <section className="about-block">
        <p className="footer-title">Про нас</p>
        <ul>
          <li>Андрій</li>
          <li>Кирило</li>
          <li>Марта</li>
        </ul>
      </section>
      <section className="support-block">
        <p className="footer-title">Підтримка</p>
        <ul>
          <li>Доставка і оплата</li>
          <li>Гарантія і повернення</li>
          <li>Угода користувача</li>
        </ul>
      </section>
      <img
        src="logo-footer.svg"
        className="footer-logo"
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
          navigate("/");
        }}
      ></img>
    </footer>
  );
}

export default Footer;
