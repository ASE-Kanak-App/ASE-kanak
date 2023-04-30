/**
 *  User model
 */

export class User{
    constructor(date = {}){
        this.id = date.id || null;
        this.name = date.name || null;
        this.userName = date.userName || null;
        this.email = date.email || null;
        this.token = date.token || null;
    }

    /**
     *  Get user data
     *  @return {Object}
     */
    getData() {
        return {
            id: this.id,
            name: this.name,
            userName: this.userName,
            email: this.email,
            token: this.token
        }
    }

    /**
     *  Set user data
     *  @param {Object} data
     */
    setData(data) {
        this.id = data.id;
        this.name = data.name;
        this.userName = data.userName;
        this.email = data.email;
        this.token = data.token;
    }

    /**
     *  Set user email
     *  @param {String} email
     */
    setEmail(email) {
        this.email = email;
    }
    setUserName(userName) {
        this.userName = userName;
    }
    setID(id) {
        this.id = id;
    }
    setToken(token) {
        this.token = token;
    }
    getUserName() {
        return this.userName;
    }
    getEmail() {
        return this.email;
    }
}