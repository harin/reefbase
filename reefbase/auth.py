import functools

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for,
    jsonify
)
from werkzeug.security import check_password_hash, generate_password_hash

from reefbase import db
from reefbase.utils import to_dict
import json
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity, get_raw_jwt
from .webtoken import blacklist

bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/register', methods=('GET', 'POST'))
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        error = None

        print(db.session)

        if not username:
            error = 'Username is required.'
        elif not password:
            error = 'Password is required.'
        elif db.session.execute(
            'SELECT * FROM user WHERE username = :username', { 'username': username },
        ).fetchone() is not None:
            error = 'User {} is already registered.'.format(username)

        if error is None:
            db.session.execute(
                'INSERT INTO user (username, password) VALUES (:username, :password_hash)',
                {'username':username, 'password_hash':generate_password_hash(password)}
            )
            db.session.commit()
            return redirect(url_for('auth.login'))

        flash(error)

    return render_template('auth/register.html')

@bp.route('/login', methods=('GET', 'POST'))
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        error = None
        user = db.session.execute(
            'SELECT * FROM user WHERE username = :username', { 'username': username },
        ).fetchone()

        if user is None:
            error = 'Incorrect username.'
        elif not check_password_hash(user['password'], password):
            error = 'Incorrect password.'

        if error is None:
            session.clear()
            session['user_id'] = user['id']
            return redirect(url_for('index'))

        flash(error)

    return render_template('auth/login.html')

@bp.route('/api-register', methods=['POST'])
def api_register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')
    error = None

    if not username:
        error = 'Username is required.'
    elif not password:
        error = 'Password is required.'
    elif not email:
        error = 'Email is required'
    elif db.session.execute(
        'SELECT * FROM user WHERE username = :username OR email = :email', { 'username': username, 'email': email },
    ).fetchone() is not None:
        error = 'Username or email is already registered.'

    if error is None:
        db.session.execute(
            'INSERT INTO user (username, password, email) VALUES (:username, :password_hash, :email)',
            {'username':username, 'password_hash':generate_password_hash(password), 'email': email }
        )
        db.session.commit()
        return jsonify({ 'msg': 'success'})

    return jsonify({ 'error': error }), 400

@bp.route('/api-login', methods=['POST'])
def api_login():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email:
        return jsonify({"msg": "Missing email parameter"}), 400
    if not password:
        return jsonify({"msg": "Missing password parameter"}), 400

    error = None
    user = db.session.execute(
        'SELECT * FROM user WHERE email = :email', { 'email': email },
    ).fetchone()

    if user is None:
        return jsonify({"msg": "Bad email or password"}), 401
    elif not check_password_hash(user['password'], password):
        return jsonify({"msg": "Bad email or password"}), 401

    if error is None:
        user = to_dict(user)
        access_token = create_access_token(identity=user)
        return jsonify(
            access_token=access_token, 
            username=user['username'],
            id=user['id']
        ), 200


    return jsonify({"msg": "Bad email or password"}), 401

@bp.route('/api-logout', methods=['POST'])
@jwt_required
def api_logout():
    jti = get_raw_jwt()['jti']
    blacklist.add(jti)
    return jsonify({ 'msg': 'Successfully logged out' }), 200

@bp.before_app_request
def load_logged_in_user():
    user_id = session.get('user_id')

    if user_id is None:
        g.user = None
    else:
        g.user = db.session.execute(
            'SELECT * FROM user WHERE id = :user_id', { 'user_id': user_id },
        ).fetchone()
        g.user_json = json.dumps(to_dict(g.user))


@bp.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))

def login_required(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            return redirect(url_for('auth.login'))

        return view(**kwargs)

    return wrapped_view