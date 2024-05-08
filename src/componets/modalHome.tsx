import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import styles from "./Modal.module.css";
import { Menu } from "@/app/page";
import { useFetch } from "@/hock/useFetch";
import { extra } from "./FormularioAdmin";
import { projects } from "../config/menu.json";
function ModalHome({ title, price, itemid, setCarrito,id }: Menu) {
  const [modal, setModal] = useState<boolean>(false);
  const [endpoint, setEndpoint] = useState<string>("");
  const [extra, setExtra] = useState<extra[]>([]);
  const [select, setSelect] = useState<string>("");
  const [extTitle, setExtTitle] = useState<string>("");
  const { getData } = useFetch();
  const projectWithId1 = projects.find((project) => project.itemid === (id ? +id : ""));

  useEffect(() => {
    const getDataExtra = async () => {
     

      setExtra(projectWithId1?.extra as any);
    };
    getDataExtra();
  }, []);


  const mandardata = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const producto = {
      title,
      select,
      extTitle
    };
    setModal(!modal)
    setCarrito && setCarrito((prev: any) => [...prev, producto]);
  };
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    setSelect(selectedOption);
  
    // Buscar el título correspondiente al valor seleccionado
    const selectedExtra = extra.find((ext) => ext.price === +selectedOption);
    if (selectedExtra) {
      setExtTitle(selectedExtra.title); // Establecer el título correspondiente
    } else {
      setExtTitle(""); // Si no se encuentra el título, se establece como vacío
    }
  };
  
  return (
    <>
      <button className={styles.btnOrder} onClick={() => setModal(!modal)}>
        Pedir 
      </button>
      {modal && (
        <div className={styles.modal}>
          <form onSubmit={(e) => mandardata(e)}>
            <div>
              <div className={styles.modalcontent}>
                <p>{title}</p>
                <label>Variantes</label>
                <select onChange={handleSelectChange}>
                  <option value="">Cual preferis?</option>
                  {extra &&
                    extra.length > 0 &&
                    extra.map((ext, index) => (
                      <option key={index} value={`${ext.price},${ext.title}`}>
                        {ext.title}-{ext.price}$
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <button className={styles.addButton} type="submit">
              Pedir
            </button>
            <button
              className={styles.closeBtn}
              type="button"
              onClick={() => setModal(!modal)}
            >
              Cerrar
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default ModalHome;
