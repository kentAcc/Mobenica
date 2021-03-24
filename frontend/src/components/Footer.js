import React from "react"
import { Container, Row, Col, Image} from "react-bootstrap"
const Footer = () => {
  return (
    
    <footer>

    <div className="contenu-footer">

        <div className="bloc footer-services">
            <h3>mobenica</h3>
            <ul className="liste-services">
                <li><a href="#">Quienes somos</a></li>
                <li><a href="#">Garantias</a></li>
                <li><a href="#">Tiempos de entrega</a></li>
                <li><a href="#">Formas de pago</a></li>
            </ul>
        </div>

        <div className="bloc footer-contact">
            <h3>Contacto</h3>
            <p>55 5368 0620</p>
            <p>webmastermobenica@gmail.com</p>
            <p>Av. 100 Metros 35, Gustavo A. Madero, Magdalena de las Salinas, 07760 Ciudad de México, CDMX</p>
        </div>

        <div className="bloc footer-horaires">
            <h3>Horarios</h3>
            <ul className="liste-horaires">
                <li> Lun  10 a 20 hrs</li>
                <li> Mar  10 a 20 hrs</li>
                <li> Mie  10 a 20 hrs</li>
                <li> Jue  10 a 20 hrs</li>
                <li> Vie  10 a 20 hrs</li>
                <li> Sab  10 a 18 hrs</li>
                <li> Dom  10 a 18 hrs</li>
            </ul>
        </div>

        <div className="bloc footer-medias">
            <h3>Nuestras redes</h3>
            <ul className="liste-media">
                <li><a href="#">
                <Image src="assets/bxl-facebook.svg" alt="icones réseaux sociaux"></Image>
                  Facebook</a></li>
                
                 
            </ul>
        </div>

    </div>

</footer>
  )
}

export default Footer
