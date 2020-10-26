import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup, Row, Col, Modal } from 'react-bootstrap';
import ImgsDetails from './ImgsDetails';
import { connect } from 'react-redux';
import nec from '../commands/init'
import innerContext from '../innerContext'
import { scrollingTop } from '../functions';



function ProductDetails(props) {
	if (!props.chosenCardIndex) {
		props.history.push('/all-products');
		return null;
	}

	useEffect(() => {
		scrollingTop();
	}, []);



	const [show, setShow] = useState(false);

	const handleClose = () => {
		setShow(false);
	}



	const trig = props.chosenCardIndex.endsWith('trig')

	const card = trig ? props.newProducts[parseInt(props.chosenCardIndex)] : props.allCardsPage.cardList[parseInt(props.chosenCardIndex)];

	const sizeInds = [];

	for (let i = card.sizefrom; i < card.sizeto + 1; i++) {
		sizeInds.push(i);
	}
	let chSize = sizeInds[0];


	const sizeItems = sizeInds.map((v, i) => {
		return (
			<option key={'size-item-key-' + i} data-item={v} onClick={(e) => chSize = parseInt(e.target.dataset.item)} className=" m-size-item">{v}</option>
		)
	})

	const handledLinks = card.links.map((v, i) => {
		return innerContext.host + v;
	});

	const addToStoreHandler = (e) => {
		let order = { card, size: chSize };
		nec.execute('ORDER_CARDS', order);
		setShow(true);
	}

	return (
		<div className='row justify-content-center'>


			<div className='col-md-11 col-xl-8 my-5' >
				<div className='row justify-content-center'>

					<div className='col-12 col-sm-10 col-md-7 '>
						<ImgsDetails links={handledLinks} />
					</div>

					<div className="col-12 col-md-5 px-5 d-flex mt-2 mt-sm-0 flex-column align-items-center justify-content-between" style={{ xborder: '1px solid gray' }}>
						<div style={{ fontSize: '1.7rem' }} className='d-flex flex-column justify-content-center align-items-center'>
							<div className='text-center p-3 pb-0'  >
								{card.title}
							</div>
							<div  className='align-self-end'>
								{card.price}<span>UAH</span>
							</div>
						</div>


						<label style={{ fontFamily: 'Raleway-Medium', fontSize: '1.2rem' }} className='d-flex align-items-center  align-self-start'>
							<span style={{ paddingRight: '1rem' }}>Размер</span>
							<select className="form-control" id="exampleFormControlSelect1">
								{sizeItems}
							</select>
						</label>



						<div className='mt-5 d-flex justify-content-between w-100' style={{ fontFamily: 'Raleway-Medium', fontSize: '1.5rem' }}>

							<button className='btn btn-warning px-5 rounded-0 align-self-left' style={{fontSize: '1.5rem'}} onClick={addToStoreHandler}>Купить</button>

						</div>
					</div>




					<div  className='col-11 d-flex p-0 flex-column mt-5' style={{fontSize: '1.3rem'}}>
						<div style={{ borderBottom: '1px solid gray', padding: 7, paddingLeft: 0, fontWeight: 'bold', color: '#595959', textTransform: 'uppercase', textIndent: 15, }}>Описание модели</div>
						<div className='mt-2'>{card.description}</div>
					</div>

					<Modal show={show} >
						<Modal.Header >
							<Modal.Title className='text-center'>Ваша покупка успешно добавлена в корзину</Modal.Title>
						</Modal.Header>
						<Modal.Body>Чтобы оформить заказ перейдите в корзину, или можете продолжить выбор.</Modal.Body>
						<Modal.Footer className='d-flex justify-content-around'>
							<Button variant="secondary" onClick={() => props.history.push('/all-products')}>
								Вернуться к выбору
          					</Button>
							<Button variant="danger" onClick={() => props.history.push('/basket')}>
								Перейти в корзину
          					</Button>
						</Modal.Footer>
					</Modal>
				</div>
			</div>
		</div>
	)
}

function mapProps(state) {
	return {
		chosenCardIndex: state.chosenCardIndex,
		allCardsPage: state.allCardsPage,
		newProducts: state.newProducts,
	}
}




export default connect(mapProps, null)(ProductDetails);

