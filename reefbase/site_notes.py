from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for,
    jsonify
)
from werkzeug.exceptions import abort
from reefbase.auth import login_required
from reefbase import db
from reefbase.utils import to_dict

bp = Blueprint('site-notes', __name__)


def create_or_update_note(note, site_id, user_id):
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
            'site_id': site_id, 
            'user_id': user_id, 
            'content': data['content'] 
        }
        db.session.execute(
            """
                INSERT INTO note (site_id, user_id, content) VALUES
                (:site_id, :user_id, :content)
            """,
            update_data 
        )
    db.session.commit()

def get_note_by_site_user(site_id, user_id):
    rowproxy = db.session.execute(
        """
            SELECT id, content FROM note WHERE user_id = :user_id
                AND site_id = :site_id
        """,
        { 'user_id': user_id, 'site_id': site_id }
    ).fetchone()
    return to_dict(rowproxy)

@bp.route('/<int:site_id>/users/<int:user_id>', methods=('GET', 'POST'))
@login_required
def create(site_id, user_id):
    note = get_note_by_site_user(site_id, user_id)

    if request.method == 'POST':
        create_or_update_note(note, site_id, user_id)
        return jsonify({ 'message': 'ok' })

    if request.method == 'GET':
        return jsonify(note)



