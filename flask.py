#flask Methods

from flask import Flask, request
import psycopg2

# Connect to the database
conn = psycopg2.connect(database="zenith_ftc", user="user", password="password", host="localhost", port="5432")

# Create a cursor
cur = conn.cursor()

app = Flask(__name__)

# Route to create a new part
@app.route('/parts', methods=['POST'])
def create_part():
    # Get the data from the request body
    data = request.get_json()
    name = data['name']
    description = data['description']
    quantity = data['quantity']
    
    # Call the create_part function
    create_part(name, description, quantity)
    
    # Return a success message
    return "Part successfully created"

# Route to read a part
@app.route('/parts/<name>', methods=['GET'])
def read_part(name):
    # Call the read_part function
    part = read_part(name)
    
    # Return the part data
    return {
        "id": part[0],
        "name": part[1],
        "description": part[2],
        "quantity": part[3]
    }

# Route to update a part
@app.route('/parts/<id>', methods=['PUT'])
def update_part(id):
    # Get the data from the request body
    data = request.get_json()
    name = data['name']
    description = data['description']
    quantity = data['quantity']
    
    # Call the update_part function
    update_part(id, name, description, quantity)
    
    # Return a success message
    return "Part successfully updated"

# Route to delete a part
@app.route('/parts/<id>', methods=['DELETE'])
def delete_part(id):
    # Call the delete_part function
    delete_part(id)
    
    # Return a success message
    return "Part successfully deleted"

if __name__ == '__main__':
    app.run()
