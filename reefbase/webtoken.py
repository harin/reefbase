from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity

blacklist = set()

def init_jwt(app):

    app.config['JWT_BLACKLIST_ENABLED'] = True

    jwt = JWTManager(app)

    @jwt.token_in_blacklist_loader
    def check_if_token_in_blacklist(decrypted_token):
        jti = decrypted_token['jti']
        return jti in blacklist
        