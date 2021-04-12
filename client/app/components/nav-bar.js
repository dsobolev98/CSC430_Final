import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking'
import { action } from '@ember/object';

export default class NavBarComponent extends Component {
    @action 
    changeToMain(){
        this.args.changePage('main');
    }

    @action 
    changeToCart(){
        this.args.changePage('cart');
    }

    @action 
    changeToSearch(){
        this.args.changePage('search');
    }   

    @action 
    changeToLogin(){
        this.args.changePage('login');
    }

    @action
    changeToDefLogOut(){
        localStorage.removeItem('cookie');
        localStorage.removeItem('cart');
        this.args.changeCookie(null);
        this.args.changePage('login');
    }
}
