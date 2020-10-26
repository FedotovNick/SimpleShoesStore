import React from 'react';
import { withRouter } from 'react-router-dom';
import nec from '../commands/init'

function ProductCard(props) {

    function cardChooseHandler(index) {

        nec.execute('CHOOSE_CARD_INDEX', index + 'sim');
        props.history.push('/product-details');
    }

    function hdl(e) {
        let index = e.currentTarget.dataset.cardid - 0;
        if (props.handler) props.handler(index);
        else cardChooseHandler(index);
    }

    return (
        
            <div onClick={hdl} data-cardid={props.cardId} className={'nf-hover-action1 card rounded-0 border-0'+props.className } style={{ cursor: 'pointer' }}>
                <div className='m-card-img-container' >
                    <img src={props.src} />
                </div>
                <div className='card-body d-flex flex-column align-items-start p-1 pl-2 mt-2' >
                    <div className='card-title  w-100 text-weight-bolder text-truncate' style={{ overflow: 'hidden', fontSize: '1.3rem' }}>{props.title}</div>
                    <div className='card-text rounded-0 align-self-end  p-2 rounded text-monospace h5' style={{ color: 'white', background: '#d5c183' }}>
                        {props.price} UAH
    				</div>

                </div>
            </div>
       
    )
}




export default withRouter(ProductCard);