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
            var controller = this;

            Ex.getToken(this.get('username'), this.get('password')).then(function(token) {
                if(token) {
                    controller.transitionToRoute('courses.index');
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
    title: function() { return this.get('course_name'); }.property('course_name'),
    href: function() { return "http://player.dexit.co/player/?course=" + this.get('course_id') + '-altostratus'; }.property('course_id'),

    actions: {
        back: function() { this.transitionToRoute('courses.index'); }
    }
});