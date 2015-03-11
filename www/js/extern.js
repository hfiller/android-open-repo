var Ex = {
    getToken: function() {
        var u = encodeURIComponent('hfiller2@uwo.ca'),
            p = encodeURIComponent('Lieske25113');

        return $.ajax({
	        type:"POST",
	        url:"https://sso.dexit.co/openam/oauth2/access_token?realm=altostratus&grant_type=password&username=" + u + "&password=" + p,
	        headers: {
		        'Authorization':'Basic ZHgtc2VydmljZToxMjMtNDU2LTc4OQ==',
		        'Content-Type' : 'application/x-www-form-urlencoded'
	        }
        })
        .then(function(res) { return res.access_token }).promise();
	},

    getCourses: function(username) {
        return Ex.getToken().then(function(token) {
            return $.ajax({
	            type:"POST",
	            url:"developer.kb.dexit.co/access/stores/course_admin/query?query=SELECT%20*%20FROM%20developer_course_student%20JOIN%20developer_course%20ON%20developer_course_student.course_id%20%3D%20developer_course.course_id%20AND%20student_email%3D%27"+username+"%27%3B",
	            headers:{
		            'Authorization':'Bearer ' + tokenObject.access_token
	            }
            });
        }).then(function(msg) {
            var ret = [],
                cols = msg.result.headers;

            msg.result.rows.forEach(function(row) {
                var p = {};
                for(var i = 0; i < row.legnth; i++) { p[cols[i]] = row[i] }
                ret.push(p);
            });

            return ret;
        }).promise();
    },

    authorizePlayer: function(username, password) {
        return $.ajax({
            type:"POST",
            url:"http://ice4e-developer.dexit.co/login?IDToken1="+username+"&IDToken2="+password+"&Login.Submit=Sign+In",
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).promise();
    }
};

//http://player.dexit.co/player/?course
