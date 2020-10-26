import React, { useState, useEffect } from 'react';
import nec from '../commands/init';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import innerContext from '../innerContext'


let ordersInterval;

function AdminMT(props) {

	useEffect(() => {
		ordersInterval = setInterval(() => {
			console.log('*** reading orders ***');
			nec.execute('READ_ORDERS');
		}, 60 * 1000)
	}, []);

	useEffect(() => {
		return () => clearInterval(ordersInterval);

	}, []);

	function readCards() {
		nec.execute('READ_CARDS', { size: 6, page: 0 });
	}

	const [expanded, setExpanded] = useState(true);

	return (
		<div className='container-fluid'>

			<div className='row'>
				<div className={'col vh-100 p-0 bg-dark m-lp-cont' + (expanded ? '' : ' m-lp-cont-shrink')} style={{ overflow: 'hidden', flex: '0 0 auto' }}>

					<ul className="m-left-panel list-group text-white rounded-0" style={{ width: 200, marginTop: '50px' }}>

						<li className={'list-group-item' + (props.activePage == 'AddProduct' ? ' m-lp-active' : '')} onClick={() => props.history.push('/admin/create')}>
							<svg viewBox='0 0 24 24' xmlns="http://www.w3.org/2000/svg"><path d="M7 2c1.695 1.942 2.371 3 4 3h13v17h-24v-20h7zm4 5c-2.339 0-3.537-1.388-4.917-3h-4.083v16h20v-13h-11zm2 6h3v2h-3v3h-2v-3h-3v-2h3v-3h2v3z" /></svg>
							<span>{innerContext.leftPanelAddBut}</span>
						</li>
						<li className={'list-group-item' + (props.activePage == 'AllProducts' ? ' m-lp-active' : '')} onClick={() => props.history.push('/admin/all-cards')}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 3h-12v-2h12v2zm0 3h-12v2h12v-2zm0 5h-12v2h12v-2zm0 5h-12v2h12v-2zm0 5h-12v2h12v-2zm-14-20h-10v10h10v-10zm0 12h-10v10h10v-10z" /></svg>
							<span>{innerContext.leftPanelAllProductBut}</span>
						</li>
						<li className={'list-group-item' + (props.activePage == 'Carousel' ? ' m-lp-active' : '')} onClick={() => props.history.push('/admin/carousel')}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M16 16v2H4v-2H0V4h4V2h12v2h4v12h-4zM14 5.5V4H6v12h8V5.5zm2 .5v8h2V6h-2zM4 6H2v8h2V6z" /></svg>
							<span>{innerContext.leftPanelCarouselBut}</span>
						</li>
						<li className={'list-group-item position-relative' + (props.activePage == 'Orders' ? ' m-lp-active' : '')} onClick={() => props.history.push('/admin/orders')}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 6v16h-16v-16h16zm2-2h-20v20h20v-20zm-24-4v20h2v-18h18v-2h-20z" /></svg>
							<span>{innerContext.leftPanelOrdersBut}</span>
							<span className='badge badge-warning badge-pill px-2 py-1' style={{ position: 'absolute', right: 7, fontSize: '.7rem', opacity: '.75' }} >{props.ordersPage.orders.length}</span>
						</li>
						<li className={'list-group-item' + (props.activePage == 'Settings' ? ' m-lp-active' : '')} onClick={() => props.history.push('/admin/settings')}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 13.616v-3.232l-2.869-1.02c-.198-.687-.472-1.342-.811-1.955l1.308-2.751-2.285-2.285-2.751 1.307c-.613-.339-1.269-.613-1.955-.811l-1.021-2.869h-3.232l-1.021 2.869c-.686.198-1.342.471-1.955.811l-2.751-1.308-2.285 2.285 1.308 2.752c-.339.613-.614 1.268-.811 1.955l-2.869 1.02v3.232l2.869 1.02c.197.687.472 1.342.811 1.955l-1.308 2.751 2.285 2.286 2.751-1.308c.613.339 1.269.613 1.955.811l1.021 2.869h3.232l1.021-2.869c.687-.198 1.342-.472 1.955-.811l2.751 1.308 2.285-2.286-1.308-2.751c.339-.613.613-1.268.811-1.955l2.869-1.02zm-12 2.384c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z" /></svg>
							<span>{innerContext.leftPanelSettingsBut}</span>
						</li>

					</ul>
				</div>

				<div className="col vh-100 bg-gray-300 position-relative" style={{ overflow: 'hidden' }}>


					<nav className="navbar" style={{ position: 'absolute', left: 0, top: 0, width: '100%', zIndex: 1030, boxShadow: '0 0 3px 2px lightgray' }}>
						<div onClick={() => setExpanded(!expanded)}>
							<svg className='m-menu-but' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z" /></svg>
						</div>
						<div className='pl-2 bg-gray-200' >
							<svg fill='gray' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z" /></svg>
							<span className='p-2'>{nec.c.username}</span>
							<button className='btn btn-secondary btn-sm' onClick={() => nec.c.logout()}>logout</button>
						</div>
					</nav>
					<div style={{ height: 47 }}></div>

					<div className='row' id='wcont' style={{ overflowY: 'auto', height: 'calc(100% - 40px)' }}>
						<div className='col-12'>
							<div className='row pt-3 h-100' style={{ maxWidth: 1240 }}>
								{props.children}
							</div>
						</div>

					</div>


				</div>

			</div>
		</div>

	)

}


const mapProp = (state) => {
	return {
		ordersPage: state.ordersPage,
		activePage: state.activePage,
		login: state.login,
	}
}




export default withRouter(connect(mapProp, null)(AdminMT));
