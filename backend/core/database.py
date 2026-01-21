#===================================================
# 1. Package Imports
#===================================================
# psycopg2 is used for executing raw SQL queries
import psycopg2

# SQLAlchemy imports for ORM-based database interaction
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
 

#===================================================
# 2. Database Configuration


DB_CONFIG = {
    "dbname": "stock_data",     # Name of the PostgreSQL database
    "user": "postgres",         # Database username
    "password": "root",         # Database password
    "host": "localhost",        # Database host (local machine)
    "port": "5433",             # PostgreSQL port number
}


#===================================================
# 3. psycopg2 Connection (Raw SQL)
#===================================================
# This function creates and returns a direct database
# connection using psycopg2.

def get_db_connection():
    return psycopg2.connect(**DB_CONFIG)

#===================================================
# 4. SQLAlchemy Setup (ORM)
#===================================================
# SQLAlchemy connection URL built from DB_CONFIG

SQLALCHEMY_DATABASE_URL = (
    f"postgresql://{DB_CONFIG['user']}:{DB_CONFIG['password']}"
    f"@{DB_CONFIG['host']}:{DB_CONFIG['port']}/{DB_CONFIG['dbname']}"
)

#===================================================
# 4-1. Engine Creation
#===================================================
# The engine is the core interface to the database
# It manages connections and executes SQL internally
engine = create_engine(SQLALCHEMY_DATABASE_URL)


#===================================================
# 4-2. Session Factory
#===================================================
# SessionLocal is used to create database sessions

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

#===================================================
# 4-3. Base Class for ORM Models
#===================================================
# Base is inherited by all ORM models

Base = declarative_base()
