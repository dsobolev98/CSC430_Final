import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class MainApplicationComponent extends Component {
    @tracked activePage = "login";
    @tracked cookie = null;
    @tracked coursesEnrolled = null;

    @tracked selectedSchool = null;
    @tracked selectedCourseName = null;
    @tracked selectedSemester = null;
    @tracked selectedCourseNumber = null;

    constructor(){
        super(...arguments);
        this.getCookieFromLocal();
    }

    get isMainPage(){
        return this.activePage === 'main'
    }
    get isLoginPage(){
        return this.activePage === 'login'
    }
    get isCartPage(){
        return this.activePage === 'cart'
    }
    get isSearchPage(){
        return this.activePage === 'search'
    }
    get isCoursePage(){
        return this.activePage === 'courseView'
    }

    @action
    navigateTo(page){
        this.activePage=page;
    }

    @action
    changeCookie(num){
        this.cookie=num;
    }

    @action 
    searchHandler(sem, school, name, num){
        this.selectedSchool = school;
        this.selectedCourseName = name;
        this.selectedSemester = sem;
        this.selectedCourseNumber = num;
    }

    getCookieFromLocal(){
        var tempLocal = localStorage.getItem('cookie');
        if(tempLocal === null){
            this.cookie = null;
        }
        else{
            this.cookie = tempLocal;
            this.activePage = 'main'
        }
    }
}
