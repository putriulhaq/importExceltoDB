from flask import Flask, jsonify, request
from pymongo import MongoClient
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
client = MongoClient("mongodb+srv://ulhaqbts:ulhaqbts@cluster0.ishshqh.mongodb.net/?retryWrites=true&w=majority")
db = client['qa']


@app.route('/')
def hello():
    users = db.employe.find()
    # print(users)
    user_list = []
    for user in users:
        user_list.append({
            'name': user['name'],
            'positions': user['positions']
        })
    print(user_list)
    return jsonify(user_list)

@app.route('/api/employe', methods=['POST'])
def add_employe():
    employeCollection = db.employe
    user_data = request.get_json()
    # user_data = {"name": "Ulhaq", "positions": "developer"}
    employeCollection.insert_many(user_data)
    return 'Document inserted successfully!'

if __name__ == '__main__':
    app.run()