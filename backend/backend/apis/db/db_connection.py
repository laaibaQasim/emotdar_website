# db/db_connection.py
import os
import pymysql
import yaml

def get_db_connection():
    script_dir = os.path.dirname(os.path.realpath(__file__))
    yaml_path = os.path.join(script_dir, 'db_config.yaml')
    
    with open(yaml_path, 'r') as yaml_file:
        config = yaml.safe_load(yaml_file)

    return pymysql.connect(
        host=config['database']['host'],
        user=config['database']['user'],
        passwd=config['database']['password'],
        database=config['database']['database']
    )
