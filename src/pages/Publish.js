import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropzone from "../components/Dropzone";

const Publish = ({ token }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [size, setSize] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [city, setCity] = useState("");

  const [file, setFile] = useState();
  const [data, setData] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("color", color);
      formData.append("size", size);
      formData.append("brand", brand);
      formData.append("picture", file);

      const response = await axios.post(
        "https://my-vinted-api-paul.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
          onUploadProgress: (ProgressEvent) =>
            console.log(
              "Upload progress : " +
                Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
                "%"
            ),
        }
      );
      console.log(response.data);
      setData(response.data);
      alert("offre crée");

      if (response.data?._id) {
        navigate(`/offer/${response.data._id}`);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <section className="publish">
      <form onSubmit={handleSubmit} className="form-publish">
        <h2>Vends ton article</h2>
        <div className="publish-contain pub-file">
          <input
            style={{ display: "none" }}
            type="file"
            onChange={(event) => setFile(event.target.files[0])}
          />
          <Dropzone setFile={setFile} file={file} />
        </div>
        <div className="publish-contain">
          <div>
            <span>Titre</span>
            <input
              type="text"
              placeholder="ex : Chemise hawaienne jaune"
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div>
            <span>Décris ton article</span>
            <textarea
              className="pub-textarea"
              placeholder="ex : Porté plusieurs fois, abimé"
              name=""
              id=""
              cols="41"
              rows="5"
              onChange={(event) => setDescription(event.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="publish-contain">
          <div>
            <span>Marque</span>
            <input
              type="text"
              placeholder="ex : Nike"
              onChange={(event) => setBrand(event.target.value)}
            />
          </div>
          <div>
            <span>Taille</span>
            <input
              type="text"
              placeholder="ex : S / 36 / 10"
              onChange={(event) => setSize(event.target.value)}
            />
          </div>
          <div>
            <span>Couleur</span>
            <input
              type="text"
              placeholder="ex : Fushia"
              onChange={(event) => setColor(event.target.value)}
            />
          </div>
          <div>
            <span>Etat</span>
            <input
              type="text"
              placeholder="ex : Neuf"
              onChange={(event) => setCondition(event.target.value)}
            />
          </div>
          <div>
            <span>Lieu</span>
            <input
              type="text"
              placeholder="ex : Paris"
              onChange={(event) => setCity(event.target.value)}
            />
          </div>
        </div>
        <div className="publish-contain">
          <div>
            <span>Prix</span>
            <input
              type="number"
              placeholder="0.00"
              onChange={(event) => setPrice(event.target.value)}
            />
          </div>
          <div className="publish-check">
            <input type="checkbox" />
            <span>Je suis intéressé(e) par les échanges</span>
          </div>
        </div>
        <input className="form-submit" type="submit" value="Ajouter" />
      </form>
    </section>
  );
};

export default Publish;
