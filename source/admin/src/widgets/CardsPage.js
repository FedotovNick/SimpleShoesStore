import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap'
import ACard from './ACard'
import { connect } from 'react-redux';
import nec from '../commands/init'
import { bindActionCreators } from 'redux';
import innerContext from '../innerContext'

let tempCardId;


function CardsPage(props) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        document.querySelector('#wcont').scrollTo(0, 0);
        props.changeActivePage('AllProducts')
        nec.execute('READ_CARDS', { size: innerContext.pageSize, page: 0 });
    }, [])

    const allCards = props.cards.cardList.map((v, i) => {
        return (
            <div key={'key' + i} className='col-12 col-md-6 col-xl-4 p-2'  ><ACard delFun={delFun} cardId={v.id} title={v.title} price={v.price} src={innerContext.host + v.links[0]} /></div>
        )
    });

    function paginFun(e) {
        document.querySelector('#wcont').scrollTo(0, 0);
        let nextPage = e.target.parentElement.dataset.lid;
        nec.execute('READ_CARDS', { size: innerContext.pageSize, page: nextPage });
    }

    function delFun(cardId) {
        tempCardId = cardId;
        setShow(true);

    }

    function delFun2() {
        setShow(false);
        nec.execute('DELETE_CARD', { cardId: tempCardId })
            .then(r => {
                nec.execute('READ_CARDS', { size: innerContext.pageSize, page: 0 });
            });
    }

    function lis() {
        if(props.cards.cardList.length == 0) return null;
        let limas = [];

        limas.push(
            <li key='lidprev' onClick={props.cards.pageNumber == 0 ? null : paginFun} className={'page-item' + (props.cards.pageNumber == 0 ? ' disabled' : '')} data-lid={props.cards.pageNumber - 1 < 0 ? 0 : props.cards.pageNumber - 1}><div className='page-link' style={{ cursor: 'pointer', userSelect: 'none' }}>Previous</div></li>
        )

        for (let i = 0; i < props.cards.totalPages; i++) {
            limas.push(
                <li key={'lid' + i} data-lid={i} className={'page-item' + (i == props.cards.pageNumber ? ' active' : '')} onClick={paginFun}><div className='page-link' style={{ cursor: 'pointer', userSelect: 'none' }}>{i + 1}</div></li>
            )
        }

        limas.push(
            <li key='lidnext' onClick={props.cards.pageNumber + 1 == props.cards.totalPages ? null : paginFun} className={'page-item' + (props.cards.pageNumber + 1 == props.cards.totalPages ? ' disabled' : '')} data-lid={props.cards.pageNumber + 1 > props.cards.totalPages ? props.cards.totalPages : props.cards.pageNumber + 1}><div className='page-link' style={{ cursor: 'pointer', userSelect: 'none' }}>Next</div></li>
        )
        return limas;
    }

    return (
        <div className='col-12 ' style={{ minWidth: 400 }}>
            <div className='row p-2'>

                <ul className="col-12 p-0 pagination justify-content-center mb-5">
                    {lis()}
                </ul>
                <div className='col-12'>
                    <div className='row'>
                        {allCards}
                    </div>
                </div>


                <ul className="col-12 p-0 pagination justify-content-center mt-5">
                    {lis()}
                </ul>
            </div>

            <Modal show={show} onHide={() => setShow(false)}>
                <h5 className='modal-body text-center'>
                    Вы действительно хотите удалить этот товар из сервера?
                   </h5>
                <div className='modal-footer justify-content-center'>
                    <button className="btn btn-secondary btn-sm px-4 mr-3" onClick={() => setShow(false)}>Назад</button>
                    <button className="btn btn-warning btn-sm px-4" onClick={delFun2}>Да, удалить</button>
                </div>
            </Modal>
        </div>
    )
}


function mapStateToProps(state) {
    return {
        cards: state.cards,
    }
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


export default connect(mapStateToProps, mapDispatch)(CardsPage);