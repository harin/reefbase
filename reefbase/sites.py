from flask import (
    Blueprint, flash, g, redirect, render_template, request, url_for,
    jsonify
)
from werkzeug.exceptions import abort

from reefbase.auth import login_required
from reefbase import db
from reefbase.utils import to_dict
db_session = db.session

bp = Blueprint('sites', __name__)

@bp.route('/')
def index():
    result_proxy = db_session.execute(
        """
        SELECT 
            id,
            name, 
            location_id, 
            ST_Latitude(coord) as lat, 
            ST_Longitude(coord) as lng
        FROM site
        """
    ).fetchall()

    location_ids = ','.join([ '"' + str(r[2]) + '"' for r in result_proxy])

    location_names = db_session.execute(
        f"""
        SELECT id, name FROM location WHERE id in ({location_ids})
        """
    ).fetchall()


    location_map = {}
    for (lid, name) in location_names:
        location_map[lid] = name

    sites = []  
    for row_proxy in result_proxy:
        d = to_dict(row_proxy)
        d['location'] = location_map[d['location_id']]
        sites.append(d)
    return jsonify(sites)

@bp.route('/<int:site_id>/note/<int:user_id>')
def note_for_user(site_id, user_id, methods=['GET']):
    result = db_session.execute(
        """
        SELECT 
            id,
            content,
        FROM note
        WHERE user_id = ? AND site_id = ?
        """, site_id, user_id
    ).fetchone()

    return jsonify({
        'id': result[0],
        'content': result[1]
    })
