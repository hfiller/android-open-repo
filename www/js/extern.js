var Ex = {
    toRSVP: function(jQp) {
        return new Em.RSVP.Promise(function(resolve, reject) {
            jQp.then(function(value) { resolve(value); });
        });
    },

    getToken: function(email, password) {
        return Ex.toRSVP(
            $.ajax({
	            type:"POST",
	            url:"https://sso.dexit.co/openam/oauth2/access_token?realm=altostratus&grant_type=password&username=" + encodeURIComponent(email) + "&password=" + encodeURIComponent(password),
	            headers: {
		            'Authorization':'Basic ZHgtc2VydmljZToxMjMtNDU2LTc4OQ==',
		            'Content-Type' : 'application/x-www-form-urlencoded'
	            }
            })
            .then(function(res) { return res.access_token; })
        );
	},

    getCourses: function(email, password) {
        return Ex.toRSVP(
            Ex.getToken(email, password)
            .then(function(token) {
                console.log(token);
                return $.ajax({
	                type:"POST",
	                url: 'http://developer.kb.dexit.co/access/stores/course_admin/query?query=' + encodeURIComponent("SELECT * FROM developer_course_student JOIN developer_course ON developer_course_student.course_id = developer_course.course_id AND student_email = '" + email + "';"),
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

                console.log(ret);
                return ret;
            })
        );
    },

    authorizePlayer: function(username, password) {
        return Ex.toRSVP(
            $.ajax({
                type:"POST",
                url: 'http://ice4e-developer.dexit.co/login?IDToken1=' + encodeURIComponent(username) + "&IDToken2=" + encodeURIComponent(password) + "&Login.Submit=Sign+In",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .then(function(res) { return res; })
        );
    }
};