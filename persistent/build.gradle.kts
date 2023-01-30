import net.ltgt.gradle.errorprone.errorprone
plugins {
    application
    id("net.ltgt.errorprone")
}
group = "org.example"
version = "1.0-SNAPSHOT"


repositories {
    mavenCentral()
}
buildscript {

    repositories {
        maven {
            url = uri("https://plugins.gradle.org/m2/")
        }
    }

    dependencies {
        classpath("net.ltgt.gradle:gradle-errorprone-plugin:2.0.2")
    }

}
apply(plugin = "net.ltgt.errorprone")
dependencies {

    testImplementation("org.junit.jupiter:junit-jupiter-api:5.6.0")
    testRuntimeOnly("org.junit.jupiter:junit-jupiter-engine")

    // Logging libs
    implementation("com.google.flogger:flogger:0.1")
    implementation("com.google.flogger:flogger-system-backend:0.5.1")


    // https://mvnrepository.com/artifact/org.json/json
    implementation("org.json:json:20160810")

    // https://mvnrepository.com/artifact/com.google.code.gson/gson
    implementation("com.google.code.gson:gson:2.8.5")

// https://mvnrepository.com/artifact/com.googlecode.json-simple/json-simple
    implementation("com.googlecode.json-simple:json-simple:1.1.1")

    // https://mvnrepository.com/artifact/com.fasterxml.jackson.core/jackson-core
    implementation("com.fasterxml.jackson.core:jackson-core:2.13.2")

// https://mvnrepository.com/artifact/com.fasterxml.jackson.core/jackson-databind
    implementation("com.fasterxml.jackson.core:jackson-databind:2.13.2.2")


    implementation("com.google.guava:guava:25.0-jre")
    testImplementation("com.google.guava:guava-testlib:25.0-jre")

    compileOnly("com.google.errorprone:error_prone_core:2.15.0")

    // https://mvnrepository.com/artifact/javax.validation/validation-api
    implementation("javax.validation:validation-api:2.0.0.Alpha1")

    // https://mvnrepository.com/artifact/com.google.truth/truth
    testImplementation("com.google.truth:truth:1.1.3")

    // https://mvnrepository.com/artifact/com.google.code.findbugs/jsr305
    implementation("com.google.code.findbugs:jsr305:3.0.2")

    // https://mvnrepository.com/artifact/mysql/mysql-connector-java
    implementation("mysql:mysql-connector-java:8.0.30")

// https://mvnrepository.com/artifact/org.junit.jupiter/junit-jupiter-params
    testImplementation("org.junit.jupiter:junit-jupiter-params:5.8.2")
// https://mvnrepository.com/artifact/commons-io/commons-io
    implementation("commons-io:commons-io:2.11.0")


}

tasks.withType<JavaCompile>().configureEach {
    options.errorprone.disableWarningsInGeneratedCode.set(true)
}

tasks.named<JavaCompile>("compileTestJava") {
    options.errorprone.isEnabled.set(false)
}


tasks.getByName<Test>("test") {
    useJUnitPlatform()
}

java {
    toolchain {
        languageVersion.set(JavaLanguageVersion.of(15))
    }
}
