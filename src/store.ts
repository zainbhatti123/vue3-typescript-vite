import { createStore } from 'vuex';
import { Product } from './components/types/Product';

export interface State {
   carted_items : Array<Product[]>
}

const store = createStore<State>({
    state:{
        carted_items: [],
    },
    mutations:{
        addItemInCart(state , item:Product[]){
            state.carted_items.unshift(item);
        },
        removeItemInCart(state , data:Product[]){
            let findIndex = state.carted_items.findIndex((item) => item == data)
            state.carted_items.splice(findIndex, 1);
        },
    },
    getters: {
        getItems(state){
            return state.carted_items;
        }
    },
})

export default store;