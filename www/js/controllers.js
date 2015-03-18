App.IndexController = Em.ObjectController.extend({
    title: 'Login',

    actions: {
        validate: function() {
            var controller = this;

            Ex.getToken(this.get('email'), this.get('password')).then(
                function(token) {
                    if(token) { controller.transitionToRoute('courses.index'); }
                    else { alert('Username or Password Incorrect'); }
                },
                function(error) {
                    alert('Username or Password Incorrect'); 
                }
            );
            return false;
        }
    }
});

App.CoursesIndexController = Em.ArrayController.extend({
    title: 'Courses',
});

App.CoursesCourseController = Em.ObjectController.extend({
    title: function() { return this.get('course_name'); }.property('course_name'),
    href: function() { return "http://player.dexit.co/player/?course=" + this.get('course_id') + '-altostratus'; }.property('course_id'),

    actions: {
        back: function() { this.transitionToRoute('courses.index'); }
    }
});