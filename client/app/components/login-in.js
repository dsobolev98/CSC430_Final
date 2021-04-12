import Component from '@glimmer/component';
import {tracked} from '@glimmer/tracking';
import {action} from '@ember/object';
import { inject as service }from '@ember/service';
import $ from 'jquery';
import ENV from 'client/config/environment';

export default class LoginInComponent extends Component {
    @tracked userName = null;
    @tracked userPass = null;
    @tracked message = null;

    @action checkInfo(){
        if(this.userName && this.userPass){
            $.post(`${ENV.APP.API_ENDPOINT}/auth/login`,({username:this.userName,password:this.userPass}), (result)=>{
                if(result && result.isLoggedIn){
                    localStorage.setItem('cookie', result.cookie);
                    this.args.cookie(result.cookie)
                    this.args.changePage('main');
                }
                else{
                    this.message="Wrong username or password!"
                }
            })
        }
        else{
            this.message="Please enter a username or password!"
        }
    }

    getUsername(input){
        this.userName = input.target.value
    }

    getUserpass(input){
        this.userPass = input.target.value
    }
}
