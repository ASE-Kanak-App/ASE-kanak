export class userPosts{
    constructor(date = {}){
        this.userName = date.userName || null;
        this.userId = date.userId || null;
        this.eMail = date.eMail || null;
        this.userPosts = date.userPosts || null;
    }

    /**
     *  Get user data
     *  @return {Object}
     */
    getData() {
        return {
            userId: this.userId,
            eMail: this.eMail,
            userPosts: this.userPosts
        };
        }

        setUserPosts(userName, userId, eMail, userPosts){
            this.userName = userName;
            this.userId = userId;
            this.eMail = eMail;
            this.userPosts = userPosts;
        }
    }
