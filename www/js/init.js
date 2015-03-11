var App = Em.Application.create();

App.Router.map(function() {
    this.resource('courses', function() {
        this.route('course', {path: '/:course_id'});
    });
});

App.User = Em.Object.create({
    username: null,
    password: null
});

