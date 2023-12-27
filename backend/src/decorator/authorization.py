from http import HTTPStatus

from flask import g, request

from helper.response import failure
from model.contributor import Contributor


def auth(*values):
    """
    Authorize user by decoding token

    Args:
        f: Function

    Raises:
        Unauthorized: Authorization Missing.
        Unauthorized: Invalid Token.
        Unauthorized: Unauthorized user.

    Returns:
        Decorated function
    """

    def wraps(f):
        def decoder_wrapper_function(*args, **kwargs):
            g.user = None
            authorization = request.headers.get("Authorization", "")
            if not authorization:
                return failure("UNAUTHORIZED"), HTTPStatus.UNAUTHORIZED
            roll_number = authorization.split("Basic ")[1]
            contributor = Contributor.get_by_roll_number(roll_number)
            if not contributor:
                return failure("UNAUTHORIZED"), HTTPStatus.UNAUTHORIZED
            g.contributor = contributor
            return f(*args, **kwargs)

        return decoder_wrapper_function

    if len(values) and hasattr(values[0], "__call__"):
        f = values[0]
        values = []
        return wraps(f)
    return wraps
