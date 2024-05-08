"use client";
import actionPath from "@/action";
import { useFetch } from "@/hock/useFetch";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import styles from "./pageformulaeio.module.css";
import ComponetExtra from "@/componets/ComponetExtra";
interface paramsProps {
  params: {
    id: string;
  };
}
export interface food {
  id?: string;
  price?: number;
  title?: string;
  url_imagen?: string;
  itemid?: number;
}
export interface extra {
  price: number;
  title: string;
  id: number;
}
const FormAdmin = ({ params }: paramsProps) => {
  const { getDataForid, upDateID, getData } = useFetch();
  const [food, setFood] = useState<food>();
  const [successful, setSuccessful] = useState<boolean>(false);
  const [endpoint, setEndpoint] = useState<string>("/api/extra/");
  const [extra, setExtra] = useState<extra[]>([]);
  const router = useRouter();
  useEffect(() => {
    const verificar = () => {
      const user = localStorage.getItem("user");
      if (user !== "abaduna") {
        router.push("/login");
      }
      const pasword = localStorage.getItem("password");
      if (pasword !== "1234") {
        router.push("/login");
      }
    };
    verificar();
    const fetchFoodData = async () => {
      const response = await getDataForid(params.id);
      if (response) {
        setFood(response.data[0]);
      }
    };

    fetchFoodData();
  }, []);
  useEffect(() => {
    const fetchExtraFood = async () => {
      const itemid = food ? food.itemid : "";
      console.log(itemid);

      setEndpoint(`/api/extra/${itemid}`);
      console.log(endpoint);

      const result = await getData(endpoint);
      console.log(result);
      if (result) {
        setExtra(result.data);
      }
    };
    fetchExtraFood();
  }, [food]);
  const updateform = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      upDateID(params.id, food as food);
      actionPath;
      setSuccessful(true);
      setTimeout(() => {
        setSuccessful(false);
      }, 700);
      router.push("/admin");
    } catch (error) {
      console.log(error);
    }
  };
  const updateTitle = (newTitle: string) => {
    setFood((prevFood) => ({
      ...prevFood,
      title: newTitle,
    }));
  };
  const updatePrice = (newPrice: string) => {
    setFood((prevFood) => ({
      ...prevFood,
      price: +newPrice,
    }));
  };
  return (
    <div>
      {successful && <span>Modificacion exitosa</span>}
      <form onSubmit={updateform} className={styles.formulario}>
        {food && (
          <input
            className={styles.input}
            value={food.title}
            onChange={(e) => updateTitle(e.target.value)}
          />
        )}
        {food && (
          <input
            className={styles.input}
            type="number"
            value={food.price}
            onChange={(e) => updatePrice(e.target.value)}
          />
        )}
        {food && <img src={food.url_imagen} alt={food.title} />}
        
        <button className={styles.btn} type="submit">
          Actualizar
        </button>
      </form>
      {extra.length > 0 &&
          extra.map((ext, index) => <ComponetExtra key={index} {...ext} />)}
    </div>
  );
};

export default FormAdmin;
