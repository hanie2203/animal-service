function login() {
    let inputUsername = document.getElementById('username').value;
    event.preventDefault()
    d3.csv("../database/staffs.csv").then(function(data) {
        let result = data.filter(function(d) {
            return d.username == inputUsername;
        });
        if (result.length > 0) {
            let inputPassword = document.getElementById('password').value;
            if (result[0]['password'] == inputPassword) {
                window.location.href = "appointments.html";
            }
        }
    });
}