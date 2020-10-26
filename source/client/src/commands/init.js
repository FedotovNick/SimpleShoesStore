import JwtConnector from './JwtConnector'
import Controller from './Controller'
import store from '../store/store'
import innerContext from '../innerContext'


const connector = new JwtConnector(false);
const nec = new Controller();
nec.setConnector(connector);

window.nec = nec;

const command = {

    execute(obj) {
        let filtering = '&sort=id,desc';
        if(obj.filter) filtering = obj.filter;

        connector.fetch(innerContext.host + `/api/client/card?key=${obj.key}&size=${innerContext.pageSize}&page=${obj.page}${filtering}`)
            .then(r => r.json())
            .then((r) => {
                if(r.status && r.status > 299) return;
                store.dispatch({ type: 'RAP', cards: r });
            })
    }
}
const setNewProductsCommand = {

    execute(obj) {
        let postfix = 'key=all&size=3&page=0&sort=id,desc';
    
        connector.fetch(innerContext.host + `/api/client/card?${postfix}`)
            .then(r => r.json())
            .then((r) => {
                if(r.status && r.status > 299) return;
                store.dispatch({ type: 'SET_NEW_PRODUCTS', newProducts: r.cardList });
            })
    }
}


const chooseCardCommand = {
    execute(index) {
        store.dispatch({ type: 'CHOOSE_CARD_INDEX', index });
    }
}

const orderCardsCommand = {
    execute(order) {
        let orders = store.getState().orderCards;
        let newOrders = Array.from(orders);
        newOrders.push(order);
        store.dispatch({ type: 'ORDER_CARDS', orders: newOrders });
    }
}

const delOrderCardCommand = {
    execute(index) {
        let orders = store.getState().orderCards;
        let newOrders = orders.filter((v, i) => {
            if (i == index) return false;
            else return true;
        });
        store.dispatch({ type: 'ORDER_CARDS', orders: newOrders });
    }
}

const clearOrderCardsCommand = {
    execute() {
        store.dispatch({ type: 'ORDER_CARDS', orders: [] });
    }
}

const doOrderCommand = {
    execute(obj) {
        return connector.fetch(innerContext.host + `/api/client/orders`, { method: 'post', headers: { 'Content-Type': 'application/json;charset=utf-8' }, body: JSON.stringify(obj) })

    }
}

const readCarouselImgs = {
    execute() {
        if (store.getState().carouselImgs.length > 0) return false;

        connector.fetch(innerContext.host + '/api/client/cimg')
            .then(r => r.json())
            .then(r => {
                if(r.status && r.status > 299) return;
                store.dispatch({ type: 'SET_CAROUSEL_IMGS', carouselImgs: r.links })
            });
        return true; 
    }
}


nec.addCommand('READ_ALL_PRODUCT_CARDS', command);
nec.addCommand('CHOOSE_CARD_INDEX', chooseCardCommand);
nec.addCommand('ORDER_CARDS', orderCardsCommand);
nec.addCommand('DEL_ORDER_CARD', delOrderCardCommand);
nec.addCommand('CLEAR_ORDER_CARDS', clearOrderCardsCommand);
nec.addCommand('DO_ORDER', doOrderCommand);
nec.addCommand('READ_CAROUSEL_IMGS', readCarouselImgs);
nec.addCommand('SET_NEW_PRODUCTS', setNewProductsCommand);


export default nec;
