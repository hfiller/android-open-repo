var username = encodeURIComponent('hfiller2@uwo.ca');
var password = encodeURIComponent('Lieske25113');
$.ajax({
    type:"POST",
    url:"http://ice4e-developer.dexit.co/login?IDToken1="+username+"&IDToken2="+password+"&Login.Submit=Sign+In",
    headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}).done(function(loggedIn){
    console.log('something happened:');
    console.log(loggedIn);
})
$.ajax({
	type:"POST",
	url:"https://sso.dexit.co/openam/oauth2/access_token?realm=altostratus&grant_type=password&username="+username+"&password="+password,
	headers: {
		'Authorization':'Basic ZHgtc2VydmljZToxMjMtNDU2LTc4OQ==',
		'Content-Type' : 'application/x-www-form-urlencoded'
	}
}).done(function(tokenObject){
	console.log('Token\n' + JSON.stringify(tokenObject));

	$.ajax({
		type:"POST",
		url:"developer.kb.dexit.co/access/stores/course_admin/query?query=SELECT%20*%20FROM%20developer_course_student%20JOIN%20developer_course%20ON%20developer_course_student.course_id%20%3D%20developer_course.course_id%20AND%20student_email%3D%27"+username+"%27%3B",
		headers:{
			'Authorization':'Bearer ' + tokenObject.access_token
		}
	}).done(display(msg))
});
display(JSON.parse('{"result":{"headers":["course_id","student_email","grade","id","course_id","course_name","course_description","tenant"],"types":["VARCHAR","VARCHAR","VARCHAR","INT","VARCHAR","VARCHAR","VARCHAR","VARCHAR"],"rows":[["BI3245","sdownie@uwo.ca","96","2","BI3245","Business Intelligence","TBD","default"],["SE2245","sdownie@uwo.ca","99","3","SE2245","Internet Etchnology","TBD","default"]]}}'));
function display(msg){
    var rows = '<ul>'
    for( var i in msg.result.rows){
        //[0] courseId, [1] student, [2] course
        rows += '<li><span >Course:<a class="course" href="http://player.dexit.co/player/?course='+msg.result.rows[i][0]+'">'+msg.result.rows[i][0]+'</a></span>  '+msg.result.rows[i][5]+'<span> Grade:'+msg.result.rows[i][2]+'</span><br><span id="'+msg.result.rows[i][0]+'Data">'+msg.result.rows[i][6]+'</span></li>';
    }
    rows += '</ul>';
    $('#main').append(rows);
}
