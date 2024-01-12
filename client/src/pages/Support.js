import Layout from "../components/Layout";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";

function Support() {
  const email = localStorage.getItem("email");
  const baslik = localStorage.getItem("email");
  const [mesaj, setMesaj] = useState("");

  const sendEmail = async (e) => {
    e.preventDefault();

    const data = {
      email,
      baslik,
      mesaj,
    };

    try {
      const response = await axios.post("/api/sendEmail/send", data, {
        withCredentials: true,
      });

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error("Mail gönderilemedi");
      }
      setMesaj("");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <Layout>
      <h1 className="page-title">Destek Sayfası</h1>
      <div className="support">
        <div className="support-div">
          <form className="support-form" onSubmit={sendEmail}>
            <input
              className="support-mail"
              type="text"
              placeholder={email}
              readOnly
            />
            <textarea
              className="support-mesaj"
              placeholder="Mesaj"
              required
              value={mesaj}
              onChange={(e) => setMesaj(e.target.value)}
            ></textarea>
            <button type="submit" className="suppord-buton">
              Gönder
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Support;
