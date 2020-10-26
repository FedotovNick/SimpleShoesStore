import {createStore } from "redux"



const initialState = {
    allCardsPage : null,
    chosenCardIndex: null,
    orderCards: [],
    carouselImgs: [],
    currentPageName: '',
    newProducts: [],
}

const mainReducer = (state=[], action)=>{
    switch(action.type){
        
        case 'RAP':
            return {...state, allCardsPage: action.cards}
        case 'CHOOSE_CARD_INDEX':
            return {...state, chosenCardIndex: action.index}
        case 'ORDER_CARDS': 
            return {...state, orderCards: action.orders}
        case 'SET_CAROUSEL_IMGS':
            return {...state, carouselImgs: action.carouselImgs}
        case 'SET_CURRENT_PAGE_NAME':
            return {...state, currentPageName: action.currentPageName}
        case 'SET_NEW_PRODUCTS': 
            return {...state, newProducts: action.newProducts}



        default: return state;
    }

}









const RapActionCreator = (cards)=>{
    return {type: 'RAP', cards}
}

const store = createStore(mainReducer, initialState);
window.store = store;




export default store;