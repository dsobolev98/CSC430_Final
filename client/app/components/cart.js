import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import $ from 'jquery';
import ENV from 'client/config/environment';

export default class CartComponent extends Component {
    @tracked coursesInCart = [];
    @tracked successMessg = null;
    @tracked failMessg = null;
    @tracked countCourses = null;
    @tracked classFull = null;

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
        //get the shopping cart stored in local storage and find the specific class the user clicked on
        let index = -1;
        for(let x in this.coursesInCart){
            if(this.coursesInCart[x].ID == id)
                index = x;
        }
        let object = this.coursesInCart[index];
        object.cookie = this.args.cookie
        console.log(object)
        
        //we can check if the user alrady has this course in his schedule by adding a new get method. and having the below code within the function
        //find if there is enough seats in the course
        $.get(`${ENV.APP.API_ENDPOINT}/cart/explainWaitList`, (object), (result)=>{
            if(result <= 0 && object.Waitlist == true){                    //the class is full, only able to be put on waitlist
                object.status = 'Waitlist'
                this.addDB(object, id)

            }
            else if (result > 0){                                           //the class has seats available
                object.status = 'Enrolled'
                this.addDB(object, id)
            }
            else{
                this.successMessg = null;
                this.failMessg = null;
                this.classFull = true;
            }
        })
    }

    addDB(object, id){
        $.get(`${ENV.APP.API_ENDPOINT}/cart/set`,(object), (result)=>{
            if(result){
                this.delete(id)
                this.successMessg = true;
                this.failMessg = null;
                this.classFull = null;
            }
            else{
                this.successMessg = null;
                this.failMessg = true;
                this.classFull = null;
            }
        });
    }
}
