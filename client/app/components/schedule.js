import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import $ from 'jquery';
import ENV from 'client/config/environment';

export default class ScheduleComponent extends Component {
    @tracked coursesEnrolled = null;
    @tracked courseInfo = null;
    @tracked semester = null;

    constructor(){
        super(...arguments);
        this.getEnrolled();
    }

    getEnrolled(){
        $.get(`${ENV.APP.API_ENDPOINT}/schedule/courses`,({cookie:this.args.cookie, semester:this.semester}), (result)=>{
            this.coursesEnrolled = result;
        });
    }

    @action changeSemester(choosenSemester){
        this.semester = choosenSemester;
        this.getEnrolled();
    }

    @action drop(id){
        var confirmed = confirm('Are you sure you want to drop?');
        
        if (confirmed === true){
            $.get(`${ENV.APP.API_ENDPOINT}/schedule/drop`,({cookie:this.args.cookie, semester:this.semester, courseID:id}));
            this.getEnrolled();
        }
    }
}
