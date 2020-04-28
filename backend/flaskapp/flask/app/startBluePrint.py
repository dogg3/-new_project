import functools

from flask import (
Blueprint, flash, g, redirect, render_template, request, session, url_for
)

#defining the blueprint
bp = Blueprint('blog', __name__, url_prefix='/')


@bp.route('/')
def index():
    return render_template('base.html')


