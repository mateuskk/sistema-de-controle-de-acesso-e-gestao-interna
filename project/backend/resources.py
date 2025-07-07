from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from models import db, Resource

bp = Blueprint('resources', __name__, url_prefix='/api/resources')

@bp.route('/', methods=['GET'])
@jwt_required()
def list_resources():
    resources = Resource.query.all()
    return jsonify([{
        'id': r.id,
        'name': r.name,
        'type': r.type,
        'description': r.description
    } for r in resources])

@bp.route('/', methods=['POST'])
@jwt_required()
def add_resource():
    claims = get_jwt()
    if claims.get('role') != 'admin':
        return jsonify({'msg': 'Acesso negado'}), 403
    data = request.json
    name = data.get('name', '').strip()
    type_ = data.get('type', '').strip()
    if not name or not isinstance(name, str):
        return jsonify({'msg': 'Nome do recurso inválido'}), 400
    if not type_ or not isinstance(type_, str):
        return jsonify({'msg': 'Tipo do recurso inválido'}), 400
    resource = Resource(
        name=name,
        type=type_,
        description=data.get('description', '')
    )
    db.session.add(resource)
    db.session.commit()
    return jsonify({'msg': 'Recurso adicionado'}), 201

@bp.route('/<int:resource_id>', methods=['DELETE'])
@jwt_required()
def delete_resource(resource_id):
    claims = get_jwt()
    if claims.get('role') != 'admin':
        return jsonify({'msg': 'Acesso negado'}), 403
    resource = Resource.query.get(resource_id)
    if not resource:
        return jsonify({'msg': 'Recurso não encontrado'}), 404
    db.session.delete(resource)
    db.session.commit()
    return jsonify({'msg': 'Recurso removido'})