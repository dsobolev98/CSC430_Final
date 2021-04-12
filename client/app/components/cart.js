import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import $ from 'jquery';
import ENV from 'client/config/environment';

export default class CartComponent extends Component {
    @tracked coursesInCart = [];
    @tracked successMessg = null;
    @tracked failMessg = null;

    constructor(){
        super(...arguments);
        this.getCart();
    }

    getCart(){
        let local = JSON.parse(localStorage.getItem('cart'))
        if(local)
            this.coursesInCart = local;
        else
            this.coursesInCart = [];
    }

    @action delete(id){
        let tmp = [];
        tmp = this.coursesInCart;
        for(let x in tmp){
            if(tmp[x].ID == id){
                tmp.splice(x,1)
            }
        }
        localStorage.removeItem('cart')
        localStorage.setItem('cart', JSON.stringify(tmp));
        this.getCart();
    }

    @action add(id){
        let index = -1;
        for(let x in this.coursesInCart){
            if(this.coursesInCart[x].ID == id)
                index = x;
        }
        let object = this.coursesInCart[index];
        object.cookie = this.args.cookie
        console.log(object)

        $.get(`${ENV.APP.API_ENDPOINT}/cart/set`,(object), (result)=>{
            if(result){
                this.delete(id)
                this.successMessg = true;
                this.failMessg = null;
            }
            else{
                this.successMessg = null;
                this.failMessg = true;
            }
        });
    }
}
