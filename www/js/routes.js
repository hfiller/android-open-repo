App.ApplicationRoute = Em.Route.extend({
    model: function() { return App.User; }
});

App.IndexRoute = Em.Route.extend({
    model: function() { this.modelFor('application'); }
});

App.CoursesRoute = Em.Route.extend({
    model: function() {
        var u = this.modelFor('application');
        return Ex.getCourses(u.username);
    }
});

App.CoursesIndexRoute = Em.Route.extend({
    model: function() { return this.modelFor('courses'); }
});

App.CoursesCourseRoute = Em.Route.extend({
    model: function(params) {
        return this.modelFor('courses').filterBy('course_id', params.course_id)[0];
    }
});