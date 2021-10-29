import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './css/Footer.css'

class Footer extends Component {
    render(){
        return(
            <Container fluid className='footer'>
                <Row className='footerSection'>
                    <Col lg={3}>
                        <Row>
                            <img src="https://www.joaopessoa.pb.gov.br/wp-content/themes/joaopessoavinte/assets/images/logo-pmjp-white-horizontal.png" alt="logo"/>
                            <a target="blank" href="http://maps.google.com/maps?q=%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20Rua%20Di%C3%B3genes%20Chianca%2C%201777%20%20%C3%81gua%20Fria%2C%20Jo%C3%A3o%20Pessoa-PB%20%20CEP%3A%2058053-900%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20">Rua Diógenes Chianca, 1777 Água Fria, João Pessoa-PB CEP: 58053-900 </a>
                        </Row>
                    </Col>
                    <Col lg={3}>
                            <div class="contact">
                                <h3><a class="text-light" href="tel:+558332189275">(83) 3218-9275</a></h3>
                                <p>SEDEC</p>
                            </div>
                            <div class="contact">
                                <h3 ><a class="text-light" href="tel:+558332189000">(83) 3218-9000</a></h3>
                                <p>Central Telefônica</p>
                            </div>
                    </Col>
                    <Col lg={3}></Col>
                    <Col lg={3}>
                        <Row>
                            <img src="https://www.joaopessoa.pb.gov.br/google/assets/img/sedec.png" alt=""/>
                        </Row>
                    </Col>
                </Row>
                <Row className='dedicatory'>
                    <p>Feito com <i class="las la-heart"></i> por servidores públicos</p>
                </Row>
            </Container>
        )
    }
}
export default Footer;
