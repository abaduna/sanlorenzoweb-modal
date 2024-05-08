"use client";
import actionPath from "@/action";
import { bodyProps } from "@/app/admin/page";
import { useFetch } from "@/hock/useFetch";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import styles from "./pageformulaeio.module.css";
interface FormProps {
  updata: boolean;
  setUpdate: Function;
}
export interface extra {
  title: string;
  price: number;
}
function FormularioAdmin({ setUpdate, updata }: FormProps) {
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>(""); //imageUpLoading
  const [imageUpLoading, setImageUpLoading] = useState<File | string>("");
  const [category, setCategory] = useState<string>("");
  const [message, setMessage] = useState<boolean>(false);
  const [titleExtra, setTitleExtra] = useState<string>("");
  const [priceExtre, setPriceExtra] = useState<number>(0);
  const [extra, setExtra] = useState<extra[]>([]);
  const { fetchPost } = useFetch();
  const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: bodyProps = {
      title,
      price,
      imageUpLoading,
      category,
      extra,
    };
    fetchPost(data);
    actionPath();
    setUpdate(!updata);
    setMessage(true);
    setTimeout(() => {
      setMessage(false);
    }, 500);
  };
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageUpLoading(e.target.files[0]);
    } else {
      console.log(`es nulo`);
    }
  };
  const sendExtra = () => {
    const extreNuew = {
      title: titleExtra,
      price: priceExtre,
    };
    setExtra((prev) => [...prev, extreNuew]);
    setTitleExtra("")
    setPriceExtra(0)
  };
  return (
    <>
      <form onSubmit={sendData}>
        {message && <span>Agregado con exito</span>}
        <div className={styles.formuulafrio}>
          <div>
            <label>Título:</label>
            <input
              name="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Precio:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              name="price"
              required
            />
          </div>
          <div>
            <label>Imagen:</label>
            <input type="file" onChange={handleImageChange} required />
          </div>
          <div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Selecciona una categoria</option>
              <option value="hanburgesa">Hamburguesa</option>
              <option value="botellas">Botellas</option>
            </select>
          </div>
          <p>Extra:</p>
          {extra.length > 0 &&
            extra.map((ext, index) => (
              <p key={index}>
                {ext.title} - {ext.price}$
              </p>
            ))}
          <button className={styles.btn} type="submit">
            Enviar
          </button>
        </div>
      </form>
      <div>
        <input type="text" onChange={(e) => setTitleExtra(e.target.value)} />
        <input type="number" onChange={(e) => setPriceExtra(+e.target.value)} />
        <button type="button" onClick={sendExtra}>
          Añadir extra
        </button>
      </div>
    </>
  );
}

export default FormularioAdmin;
