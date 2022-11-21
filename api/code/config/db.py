import mysql.connector
import os

mydb = mysql.connector.connect (
  host="db",
  user=os.environ.get('USERNAME_DB'),
  password=os.environ.get('PASSWORD_DB'),
  database="db"
)