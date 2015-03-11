App.ApplicationRoute = Em.Route.extend({
    model: function() { return App.User; }
});

App.IndexRoute = Em.Route.extend({
    model: function() { return this.modelFor('application'); }
});

App.CoursesRoute = Em.Route.extend({
    model: function() {
        var u = this.modelFor('application');
        return Ex.getCourses(u.get('email'), u.get('password'));
    }
});

App.CoursesIndexRoute = Em.Route.extend({
    model: function() { return this.modelFor('courses'); }
});

App.CoursesCourseRoute = Em.Route.extend({
    model: function(params) {
        return this.modelFor('courses').filterBy('course_id', params.course_id)[0];
    },

    beforeModel: function() {
        var u = this.modelFor('application');
        Ex.authorizePlayer(u.get('username'), u.get('password'));
        dexit.test.xKBplugin.extract();
    }
});