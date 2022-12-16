#my attempt at wre writing the server's commands in python
import psycopg2

# Connect to the database
conn = psycopg2.connect(database="zenith_ftc", user="user", password="password", host="localhost", port="5432")

# Create a cursor
cur = conn.cursor()

# Create the parts table
cur.execute("CREATE TABLE parts (id SERIAL PRIMARY KEY, name TEXT, description TEXT, quantity INTEGER)")

# Function to create a new part
def create_part(name, description, quantity):
    # Use an INSERT INTO SQL command to add the new part to the database
    cur.execute("INSERT INTO parts (name, description, quantity) VALUES (%s, %s, %s)", (name, description, quantity))
    # Commit the changes to the database
    conn.commit()

# Function to read a part from the database
def read_part(name):
    # Use a SELECT SQL command to retrieve the part from the database
    cur.execute("SELECT * FROM parts WHERE name = %s", (name,))
    # Return the result
    return cur.fetchone()

# Function to update an existing part
def update_part(id, name, description, quantity):
    # Use an UPDATE SQL command to modify the part in the database
    cur.execute("UPDATE parts SET name = %s, description = %s, quantity = %s WHERE id = %s", (name, description, quantity, id))
    # Commit the changes to the database
    conn.commit()

# Function to delete a part from the database
def delete_part(id):
    # Use a DELETE SQL command to remove the part from the database
    cur.execute("DELETE FROM parts WHERE id = %s", (id,))
    # Commit the changes to the database
    conn.commit()
    
    create_part("Part A", "This is a description of Part A", 10)

# Test the read function
part = read_part("Part A")
print(part)

# Test the update function
update_part(part[0], "Part A", "This is an updated description of Part A", 20)

# Test the delete function
delete_part(part[0])
