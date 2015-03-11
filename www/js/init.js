var App = Em.Application.create();

App.Router.map(function() {
    this.resource('courses', function() {
        this.route('course', {path: '/:course_id'});
    });
});

App.User = Em.Object.create({
    username: null,
    domain: null,
    password: null,

    email: function(key, val) {
        if(typeof val != 'undefined') {
            var s = val.split('@');
            console.log(s);
            this.set('username', s[0]);
            this.set('domain', s[1] || 'uwo.ca');
        }

        return this.get('username') + '@' + this.get('domain');
    }.property('username', 'domain')
});

