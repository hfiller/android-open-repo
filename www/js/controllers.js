App.HeaderController = Em.ObjectController.extend({
    isBack: function() {
        return this.get('actions.back');
    }.property('actions.back'),

    title: ''
});


App.IndexController = App.HeaderController.extend({
    title: 'Login',

    actions: {
        validate: function() {
            var u = this.get('username'),
                p = this.get('password');

            Ex.authorizePlayer().then(function() {
                if(someCondition) {
                    this.transitionToRoute(courses);
                }
                else {
                    alert('Username or Password Incorrect');
                }
            });
            return false;
        }
    }
});

App.CoursesIndexController = App.HeaderController.extend({
    title: 'Courses',

    actions: {
        back: function() { this.transitionToRoute('index'); }
    }
});

App.CoursesCourseController = App.HeaderController.extend({
    title: function() { return this.get('course_name'); },

    actions: {
        back: function() { this.transitionToRoute('courses.index'); }
    }
});