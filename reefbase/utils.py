
from sqlalchemy.engine.result import RowProxy
from flask import jsonify

def to_dict(rowproxy):
    if rowproxy is None:
        return None
    d = {}
    for column, value in rowproxy.items():
        # build up the dictionary
        d[column] = value
    return d

def to_dicts(resultproxy):
    return [to_dict(row) for row in resultproxy]

def execute(session, query):
    resultproxy = session.execute(query).fetchall()
    result = [to_dict(row) for row in resultproxy] 
    return result

def render_query(session, query):
    return jsonify(execute(session, query))

