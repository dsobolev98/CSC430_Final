import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking'
import { action } from '@ember/object';
import $ from 'jquery';
import ENV from 'client/config/environment';

export default class CourseViewComponent extends Component {
    @tracked sem = null;
    @tracked school = null;
    @tracked name = null;
    @tracked num = null;
    @tracked checked = false;

    @tracked courses = [];

    constructor(){
        super(...arguments);
        this.sem = this.args.sem;
        this.school = this.args.school;
        this.name = this.args.name;
        this.num = this.args.num;
        this.getCourses()
    }

    getCourses(){
        $.get(`${ENV.APP.API_ENDPOINT}/search/find`,({school:this.school, name:this.name, num:this.num}), (result)=>{
            this.courses = result;
        });
    }

    @action submit(id, name, number, time, sem){
        let object = {ID:id, Name:name, Number:number, Time:time, Waitlist:this.checked};
        let cart = JSON.parse(localStorage.getItem('cart'))
        if(cart){
            cart.push(object);
        }
        else{
            cart = [];
            cart.push(object);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        this.args.changePage('search')
    }

    @action waitList(checked){
        if(checked){
            console.log('checked')
            this.checked = true;
        }
        else{
            console.log('unchecked')
            this.checked = false;
        }
    }
}
