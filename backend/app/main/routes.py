from app.main import bp

@bp.route('/')
def index():
    return '<h4>This is the main blueprint</h4>'

@bp.route('/profile')
def profile():
    return '<h4>This is the profile</h4>'