# Use a base image with Java and Maven for building the application
FROM maven:3.8-openjdk-17 AS build

# Set the working directory
WORKDIR /app

# Copy the pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -Pproduction

# Copy the rest of the application source code
COPY src ./src

# Build the application with the production profile and create a JAR file
RUN mvn clean package -Pproduction -DskipTests

# Use a slim Java image for the final application
FROM openjdk:17-slim

# Set the working directory
WORKDIR /app

# Copy the JAR file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the application port (default for Spring Boot is 8080)
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]