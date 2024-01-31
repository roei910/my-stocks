# Use an official base image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN apt-get update && apt-get upgrade
RUN apt-get install -y nano

# Install dependencies
# RUN pip3 install --no-cache-dir -r requirements.txt

# Make ports to the world outside this container
EXPOSE 3000:3000

# Define environment variable
ENV NAME my-app

# Run app.py when the container launches
# CMD ["python3", "app.py"]
CMD 'bash'

# need to run:
# docker run -it -p 3000:3000 image_name 
