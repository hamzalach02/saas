export const  applicationPropertiesContent = `
# MySQL Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/spring_db
spring.datasource.username=springuser
spring.datasource.password=springpassword
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect


        `;