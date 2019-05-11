from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for,
    jsonify
)
from werkzeug.exceptions import abort

from reefbase.auth import login_required
from reefbase.db import db_session

bp = Blueprint('site', __name__)

@bp.route('/api/sites')
def index():
    result = db_session.execute(
        """
        SELECT 
            name, 
            location_id, 
            ST_Latitude(coord), 
            ST_Longitude(coord) 
        FROM site
        """
    ).fetchall()

    location_ids = ','.join([ str(r[1]) for r in result])

    location_names = db_session.execute(
        f"""
        SELECT id, name FROM location Where id in ({location_ids})
        """
    ).fetchall()


    location_map = {}
    for (lid, name) in location_names:
        location_map[lid] = name

    sites = [ { 
        'name': r[0], 
        'location': location_map[r[1]], 
        'lat': r[2], 
        'lng': r[3] } for r in result ]
    return jsonify(sites)

# @bp.route('/create', methods=('GET', 'POST'))
# @login_required
# def create():
#     if request.method == 'POST':
#         title = request.form['title']
#         body = request.form['body']
#         error = None

#         if not title:
#             error = 'Title is required.'

#         if error is not None:
#             flash(error)
#         else:
#             db = get_db()
#             db.execute(
#                 'INSERT INTO post (title, body, author_id)'
#                 ' VALUES (?, ?, ?)',
#                 (title, body, g.user['id'])
#             )
#             db.commit()
#             return redirect(url_for('blog.index'))

#     return render_template('blog/create.html')

# def get_post(id, check_author=True):
#     post = get_db().execute(
#         'SELECT p.id, title, body, created, author_id, username'
#         ' FROM post p JOIN user u ON p.author_id = u.id'
#         ' WHERE p.id = ?',
#         (id,)
#     ).fetchone()

#     if post is None:
#         abort(404, "Post id {0} doesn't exist.".format(id))

#     if check_author and post['author_id'] != g.user['id']:
#         abort(403)

#     return post

# @bp.route('/<int:id>/update', methods=('GET', 'POST'))
# @login_required
# def update(id):
#     post = get_post(id)

#     if request.method == 'POST':
#         title = request.form['title']
#         body = request.form['body']
#         error = None

#         if not title:
#             error = 'Title is required.'

#         if error is not None:
#             flash(error)
#         else:
#             db = get_db()
#             db.execute(
#                 'UPDATE post SET title = ?, body = ?'
#                 ' WHERE id = ?',
#                 (title, body, id)
#             )
#             db.commit()
#             return redirect(url_for('blog.index'))

#     return render_template('blog/update.html', post=post)

# @bp.route('/<int:id>/delete', methods=('POST',))
# @login_required
# def delete(id):
#     get_post(id)
#     db = get_db()
#     db.execute('DELETE FROM post WHERE id = ?', (id,))
#     db.commit()
#     return redirect(url_for('blog.index'))