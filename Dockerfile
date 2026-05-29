# Use a base image with Java 25 and Maven for building the application
FROM maven:3.9-eclipse-temurin-25 AS build

# Set the working directory
WORKDIR /app

# Copy the pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -Pproduction

# Copy the entire application source code
COPY . .

# Build the application with the production profile and create a JAR file
RUN mvn clean package -Pproduction -DskipTests

# Use a slim Java 25 image for the final application
FROM eclipse-temurin:25-jre-alpine

# Set the working directory
WORKDIR /app

# Copy the JAR file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the application port (default for Spring Boot is 8080)
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]