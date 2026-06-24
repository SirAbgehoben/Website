# Use a base image with Java 25 and Maven for building the application
FROM maven:3.9-eclipse-temurin-25 AS build

# Set the working directory
WORKDIR /app

# Copy the pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the entire application source code
COPY . .

# Build the application with the production profile and create a JAR file
RUN mvn clean package -Dmaven.test.skip=true

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

RUN apk add --no-cache curl

HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:8080/health || exit 1