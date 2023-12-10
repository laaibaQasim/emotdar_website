import os


def join_path(path: str) -> str:
    return os.path.join(os.path.dirname(os.path.abspath(__file__)), path)
