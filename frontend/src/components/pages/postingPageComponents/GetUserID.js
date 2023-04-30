import Login from "../login";

const FormData = require("form-data");
const {api} = require("../../../helpers/api");
const {User} = require("../../models/User");

//Takes the email and returns the id and username
const getUserId = async (email) => {
    let data = new FormData();
    data.append('email', email);
    console.log("getUserId: " + email)

    let config = {
        method: 'GET',
        maxBodyLength: Infinity,
        url: 'auth/getUserId/',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: {
            email: email
        },
    };
    console.log("config: " + JSON.stringify(config))
    api.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            const responseData = response.data;
            localStorage.setItem('userId', responseData.id);
            localStorage.setItem('username', responseData.username);
        })
        .catch((error) => {
            alert("Wrong email or password, please try again")
            console.log(error);
        });


};

export default getUserId;