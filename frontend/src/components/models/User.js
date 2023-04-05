/**
 *  User model
 */

export class User{
    constructor(date = {}){
        this.id = date.id || null;
        this.name = date.name || null;
        this.email = date.email || null;
        this.password = date.password || null;
        this.role = date.role || null;
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
            email: this.email,
            password: this.password,
            role: this.role,
            token: this.token
        }
    }

    /**
     *  Set user data
     *  @param {Object} data
     */
    setData(data) {
        this.id = data.id || this.id;
        this.name = data.name || this.name;
        this.email = data.email || this.email;
        this.password = data.password || this.password;
        this.role = data.role || this.role;
        this.token = data.token || this.token;
    }

    /**
     *  Set user email
     *  @param {String} email
     */
    setEmail(email) {
        this.email = email;
    }
}