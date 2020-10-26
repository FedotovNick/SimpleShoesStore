import React, { useState, useEffect } from 'react';
import Counter from './counter/Counter'
import AdminMT from './widgets/AdminMT';
import CreateCardWidget from './widgets/CreateCardWidget';
import CarouselAdjuster from './widgets/CarouselAdjuster'
import EditCardWidget from './widgets/EditCardWidget';
import CardsPage from './widgets/CardsPage'
import Settings from './widgets/Settings'
import { Switch, Route, Redirect } from 'react-router-dom'
import AllOrderCards from './widgets/AllOrderCards'
import LoginForm from './widgets/LoginForm'
import nec from './commands/init'
import { connect } from 'react-redux';
import store from './store/store'



nec.c.auth()
	.then(r => {
		if (r) {
			if (nec.c.username == 'admin') {
			}
			store.dispatch({ type: 'SET_LOGIN', login: true });
		}
		else store.dispatch({ type: 'SET_LOGIN', login: false });
	})


let ordersInterval;

function App(props) {

	const route = () => {
		if (props.login == true) {
			//nec.execute('READ_ORDERS');

			return (
				<Route path='/admin/' render={() => {
					return (
						<AdminMT>
							<Route exact path='/admin' render={() => { return <Redirect to='/admin/all-cards'/> }} />
							<Route exact path='/admin/carousel' component={CarouselAdjuster} />
							<Route exact path='/admin/all-cards' component={CardsPage} />
							<Route exact path='/admin/create' component={CreateCardWidget} />
							<Route exact path='/admin/edit-card' component={EditCardWidget} />
							<Route exact path='/admin/orders' component={AllOrderCards} />
							<Route exact path='/admin/settings' component={Settings} />
						</AdminMT>
					)
				}}
				/>
			)
		}
		else if (props.login == 'awe') {
			return 'awe';
		}
		else return (
			<Route path='/admin/' component={LoginForm} />
		)
	}

	return (
		<>
			<Switch>
				{route()}
			</Switch>
		</>
	)
}


const mapProp = (state) => {
	return {
		login: state.login,
		interval: state.interval,
	}
}



export default connect(mapProp, null)(App);