/**
 *  User model
 */

class User{
    constructor(date = {}){
        this.token = null;
        this.email = null;
        this.password = null;
        Object.assign(this, date);
    }
}
export default User;