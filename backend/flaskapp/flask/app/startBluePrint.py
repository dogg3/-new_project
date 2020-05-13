
from flask import (
Blueprint, flash, g, redirect, render_template, request, session, url_for
)

#defining the blueprint
bp = Blueprint('blog', __name__, url_prefix='/')


@bp.route('/')
def index():
    return render_template('base.html')



@bp.route('/analysis')
def analysis():
    return render_template('documentation.html')


@bp.route('/api-doc')
def doc():
    return render_template('documentation.html')



