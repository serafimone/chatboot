cd ..
mvn clean package -DskipTests
docker build -t chatboot:1.0 .