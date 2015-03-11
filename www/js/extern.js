var Ex = {
    getToken: function(username, password) {
        var a = username.indexOf('@');
        if(a < 0) { username += '@uwo.ca'; }

        return new Em.RSVP.Promise(function(resolve, reject) {
            $.ajax({
	            type:"POST",
	            url:"https://sso.dexit.co/openam/oauth2/access_token?realm=altostratus&grant_type=password&username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password),
	            headers: {
		            'Authorization':'Basic ZHgtc2VydmljZToxMjMtNDU2LTc4OQ==',
		            'Content-Type' : 'application/x-www-form-urlencoded'
	            }
            })
            .then(function(res) { resolve(res.access_token); })
        });
	},

    getCourses: function(username, password) {
        var a = username.indexOf('@');
        if(a < 0) { username += '@uwo.ca'; }

        return new Em.RSVP.Promise(function(resolve, reject) {
            Ex.getToken(username, password)
            .then(function(token) {
                return $.ajax({
	                type:"POST",
	                url: 'http://developer.kb.dexit.co/access/stores/course_admin/query?query=' + encodeURIComponent("SELECT * FROM developer_course_student JOIN developer_course ON developer_course_student.course_id = developer_course.course_id AND student_email = '" + username + "';"),
	                headers: {'Authorization': 'Bearer ' + token}
                })
                .then(function(msg) { return msg.result });
            })
            .then(function(res) {
                var ret = [],
                    cols = res.headers;

                res.rows.forEach(function(row) {
                    var p = {};
                    for(var i = 0; i < row.length; i++) { p[cols[i]] = row[i] }
                    ret.push(p);
                });

                resolve(ret);
            })
        });
    },

    authorizePlayer: function(username, password) {
        return new Em.RSVP.Promise(function(resolve, reject) {
            $.ajax({
                type:"POST",
                url: 'http://ice4e-developer.dexit.co/login?IDToken1=' + encodeURIComponent(username) + "&IDToken2=" + encodeURIComponent(password) + "&Login.Submit=Sign+In",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .then(function(res) { resolve(res); });
        });
    }
};

/*
$.Deferred.prototype.toRSVP = function() {
    return new Em.RSVP.Promise(function(resolve, reject) {
        this.done(function(value) { resolve(value); });
    });
};
*/


//http://player.dexit.co/player/?course
