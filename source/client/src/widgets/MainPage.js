import React, { useEffect } from 'react';
import { Carousel } from 'react-bootstrap'
import SpinWidget from './SpinWidget';
import { connect } from 'react-redux'
import innerContext from '../innerContext'
import { scrollingTop } from '../functions';



function MainPage(props) {


	useEffect(() => {
		fpan.classList.remove('d-block');
		fpan.classList.add('d-none');
		scrollingTop();
	}, []);

	useEffect(() => {
		return () => {
			fpan.classList.remove('d-none');
			fpan.classList.add('d-block');
		}

	}, []);
	
	

	const carouselItems = props.carouselImgs.map((v, i) => {
		return (
			<Carousel.Item key={'carousel_key_' + i}>
				<img
					className="d-block"
					src={innerContext.host + v}

				/>
				{carouselsText[i%carouselsText.length]}
			</Carousel.Item>
		)
	});

	let srcIm1;
	if(props.carouselImgs.length == 0) srcIm1 = '';
	else srcIm1 = props.carouselImgs[0];

	return (

		<>
			<div className='row'>
				<div className='col-12 d-none d-lg-block p-0 mcarousel'>
					<Carousel interval={innerContext.carouselInterval}>
						{carouselItems}

					</Carousel>
				</div>
				<div className='col-12 d-lg-none bg-dark mcarousel-f' >
					<img src={innerContext.host+srcIm1}/>
				</div>
			</div>

			<div className='row justify-content-center position-relative' style={{ marginTop: 150 }}>

				<div className='col-10 col-sm-8 col-md-6 col-lg-5 col-xl-4 ' style={{ height: 400, zIndex: 20 }}>
					<div className='p-2 h-100' style={{ position: 'relative', overflow: 'hidden' }}>
						<img src={innerContext.host + '/img/mainpage/top.jpg'} style={{ width: '100%', bottom: 0, left: 0, position: 'absolute' }} />
					</div>
				</div>

				<div style={{ zIndex: 2 }} className='col-10 col-sm-8 col-md-6 col-lg-5 col-xl-4 p-2 d-flex flex-column justify-content-center align-items-center'>
					<div id='id1' className='position-relative m-right-fade m-appear' style={{ textAlign: 'center', fontFamily: 'Raleway-Light', }}>
						<p style={{ fontSize: '2.2rem' }}>Ваш комфорт - наша задача</p>
						<p style={{ fontSize: '1.7rem', lineHeight: '1' }}>Только самые новые модели от наших дизайнеров специально для Вас!</p>
					</div>

				</div>

			</div>

			<div className='row justify-content-center' style={{ marginTop: 150 }}>
				<div className='col-10 col-sm-8 col-md-6 col-lg-5 col-xl-4 p-4 d-flex flex-column justify-content-center align-items-center'>
					<div id='id2' className='m-left-fade m-appear position-relative' >
						<p style={{ fontFamily: 'Raleway-Light', fontSize: '2.2rem', lineHeight: 1, textAlign: 'center' }}>У нас Вы найдете самый широкий ассортимент модной и спортивной обуви.</p>
						<p style={{ textAlign: 'center', fontFamily: 'Raleway-Light', fontSize: '1.7rem', lineHeight: '1' }}>Если нужна надежная обувь, которая не подведет в трудную минуту, тогда Вы на правильном пути!</p>
					</div>
				</div>
				<div className='col-10 col-sm-8 col-md-6 col-lg-5 col-xl-4  '>
					<SpinWidget handler={()=>{props.history.push('/for_women')}} src={innerContext.host + '/img/mainpage/women.jpg'} frontText='женская коллекция' />
				</div>
			</div>

			<div className='row justify-content-center' style={{ marginTop: 150 }}>
				<div className='col-10 col-sm-8 col-md-6 col-lg-5 col-xl-4 '>
					<SpinWidget handler={()=>{props.history.push('/for_men')}} src={innerContext.host + '/img/mainpage/men.jpg'} frontText='мужская коллекция' />
				</div>
				<div className=' col-10 col-sm-8 col-md-6 col-lg-5 col-xl-4 p-4 d-flex flex-column justify-content-center align-items-center '>
					<div id='id3' className='position-relative m-right-fade m-appear'>
						<p style={{ fontFamily: 'Raleway-Light', fontSize: '2.2rem', lineHeight: 1, textAlign: 'center' }} >Не представляете жизни без спорта? - Наши новинки приятно удивят Вас.</p>
						<p style={{ textAlign: 'center', fontFamily: 'Raleway-Light', fontSize: '1.7rem', lineHeight: '1' }}>Новая технология изготовления подошвы облегчает даже самые тяжелые нагрузки</p>
					</div>
				</div>
			</div>

			<div id='id4' className='row justify-content-center' style={{ marginTop: 150 }}>
				<div className='col-12 my-4 text-center ' style={{ fontFamily: 'Raleway-Medium', color: ' rgb(232, 155, 11)', fontSize: '2.2rem', lineHeight: 1 }} >
					Почему выбирают именно нас?
					</div>
				<div className='col-md-7 col-lg-4 p-xl-5 p-lg-3 pb-5 text-center d-flex flex-column justify-content-between'>
					<div id='id5' className='m-left-fade m-appear shadow card p-4 h-100 justify-content-between'>
						<h3 style={{ fontFamily: 'Raleway-Medium', color: ' rgb(232, 155, 11)', fontSize: '1.5rem', lineHeight: 1, textTransform: 'uppercase' }}>уникальное качество</h3>
						<p style={{ marginTop: 30, textAlign: 'center', fontFamily: 'Raleway-Light', fontSize: '1.3rem', lineHeight: '1' }}>Мы тщательно следим за качеством нашей продукции и отвечаем за него перед каждым клиентом. Перед тем как попасть к Вам наша обувь проходит несколько стадий проверки, потому что мы ценим Вас и Ваше время!</p>
					</div>

				</div>
				<div className='col-md-7 col-lg-4 p-xl-5 p-lg-3 pb-5 text-center d-flex flex-column justify-content-between'>
					<div className='shadow card p-4 h-100 justify-content-between'>
						<h3 style={{ fontFamily: 'Raleway-Medium', color: ' rgb(232, 155, 11)', fontSize: '1.5rem', lineHeight: 1, textTransform: 'uppercase' }}>индивидуальный подход к каждому клиенту</h3>
						<p style={{ textAlign: 'center', fontFamily: 'Raleway-Light', fontSize: '1.3rem', lineHeight: '1' }}>Наши менеджеры умеют подбирать именно тот размер, что Вам нужен. Мы ценим Ваше доверие и стараемся угодить на все 100%, так что Вы в любом случае останитесь довольны.</p>
					</div>

				</div>
				<div className='col-md-7 col-lg-4 p-xl-5 p-lg-3 pb-5 text-center d-flex flex-column justify-content-between'>
					<div id='id6' className='m-right-fade m-appear shadow card p-4 h-100 justify-content-between'>
						<h3 style={{ fontFamily: 'Raleway-Medium', color: ' rgb(232, 155, 11)', fontSize: '1.5rem', lineHeight: 1, textTransform: 'uppercase' }}>лучшая цена</h3>
						<p style={{ textAlign: 'center', fontFamily: 'Raleway-Light', fontSize: '1.3rem', lineHeight: '1' }}>Наши клиенты также выбирают нас из-за низкой цены при высоком качестве нашей продукции, которая сделана исключительно из качественных материалов. Вы обязательно вернетесь, чтобы купить еще!</p>
					</div>

				</div>

			</div>

		</>
	)
}


const mapProps = (state) => {
	return {
		carouselImgs: state.carouselImgs,
		newProducts: state.newProducts,
	}
}

export default connect(mapProps, null)(MainPage);

const carouselsText = [
	(
		<div className='carousel-caption d-none d-xl-block'>
			<div>Легкость</div>
			<div>во всем</div>
			<div>победа в каждом</div>
			<div>движении</div>
		</div>
	),
	(
		<div className='carousel-caption d-none d-xl-block'>
			<div>иди</div>
			<div>с нами</div>
			<div>иди только</div>
			<div>вперед</div>
		</div>
	),
	(
		<div className='carousel-caption d-none d-xl-block'>
			<div>ты достоин</div>
			<div>лучшего</div>
			<div>правила не для</div>
			<div>тебя</div>
		</div>
	)

];