from flask import Flask, render_template, request, redirect, url_for, session, flash,jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
import bcrypt 


app = Flask(__name__)

# Configuration
app.secret_key = 'secret_key'  # Replace with a strong secret key
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username=db.Column(db.String(150),nullable=False)
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.String(200))


    def __init__(self,username,email,password):
        self.username=username
        self.email=email
        self.password= bcrypt.hashpw(password.encode('utf-8'),bcrypt.gensalt()).decode('utf-8')


        def check_password(self,password):
            return bcrypt.checckpw(password.encode('utf-8').self.password.encode('uft-8'))
        
class Incident(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    incident_type = db.Column(db.String(100), nullable=False)
    severity = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=False)
    date_reported = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<Incident {self.id}>"



# Routes
@app.route('/')
def index():

    return render_template('index.html')




@app.route("/signup", methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username=request.form['username']
        email = request.form['email']
        password = request.form['password']
        confirm_password = request.form['confirm_password']

        # Check if passwords match
        if password != confirm_password:
            return render_template("index.html", error="Passwords do not match.")

        # Check if email already exists
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return render_template("index.html", error="Email already registered.")

        # Create a new user
        new_user = User(username=username ,email=email, password=password)
        db.session.add(new_user)
        db.session.commit()
        return redirect(url_for('login'))

    return render_template("main.html")


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        # Retrieve the user by email
        user = User.query.filter_by(email=email).first()

        # Validate the user and password
        if user and user.check_password(password):
            session['username'] = user.username
            return redirect('/main')
        else:
            return render_template('index.html', error="Invalid email or password.")

    return render_template("index.html")

@app.route('/main')
def main():

    return render_template("main.html")


@app.route('/about')
def about():
   return render_template("about.html")



@app.route('/dashboard')
def dashboard():
    return render_template("dashboard.html")
    


@app.route('/report', methods=['POST'])
def report():
    try:
        data = request.form  # Switch to request.json if using JSON
        incident_type = data['incident_type']
        severity = data['typeseverity']
        description = data['message']

        new_incident = Incident(
            incident_type=incident_type,
            severity=severity,
            description=description
        )

        db.session.add(new_incident)
        db.session.commit()

        return redirect(url_for('incident'))
    except KeyError:
        return "Missing fields in the submission.", 400
    except Exception as e:
        return f"An error occurred: {e}", 500





    

    
if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=2000)




