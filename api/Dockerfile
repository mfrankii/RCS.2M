FROM python:3.11
WORKDIR /code
COPY requirements.txt /code/requirements.txt
RUN pip3 install -r /code/requirements.txt

COPY ./ssl/RCS.2M.crt /ssl/RCS.2M.crt
COPY ./ssl/RCS.2M.key /ssl/RCS.2M.key

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "443", "--ssl-keyfile", "/ssl/RCS.2M.key", "--ssl-certfile", "/ssl/RCS.2M.crt", "--reload"]