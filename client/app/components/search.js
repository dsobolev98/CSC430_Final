import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking'
import { action } from '@ember/object';
import $ from 'jquery';
import ENV from 'client/config/environment';


export default class SearchComponent extends Component {
    @tracked subjects = null;
    @tracked schoolsEnrolled = null;
    @tracked courseNumbers = null;
    
    @tracked selectedSchool = null;
    @tracked selectedCourseName = null;
    @tracked selectedSemester = null;
    @tracked selectedCourseNumber = null;

    constructor(){
        super(...arguments);
        this.findBasics();
    }

    findBasics(){
        $.get(`${ENV.APP.API_ENDPOINT}/search/inSchool`,({cookie:this.args.cookie}), (result)=>{
            this.schoolsEnrolled = result;
        });
    }

    @action changeSemester(val){
        this.selectedSemester = val;
    }

    @action viewClasses(id){
        this.selectedSchool = id;
        $.get(`${ENV.APP.API_ENDPOINT}/search/findCoursesInSchool`,({schools:id}), (result)=>{
            this.subjects = result;
        });
    }

    @action viewNumbers(sub){
        this.selectedCourseName = sub;
        $.get(`${ENV.APP.API_ENDPOINT}/search/findNumInSub`,({subject:sub,school:this.selectedSchool}), (result)=>{
            this.courseNumbers = result;
        });
    }

    @action changeCourseNumber(num){
        this.selectedCourseNumber = num;
    }

    @action submit(){
        this.args.handler(this.selectedSemester, this.selectedSchool, this.selectedCourseName, this.selectedCourseNumber);
        this.args.changePage('courseView')
    }
}
