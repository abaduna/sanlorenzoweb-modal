import { Menu } from "@/app/page";
import syledCompone from "./component.module.css"
interface ComponetCarritoProps {
  carrito: Menu[];
}
const formattedPhoneNumber = 5493413592493;
function ComponetCarrito({ carrito }: ComponetCarritoProps) {
  console.error(carrito);
  
    const total: number = carrito.reduce((acc, producto:any) => acc + parseFloat(String(producto.select)), 0);
  

  const titulos = carrito.map(producto => producto.title);
  const select = carrito.map(producto => producto.select);
  
    console.log(select);
  const carritoTitleString = titulos.join(','); 
  const carritoTitleSelect= select.join(','); 
  console.log(carritoTitleString);
  const mensaje = `Hola buen Dia quiero comprar\n
  ____________\n
  ${carritoTitleString}\n
  con el extra de ${carritoTitleSelect}\n
  Precio total: ${total}\n`;
  const whatsappLink = `https://api.whatsapp.com/send?phone=${formattedPhoneNumber}&text=${encodeURIComponent(
    mensaje
  )}`;
  return (
    <div className={syledCompone.navbar}>
      {carrito.length > 0 && (
        <h5>Cantidad de elementos comprados <span>{carrito.length}</span> </h5>
      )}
      {carrito.length > 0 && (
        <a
        
          href={whatsappLink}
          className={syledCompone.buttoncarrito}
          target="_blank"
          rel="noopener noreferrer"
        >
          Finalizar compra{" "}
        </a>
      )}
    </div>
  );
}

export default ComponetCarrito;
