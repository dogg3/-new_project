## Use the python3.7.2 container image
FROM python:3.7

#
#
###Copy all =the pipfiles
COPY Pip* ./
#


###install pipenv
##System install to system not virtaul env
##Deploy check that the pipfile matches with the lock
##Ignore pipfile looks at the lock file and ignores the exact specified packagtes
##Therefreo it is important to ahve the same python version when pipenv install on localhost
RUN  pip install --upgrade pip && \
     pip install pipenv && \
     pipenv install --dev --system --deploy --ignore-pipfile


#
###Set working director
WORKDIR /app
#
ADD . ./
#
#EXPOSE 3031
#
CMD ["uwsgi", "app.ini"]
