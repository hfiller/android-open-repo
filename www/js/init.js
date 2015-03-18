var App = Em.Application.create();

App.Router.map(function() {
    this.resource('courses', function() {
        this.route('course', {path: '/:course_id'});
    });
});

App.User = Em.Object.extend({
    username: '',
    password: '',

    email: function() {
        return this.get('username') + '@uwo.ca';
    }.property('username')
}).create();

