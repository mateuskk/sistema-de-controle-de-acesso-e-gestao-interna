from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_required,
    get_jwt_identity,
)
from models import db, User

bp = Blueprint("auth", __name__, url_prefix="/api/auth")


@bp.route("/login", methods=["POST"])
def login():
    data = request.json
    user = User.query.filter_by(email=data["email"], password=data["password"]).first()
    if not user:
        return jsonify({"msg": "Credenciais inválidas"}), 401
    access_token = create_access_token(
        identity=str(user.id), additional_claims={"role": user.role}
    )
    refresh_token = create_refresh_token(identity=str(user.id))
    return jsonify(
        token=access_token, refresh_token=refresh_token, role=user.role
    )


@bp.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    current_user = get_jwt_identity()
    
    user = User.query.get(int(current_user))
    access_token = create_access_token(
        identity=str(user.id), additional_claims={"role": user.role}
    )
    return jsonify(token=access_token)


@bp.route("/register", methods=["POST"])
def register():
    data = request.json
    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"msg": "Email já cadastrado"}), 400
    user = User(
        name=data["name"],
        email=data["email"],
        password=data["password"],
        role=data.get("role", "funcionario"),
    )
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg": "Usuário registrado com sucesso"})
