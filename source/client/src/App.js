import React from 'react';
import GeneralTemplate from './widgets/GeneralTemplate'
import MainPage from './widgets/MainPage'
import ProductsContainer from './widgets/ProductsContainer';
import ProductDetails from './widgets/ProductDetails'
import {Switch, Route} from 'react-router-dom'
import Basket from './widgets/Basket'
import nec from './commands/init'


export default function App() {
	init(); //while first entering into client app!

	return (
		
			<GeneralTemplate>
				
				<div id='fpan' className={'row bg-dark'} style={{height: '98px'}}></div>

				<Switch>
					<Route exact path="/" component={MainPage} />
					

					<Route path="/all-products"  render={()=>{
						return <ProductsContainer sortingParam='all'/>
					}} />
					<Route path="/for_men" render={()=>{
						return <ProductsContainer sortingParam='male'/>
					}} />
					<Route path="/for_women" render={()=>{
						return <ProductsContainer sortingParam='female'/>
					}} />

					<Route path="/product-details" component={ProductDetails} />
					<Route path="/basket" component={Basket} />
					
				</Switch>

			</GeneralTemplate>






		
	)
}


function init(){
	nec.execute('READ_CAROUSEL_IMGS');
	console.log('GEneRAl template **************************************************');
}