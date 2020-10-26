import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap'
import OrderCard from './OrderCard'
import { connect } from 'react-redux';
import nec from '../commands/init'
import { bindActionCreators } from 'redux';


let ind;

function AllOrderCards(props) {
    const orders = props.ordersPage.orders || [];
    const [successShow, setSuccessShow] = useState(false);

    useEffect(() => {
        document.querySelector('#wcont').scrollTo(0, 0);
        props.changeActivePage('Orders');

    }, []);

    const orderCards = orders.map((v, i) => {
        return (
            <OrderCard deleteFun={delFun} orderPos={i} className='mb-3' orderId={v.id} key={'order-card-key-' + i} name={v.name} surname={v.surname} phone={v.phone} cards={v.cards} />
        )
    })

    function delFun(index) {
        ind = index;
        setSuccessShow(true);
    }

    function delFun2() {
        nec.execute('DELETE_ORDER', { orderId: orders[ind].id });
        setSuccessShow(false);
    }

    return (
        <div className='col-12 col-md-10 col-xl-7 ' style={{ minWidth: 400 }}>
            {orderCards}

            <Modal show={successShow} onHide={() => setSuccessShow(false)}>
                <h5 className='modal-body text-center'>
                    Вы уверены, что хотите удалить заказ?
                   </h5>
                <div className='modal-footer justify-content-center'>
                    <button className="btn btn-sm btn-info px-4" onClick={() => setSuccessShow(false)}>Назад</button>
                    <button className='btn btn-sm btn-warning px-4' onClick={delFun2}>Удалить</button>
                </div>
            </Modal>
        </div>
    )
}


function localAC1(pageName) {
    return {
        type: 'SET_ACTIVE_PAGE',
        activePage: pageName,
    }
}

function mapDispatch(d) {
    return {
        changeActivePage: bindActionCreators(localAC1, d),
    }
}


const mapProps = (state) => {
    return {
        ordersPage: state.ordersPage,
    }
}

export default connect(mapProps, mapDispatch)(AllOrderCards);