import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { scrollingBottom } from '../functions';
import {withRouter} from 'react-router-dom'

const ic = {
	home: 'Главная',
	collection: 'Коллекция',
	formen: 'Мужская',
	forwomen: 'Женская',
	contacts: 'Контакты',
	about: 'О нас',

	host: '',
}

function GeneralTemplate(props) {
	const [show, setShow] = useState(false);


	return (
		<>
			<div className='container-fluid position-relative' style={{ overflowX: 'hidden' }}>
				<div className='row no-gutters justify-content-center align-items-center position-absolute'
					style={{
						padding: '1.0rem',
						textTransform: 'uppercase',
						fontSize: '1rem',
						fontWeight: '400',
						zIndex: 2,
						left: 0,
						right: 0,
						xbackground: 'rgba(0,0,0,.1)'

					}}>
					<div className='col-12 p-0'>
						<div className='row align-items-center'>
							<div style={{ minWidth: 275 }} className=' d-flex flex-column justify-content-center align-items-start'>
								<Link to={ic.host + '/'} className='mnavbar_logo pl-3' style={{
									textDecoration: 'none',
									outline: 'none',

								}}>
									<div className='text-center' style={{ fontFamily: 'Raleway-Black', fontSize: '1.8rem' }}>modern shoes</div>
									<div className='border-top w-100'></div>
									<div className='text-center' style={{ fontFamily: 'Raleway-Light', fontSize: '.9rem' }}>outlet shop</div>
								</Link>

							</div>

							<div style={{cursor: 'pointer'}} className='col-2 d-flex d-xl-none justify-content-end' onClick={()=>setShow(!show)}>
								<svg fill='#f58f37' xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z" /></svg>
							</div>

							<div className='d-xl-flex d-none col-8 pr-5  justify-content-end' style={{ fontFamily: 'Raleway-Light' }}>
								<ul className="nav mnavbar_links" >
									<li className="nav-item">
										<Link className="nav-link" to={ic.host + "/"}>{ic.home}</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link" to={ic.host + "/all-products"}>{ic.collection}</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link" to={ic.host + "/for_men"}>{ic.formen}</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link" to={ic.host + "/for_women"}>{ic.forwomen}</Link>
									</li>
									<li className="nav-item">
										<a className="nav-link" href="#" onClick={scrollingBottom}>{ic.contacts}</a>
									</li>

								</ul>
							</div>
							<div className='col-2 col-sm-3 col-md-5 col-lg-6 col-xl-1  d-flex justify-content-end p-0'>
								<Link className='d-flex-inline justify-content-end ' to={ic.host + '/basket'}>
									<svg fill='#f58f37' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19.029 13h2.971l-.266 1h-2.992l.287-1zm.863-3h2.812l.296-1h-2.821l-.287 1zm-.576 2h4.387l.297-1h-4.396l-.288 1zm-11.816 6c-.828 0-1.5.672-1.5 1.5 0 .829.672 1.5 1.5 1.5s1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm6.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm8-16.5l-.743 2h-1.929l-3.474 12h-11.239l-4.615-11h14.812l-2.541 9h2.102l3.432-12h4.195z" /></svg>
									<div className="ml-1 badge badge-pill text-white" style={{ fontSize: 'initial', background: '#f58f37' }}>{props.orderCards.length}</div>
								</Link>

							</div>
						</div>
					</div>
				</div>

				<div className={'nf-menu '+(show?' d-block':'d-none')} onClick={()=>setShow(false)}>
					<ul className="list-group list-group-flush">
						<li className="list-group-item" onClick={()=>props.history.push('/')}>главная</li>
						<li className="list-group-item" onClick={()=>props.history.push('/all-products')}>Коллекция</li>
						<li className="list-group-item" onClick={()=>props.history.push('/for_men')}>мужская</li>
						<li className="list-group-item" onClick={()=>props.history.push('/for_women')}>женская</li>
						<li className="list-group-item" onClick={()=>footerid.scrollIntoView()}>контакты</li>
					</ul>
				</div>

				{props.children}

				<div className='row pt-5 mt-5 justify-content-center bg-dark'>



					<div className='col-md-8 col-lg-5 col-xl-4 p-4 d-flex d-column justify-content-center align-items-center flex-column'>
						<Link to={ic.host + '/'} className='mnavbar_logo' style={{
							textDecoration: 'none',
							textTransform: 'uppercase',
							outline: 'none',

						}}>
							<div className='text-center' style={{ fontFamily: 'Raleway-Black', fontSize: '1.4rem' }}>modern shoes</div>
							<div className='border-top w-100'></div>
							<div className='text-center' style={{ fontFamily: 'Raleway-Light', fontSize: '.9rem' }}>outlet shop</div>
						</Link>
						<p className='mt-4 text-white' style={{ fontFamily: 'Raleway-Light', fontSize: '1.1rem' }}>
							Что отличает наш интернет магазин от любого другого в Харькове и даже в Украине? Ответ очень простой - у нас очень низкие цены за товар отменного качества. Кроме того, в ассортименте представлены варианты из натуральной кожи, замши и текстиля. Это обеспечивает моделям комфортабельность, прочность и гигиеничность. И в том редком случае, если вдруг товар не подошел, в течение 30 дней Вы с легкостью можите обменять его либо вернуть деньги. Однако такое случается достаточно редко и наши клиенты зачастую остаются довольны покупкой.
						</p>

					</div>

					<div id='footerid' className='col-md-8 col-lg-5 col-xl-4 offset-1 d-flex flex-column text-white p-4 pt-5 font-weight-bolder' style={{ fontSize: '1.1rem', marginTop: '-.5rem', fontFamily: 'Raleway-Light' }}>
						<div className='text-center pt-0 pb-2 ' style={{ fontSize: '1.6rem', color: 'rgb(232, 155, 11) !important' }}>Свяжитесь с нами</div>
						<div className='py-1'>
							<svg fill="white" width='20' height='20' viewBox="0 0 46.412 46.412" ><path d="M39.652,16.446C39.652,7.363,32.289,0,23.206,0C14.124,0,6.761,7.363,6.761,16.446c0,1.775,0.285,3.484,0.806,5.086h0 c0,0,1.384,6.212,15.536,24.742c8.103-10.611,12.018-17.178,13.885-20.857C38.67,22.836,39.652,19.756,39.652,16.446z M23.024,27.044c-5.752,0-10.416-4.663-10.416-10.416c0-5.752,4.664-10.415,10.416-10.415s10.416,4.663,10.416,10.415 C33.439,22.381,28.776,27.044,23.024,27.044z" /><path d="M23.206,46.412c-0.036-0.047-0.07-0.092-0.105-0.139c-0.036,0.047-0.07,0.091-0.106,0.139H23.206z" /></svg>
							<span className=' pl-3'>Адрес: г.Харьков, ул.Сумская, д.81</span>
						</div>
						<div className='py-1'>
							<svg fill='white' width="20" height="20" viewBox="0 0 485.211 485.211"><g><path d="M485.211,363.906c0,10.637-2.992,20.498-7.785,29.174L324.225,221.67l151.54-132.584 c5.895,9.355,9.446,20.344,9.446,32.219V363.906z M242.606,252.793l210.863-184.5c-8.653-4.737-18.397-7.642-28.908-7.642H60.651 c-10.524,0-20.271,2.905-28.889,7.642L242.606,252.793z M301.393,241.631l-48.809,42.734c-2.855,2.487-6.41,3.729-9.978,3.729 c-3.57,0-7.125-1.242-9.98-3.729l-48.82-42.736L28.667,415.23c9.299,5.834,20.197,9.329,31.983,9.329h363.911	c11.784,0,22.687-3.495,31.983-9.329L301.393,241.631z M9.448,89.085C3.554,98.44,0,109.429,0,121.305v242.602 c0,10.637,2.978,20.498,7.789,29.174l153.183-171.44L9.448,89.085z" /></g></svg>
							<span className=' pl-3'>email: nppostcell@gmail.com</span></div>
						<div className='d-flex mt-5'>
							<div className='align-self-center pr-3'>
								<svg fill='white' width='20' height='20' viewBox="0 0 578.106 578.106"><g><path d="M577.83,456.128c1.225,9.385-1.635,17.545-8.568,24.48l-81.396,80.781 c-3.672,4.08-8.465,7.551-14.381,10.404c-5.916,2.857-11.729,4.693-17.439,5.508c-0.408,0-1.635,0.105-3.676,0.309 c-2.037,0.203-4.689,0.307-7.953,0.307c-7.754,0-20.301-1.326-37.641-3.979s-38.555-9.182-63.645-19.584 c-25.096-10.404-53.553-26.012-85.376-46.818c-31.823-20.805-65.688-49.367-101.592-85.68 c-28.56-28.152-52.224-55.08-70.992-80.783c-18.768-25.705-33.864-49.471-45.288-71.299 c-11.425-21.828-19.993-41.616-25.705-59.364S4.59,177.362,2.55,164.51s-2.856-22.95-2.448-30.294 c0.408-7.344,0.612-11.424,0.612-12.24c0.816-5.712,2.652-11.526,5.508-17.442s6.324-10.71,10.404-14.382L98.022,8.756 c5.712-5.712,12.24-8.568,19.584-8.568c5.304,0,9.996,1.53,14.076,4.59s7.548,6.834,10.404,11.322l65.484,124.236 c3.672,6.528,4.692,13.668,3.06,21.42c-1.632,7.752-5.1,14.28-10.404,19.584l-29.988,29.988c-0.816,0.816-1.53,2.142-2.142,3.978 s-0.918,3.366-0.918,4.59c1.632,8.568,5.304,18.36,11.016,29.376c4.896,9.792,12.444,21.726,22.644,35.802 s24.684,30.293,43.452,48.653c18.36,18.77,34.68,33.354,48.96,43.76c14.277,10.4,26.215,18.053,35.803,22.949 c9.588,4.896,16.932,7.854,22.031,8.871l7.648,1.531c0.816,0,2.145-0.307,3.979-0.918c1.836-0.613,3.162-1.326,3.979-2.143 l34.883-35.496c7.348-6.527,15.912-9.791,25.705-9.791c6.938,0,12.443,1.223,16.523,3.672h0.611l118.115,69.768 C571.098,441.238,576.197,447.968,577.83,456.128z" /></g></svg>
							</div>
							<div className='' style={{ fontSize: '1.5rem' }}>
								<div className='p-1'>+38(050)112-23-34</div>
								<div className='p-1'>+38(068)112-23-34</div>
								<div className='p-1'>+38(093)112-23-34</div>
							</div>
						</div>
					</div>
					<div className='p-5 col-12 text-center text-white text-uppercase' style={{ fontFamily: 'Raleway-Black', fontSize: '1.0rem' }}>
						Created by Nick Fedotov 2020
					</div>
				</div>


			</div>



		</>
	)
}


const mapProp = (state) => {
	return {
		orderCards: state.orderCards,
		currentPageName: state.currentPageName,
	}
}

export default withRouter(connect(mapProp, null)(GeneralTemplate));