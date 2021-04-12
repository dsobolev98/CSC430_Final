import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import $ from 'jquery';
import ENV from 'client/config/environment';

export default class ScheduleComponent extends Component {
    @tracked coursesEnrolled = null;
    @tracked courseInfo = null;

    constructor(){
        super(...arguments);
        this.getEnrolled();
    }

    getEnrolled(){
        $.get(`${ENV.APP.API_ENDPOINT}/schedule/courses`,({cookie:this.args.cookie}), (result)=>{
            this.coursesEnrolled = result;
        });
    }
}
