import { createStore } from "redux";



const initialState = {
    createCardWidgetFnameInvalid: false,
    createCardWidgetFsurnameInvalid: false,
    cards: {cardList: [], totalPages: 0, pageSize: 0, pageNumber: 0},
    editCardIndex: -1,
    ordersPage:{orders: []},
    activePage: '',
    login: 'awe',
    
}


function reducers(state={}, action){
    switch(action.type){

        case 'READ_CARDS':
            return {...state, cards: action.cards}
            
        case 'EDIT_CARD': 
            return {...state, editCardIndex: action.cardIndex}    

        case 'READ_CAROUSEL_IMGS':
            return {...state, carouselImgs: action.imgs}

        case 'READ_ORDERS_PAGE':
            return {...state, ordersPage: action.ordersPage}
        case 'SET_ACTIVE_PAGE': 
            return {...state, activePage: action.activePage}
        case 'SET_LOGIN':
            return {...state, login: action.login}
        

        default: return state;


    }
    
}


const store = createStore(reducers, initialState);

window.store = store;

export default store;