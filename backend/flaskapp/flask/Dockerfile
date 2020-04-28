## Use the python3.7.2 container image
FROM python:3.6-stretch



##Copy all =the pipfiles
COPY Pip* ./

##install pipenv
RUN  pip install --upgrade pip && \
     pip install pipenv && \
     pipenv install --system --deploy --ignore-pipfile

##Set working director
WORKDIR /app

ADD . ./

EXPOSE 3031

CMD ["uwsgi", "app.ini"]
