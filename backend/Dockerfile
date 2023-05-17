# Use an official Python runtime as a parent image
FROM python:3.10

# Set the working directory to /app
WORKDIR /app

# Copy the requirements file to the working directory
COPY requirements.txt ./

# Install dependencies
RUN pip install -r requirements.txt
RUN pip install "PyJWT==1.7.1"
RUN pip install "PyJWT==2.1.0"
# Copy the remaining app files to the working directory
COPY . .

# Set environment variables
ENV FLASK_APP=app.py
ENV FLASK_ENV=production
ENV FLASK_DEBUG=0
ENV PORT=5000

# Expose port 5000
EXPOSE 5000

# Start the Flask app
CMD ["flask", "run", "--host=0.0.0.0"]
