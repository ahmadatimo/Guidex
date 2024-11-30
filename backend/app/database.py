from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# !!FOR RUNNING LOCALLY!!
URL_DATABASE = 'mysql+pymysql://root:password@localhost:3306/guidex'

#URL_DATABASE = 'mysql+pymysql://root:password@db/guidex'

engine = create_engine(URL_DATABASE)

SessionLocal = sessionmaker( autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()