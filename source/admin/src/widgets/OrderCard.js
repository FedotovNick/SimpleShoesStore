import React, { useState } from 'react';
import innerContext from '../innerContext'

export default function OrderCard(props) {

    const name = props.name||'no name';
    const surname = props.surname||'no surname';
    const phone = props.phone||'+380991111111';
    const orderId = props.orderId;

    const cards = props.cards||[];
    
    let sum = 0;

    const listItems = cards.map((v,i)=>{
        sum += parseInt(v.price);
        return (
            <OrderRow key={'list-item-'+i} title={v.title} size={v.size} price={v.price} />
        )
    })

    const [show, setShow] = useState(false);

    return (

        <div className={'card rounded-0 shadow '+props.className}>
            <div className='py-1 px-2 card-header bg-gray-100 d-flex justify-content-between align-items-center p-0'>
                <span className='m-0 text-monospace '>{orderId}</span>
                <button className='ml-2 mb-1 close' onClick={()=>props.deleteFun(props.orderPos)}>
                    <small className='mr-2' style={{ fontSize: '.8rem', verticalAlign: 'middle' }}>удалить</small>
                    <span>×</span>
                </button>
            </div>
            <div className='card-body position-relative'>

                <div className='d-flex'>
                    <div style={{ width: '7rem' }}>{innerContext.oc_name}</div>
                    <div className='text-truncate'>{name}</div>
                </div>
                <div className='d-flex'>
                    <div style={{ width: '7rem' }}>{innerContext.oc_surname}</div>
                    <div className='text-truncate'
                    >{surname}</div>
                </div>
                <div className='d-flex'>
                    <div style={{ width: '7rem' }}>{innerContext.oc_phone}</div>
                    <div>{phone}</div>
                </div>

                <div style={{ textDecoration: 'underline', position: 'absolute', right: 20, top: 10 }}>
                    сумма: {sum}$
								</div>
            </div>

            <ul className={"list-group list-group-flush collapse" + (show ? ' show' : '')}>

                {listItems}
               
            </ul>

            <div className='card-footer bg-gray-100 border-top d-flex py-1 px-2'>
                <div onClick={() => setShow(!show)} className={'ml-auto m-arrow' + (show ? ' m-arrow-rotated' : '')}>
                    <small className='mr-2'>{show ? 'свернуть' : 'развернуть'}</small>
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24"><path d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z" /></svg>
                </div>
            </div>
        </div>
    )
}


const OrderRow = (props) => {
    const size = 42;
    const price = 100;

    return (

        <li className="list-group-item d-flex m-list" >
            <div className="mr-3 " style={{ opacity: '.5' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22 6v16h-16v-16h16zm2-2h-20v20h20v-20zm-24-4v20h2v-18h18v-2h-20zm14.007 11.225c-3.154 0-5.007 2.597-5.007 2.597s2.015 2.953 5.007 2.953c3.222 0 4.993-2.953 4.993-2.953s-1.788-2.597-4.993-2.597zm.042 4.717c-1.072 0-1.941-.87-1.941-1.942s.869-1.942 1.941-1.942 1.941.87 1.941 1.942-.869 1.942-1.941 1.942zm1.092-1.942c0 .604-.488 1.093-1.092 1.093s-1.092-.489-1.092-1.093l.02-.211c.537.196 1.065-.321.875-.863l.197-.019c.603 0 1.092.489 1.092 1.093z" /></svg>
            </div>
            <div className="font-italic text-truncate font-weight-bolder" style={{ width: '50%' }}>
                {props.title||'title'}
			</div>
            <div className="text-monospace mr-4" >
                Size: <span className='font-weight-bolder'>{props.size||size}</span>
            </div>
            <div className="text-monospace font-weight-bolder ml-auto" >
                {props.price||price}$
			</div>
        </li>
    )
}