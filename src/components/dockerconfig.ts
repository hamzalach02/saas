export const dockerConfig = `
services:
  mysql:
    image: mysql:8.0
    container_name: mysql_container
    environment:
      MYSQL_DATABASE: spring_db
      MYSQL_USER: springuser
      MYSQL_PASSWORD: springpassword
      MYSQL_ROOT_PASSWORD: rootpassword
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
    networks:
      - spring_network

volumes:
  mysql_data:

networks:
  spring_network:`;