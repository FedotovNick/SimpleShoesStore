import JwtConnector from './JwtConnector'
import Controller from './Controller'
import store from '../store/store'
import readCardsAction from '../store/actions/readCardsAction'
import editCardAction from '../store/actions/editCardAction'
import innerContext from '../innerContext'






const jwtConnector = new JwtConnector(false);
const nec = new Controller();
nec.setConnector(jwtConnector);

window.nec = nec;







const readCardsCommand = {
    execute(obj) {
        jwtConnector.fetch(innerContext.host+`/api/admin/card?size=${obj.size}&page=${obj.page}`)
            .then(r=>r.json())
            .then(r => {
                if(r.status && r.status != 200) return; 
                console.log(innerContext.host+`/api/admin/card?size=${obj.size}&page=${obj.page}`);
                store.dispatch(readCardsAction(r));
                
            })
            
    }
}
const deleteCardCommand = {
    execute(obj){
       return jwtConnector.fetch(innerContext.host+`/api/admin/card/${obj.cardId}`,{method: 'DELETE'})     
    }
}
const editCardCommand = {
    execute(obj){
       store.dispatch(editCardAction(obj.cardIndex));
    }
}
const deleteOrderCommand = {
    execute(obj){
        jwtConnector.fetch(innerContext.host+'/api/admin/orders/'+obj.orderId, {method: 'delete'})
            .then(r=>{
                readOrdersCommand.execute();
            });
    }
}
const readOrdersCommand = {
    execute(){
        jwtConnector.fetch(innerContext.host+'/api/admin/orders')
            .then(r=>{
                
                return r.json();
            }  
            )
            .then(r=>{
                if(r.status && r.status != 200) return;
                store.dispatch({type: 'READ_ORDERS_PAGE', ordersPage: r})
            })
            
    }
}
const readCarouselImgsCommand = {
    execute(){
        return jwtConnector.fetch(innerContext.host+'/api/admin/cimg');   
    }
}


const setCarouselImgsCommand = {
    execute(obj){
        return jwtConnector.fetch(innerContext.host+'/api/admin/cimg', { method: 'put', body: obj.fdata })
       
    }
}

const createCardCommand = {
    execute(obj){
        console.log('creating card');
        console.log(obj);
        return jwtConnector.fetch(innerContext.host+'/api/admin/card',{method:'POST', body: obj.formData});
        
    }
}





nec.addCommand('READ_CARDS', readCardsCommand);
nec.addCommand('DELETE_CARD', deleteCardCommand);
nec.addCommand('EDIT_CARD', editCardCommand);
nec.addCommand('DELETE_ORDER', deleteOrderCommand);
nec.addCommand('READ_ORDERS', readOrdersCommand);
nec.addCommand('READ_CAROUSEL_IMGS', readCarouselImgsCommand);

nec.addCommand('SET_CAROUSEL_IMGS', setCarouselImgsCommand);
nec.addCommand('CREATE_CARD',createCardCommand);

export default nec;
