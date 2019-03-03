# Pull base image
FROM python:3.7

# # Install Python 3.6
# RUN apt-get update
# RUN apt-get install -y cron
# RUN apt-get install -y python3.6 python3.6-dev python3-pip && rm -rf /var/lib/apt/lists/*
# ENV PYTHONUNBUFFERED 1

# Import code and pip install
RUN mkdir /code
WORKDIR /code
ADD requirements.txt /code/
RUN pip3 install -r requirements.txt
# ADD . /code/
# ADD ./secrets/service_creds.json /secrets/service_creds.json
ADD ./config/databaseconfig /config/databaseconfig

# COPY startup script into known file location in container
# COPY start.sh /start.sh
# RUN chmod 0644 /start.sh
# done!


# if on mac, run: "VBoxManage controlvm "<machine name>" natpf1 "tcp-port8000,tcp,,8000,,8000"; "