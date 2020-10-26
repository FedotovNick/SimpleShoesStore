import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Modal, Toast } from 'react-bootstrap';
import { connect } from 'react-redux';
import nec from '../commands/init'
import NameSurnamePhoneForm from './NameSurnamePhoneForm'
import innerContext from '../innerContext'
import { scrollingTop } from '../functions';


function Basket(props) {
    useEffect(() => {
        scrollingTop();
    }, []);

    let sum = 0;
    const al = props.orderCards.length;

    const [show, setShow] = useState(false);
    const [showC, setShowC] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const cards = props.orderCards.map((v, i) => {
        sum += v.card.price;

        return (
            <OrderCard key={'order_card_' + i} title={v.card.title} price={v.card.price} size={v.size} src={innerContext.host + v.card.links[0]} ind={i} />
        )
    })

    const fun = (obj) => {
        let card_ids = [];
        let sizes = [];

        if (props.orderCards.length == 0) return;

        props.orderCards.forEach((v, i) => {
            card_ids.push(v.card.id);
            sizes.push(v.size);
        })

        nec.execute('DO_ORDER', { name: obj.name, surname: obj.surname, phone: obj.mobilenum, card_ids, sizes })
            .then(r => {
                nec.execute('CLEAR_ORDER_CARDS');
                setShowC(true);
            })
    }

    return (
        <div className='row justify-content-center'>
            <div className='col-lg-12 col-xl-10'>
                <div className='row justify-content-center align-items-start align-content-start'  style={{ minHeight: 600 }}>
                    <div className='col-12 col-sm-10 col-md-8 d-flex justify-content-center align-items-start pt-3 flex '>


                        
                        
                        <div style={{fontSize: '1.4rem'}} className='align-self-center ml-auto text-uppercase font-weight-bolder my-4'>Всего: {sum}UAH</div>
                    </div>
                    
                    <div className={'col-8 justify-content-center align-items-center ' + (al ? 'd-none' : 'd-flex')} style={{ minHeight: 600 }} >
                        <h2 className='text-danger'>На данный момент корзина пуста</h2>
                    </div>

                    <div className='col-12 col-md-9 col-xl-8'>
                        {cards}
                    </div>
                    

                    <div className='w-100' style={{marginTop: 200 }} />
                    <div id='send_form' style={{ fontFamily: 'Raleway-Medium', fontSize: '1.5rem'}} className='col-12 col-md-8 pt-5'>
                        <div className='text-center'>Пожалуйста для оформления заказа заполните форму. В течение нескольких минут с Вами
                        свяжется наш менеджер для подтверждения информации.
                        </div>
                        <NameSurnamePhoneForm handleResult={fun} className='my-5 shadow' />
                    </div>

                    <Modal centered show={show} onHide={handleClose}>

                        <Modal.Body className='d-flex justify-content-center'>Вы уверены, что хотите очистить корзину?</Modal.Body>
                        <Modal.Footer className='d-flex justify-content-center'>
                            <Button variant="secondary" onClick={handleClose}>
                                Назад
                            </Button>
                            <Button variant="primary" onClick={() => { nec.execute('CLEAR_ORDER_CARDS'); handleClose(); }}>
                                Да, очистить
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal centered show={showC} onHide={() => setShowC(false)}>

                        <Modal.Body className='d-flex justify-content-center'>Заказ успешно отпавлен, через несколько минут с Вами свяжеться наш менеджер</Modal.Body>
                        <Modal.Footer className='d-flex justify-content-center'>

                            <Button variant="primary" onClick={() => props.history.push('/all-products')}>
                                OK
                            </Button>
                        </Modal.Footer>
                    </Modal>

                </div>
            </div>


        </div>
    )
}

const OrderCard = (props) => {

    const delOrderCard = (e) => {
        let i = e.currentTarget.parentElement.dataset.ind - 0;
        nec.execute('DEL_ORDER_CARD', i);
    }

    return (
        <Toast  className='m-order-card' show={true} onClose={(e) => { delOrderCard(e) }} style={{ maxWidth: '100%' }}>
            <Toast.Header className='align-items-stretch' data-ind={props.ind}>
                <div className='d-none d-sm-block' style={{ width: '100px', height: '133px', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
                    <img
                        src={props.src}
                        style={{ height: '100%', position: 'absolute', left: 0, top: 0 }}
                    />
                </div>

                <div style={{fontSize: '1.3rem'}} className="mr-auto mx-3 d-flex flex-column">
                    <div className='h-100'>{props.title}</div>
                    <div className=''>size: {props.size}</div>
                </div>
                <div style={{fontSize: '1.4rem'}} className='ml-1 mr-3 align-self-center'>{props.price}UAH</div>
            </Toast.Header>
        </Toast>
    )
}


const mapProp = (state) => {
    return {
        orderCards: state.orderCards,
    }
}

export default connect(mapProp, null)(Basket);