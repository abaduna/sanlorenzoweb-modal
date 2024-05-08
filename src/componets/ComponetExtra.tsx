"use client"
import { extra } from "@/app/admin/formulario/[id]/page";
import { useState } from "react";
import styles from "./componentExtraModal.module.css";
import { useFetch } from "@/hock/useFetch";

const ComponetExtra = ({ id, price, title }: extra) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [priceStatr, setPriceState] = useState<number>(price);
  const [titleState, setTitleState] = useState<string>(title);
  const [endpoint,setEndpoint]= useState<string>("")
  const { upDateExtra} = useFetch();
  const openModal = () => {
    setModalIsOpen(true);
  };
  const updateformExtra = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        setEndpoint(`api/extra/${id}`)
        const extra:extra ={
            price:priceStatr,
            title:titleState,
            id
        }
        upDateExtra(endpoint,extra)
      
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button type="button" onClick={openModal}>
        Editar
      </button>
      {modalIsOpen && (
        <div className={styles.modal}>
          <form onSubmit={updateformExtra}>
            <input
              className={styles.input}
              type="number"
              value={priceStatr}
              onChange={(e) => setPriceState(+e.target.value)}
            />
            <input
              className={styles.input}
              type="text"
              value={titleState}
              onChange={(e) => setTitleState(e.target.value)}
            />

            <button>Guardar</button>
          </form>
        </div>
      )}
    </div>
  );
};
export default ComponetExtra;
