from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required
from models import User, Resource

bp = Blueprint('dashboard', __name__, url_prefix='/api/dashboard')

@bp.route('/', methods=['GET'])
@jwt_required()
def dashboard_data():
    users_count = User.query.count()
    resources_count = Resource.query.count()
    return jsonify({
        'total_users': users_count,
        'total_resources': resources_count
    })