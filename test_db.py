from sqlalchemy import create_engine
import os 

import logging
logging.basicConfig()
logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)

uri = 'mysql+pymysql://reefbaseapp:!3gqmi@@5a7xOI@reefbaseapp.cvmbi2jyhiae.us-east-1.rds.amazonaws.com/reefbaseapp'


engine_options = {}
engine_options['connect_args'] = {
    'ssl': { 'ca' : os.environ.get('RDS_CA_PATH') }
}
    
print(engine_options)
engine = create_engine(uri, **engine_options)
print(engine.execute('select * from site').fetchall())