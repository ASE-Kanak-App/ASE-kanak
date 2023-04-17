from app.models.models import User, Post

def test_new_user():
    '''
    Given a user model
    When a new user is created
    Then check the fields are defined correctly
    '''

    user = User(email = 'lucifer@gmail.com', firstname = 'lucifer', 
                username = 'lucifer', lastname = 'user',
                password = 'lucifer', intro = 'intro', phone = '12345')
    
    assert user.email == 'lucifer@gmail.com'
    assert user.firstname == 'lucifer'
    assert user.username == 'lucifer'
    assert user.lastname == 'user'
    assert user.password == 'lucifer'
    assert user.intro == 'intro'
    assert user.phone == '12345'



def test_new_post():
    '''
    Given a user model
    When a new user is created
    Then check the fields are defined correctly
    '''

    post = Post(title='eren', content='attack titan', user_id=2, mimetype='worker.jpg')
    
    assert post.title == 'eren'
    assert post.content == 'attack titan'
    assert post.user_id == 2
    assert post.mimetype == 'worker.jpg'