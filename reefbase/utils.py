
from sqlalchemy.engine.result import RowProxy

def to_dict(rowproxy):
    if rowproxy is None:
        return None
    d = {}
    for column, value in rowproxy.items():
        # build up the dictionary
        d[column] = value
    return d
