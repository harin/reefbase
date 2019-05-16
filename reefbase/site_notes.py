from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for,
    jsonify
)
from werkzeug.exceptions import abort
from reefbase.auth import login_required
from reefbase import db
from reefbase.utils import to_dict
from flask_jwt_extended import jwt_required, get_jwt_identity

bp = Blueprint('site-notes', __name__)


def create_or_update_note(note, divesite_id, user_id):
    data = request.get_json()
    if note is not None:
        update_data = {
            'note_id': note['id'],
            'content': data['content']
        }
        db.session.execute(
            """
                UPDATE note
                SET content = :content
                WHERE id = :note_id
            """,
            update_data
        )
    else:
        update_data = { 
            'divesite_id': divesite_id, 
            'user_id': user_id, 
            'content': data['content'] 
        }
        db.session.execute(
            """
                INSERT INTO note (divesite_id, user_id, content) VALUES
                (:divesite_id, :user_id, :content)
            """,
            update_data 
        )
    db.session.commit()

def get_note_by_site_user(divesite_id, user_id):
    rowproxy = db.session.execute(
        """
            SELECT id, content FROM note WHERE user_id = :user_id
                AND divesite_id = :divesite_id
        """,
        { 'user_id': user_id, 'divesite_id': divesite_id }
    ).fetchone()
    return to_dict(rowproxy)

@bp.route('/divesites/<int:divesite_id>/users/<int:user_id>', methods=('GET', 'POST'))
@jwt_required
def get_update_or_create(divesite_id, user_id, methods=['POST', 'GET']):
    note = get_note_by_site_user(divesite_id, user_id)

    user = get_jwt_identity()
    print(user, user_id)
    if user['id'] != user_id:
        return jsonify({ 'error': 'Unauthorized' }), 401

    if request.method == 'POST':
        create_or_update_note(note, divesite_id, user_id)
        return jsonify({ 'message': 'ok' })

    if request.method == 'GET':
        return jsonify(note)
