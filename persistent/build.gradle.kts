plugins {
    java
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
dependencies {

    testImplementation("org.junit.jupiter:junit-jupiter-api:5.6.3")
    testRuntimeOnly("org.junit.jupiter:junit-jupiter-engine")

    testImplementation("org.junit.jupiter:junit-jupiter-api:5.6.3")
    testRuntimeOnly("org.junit.jupiter:junit-jupiter-engine")

    implementation("com.google.flogger:flogger:0.1")
    implementation("com.google.flogger:flogger-system-backend:0.5.1")

    compileOnly("com.google.errorprone:error_prone_core:2.15.0")
    implementation("junit:junit:4.13.1")


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



// https://mvnrepository.com/artifact/com.fasterxml.jackson.core/jackson-databind
    implementation("com.fasterxml.jackson.core:jackson-databind:2.13.2.2")


    implementation("com.google.guava:guava:30.1.1-jre")
    testImplementation("com.google.guava:guava-testlib:31.1-jre")

    compileOnly("com.google.errorprone:error_prone_core:2.15.0")

    // https://mvnrepository.com/artifact/javax.validation/validation-api
    implementation("javax.validation:validation-api:2.0.0.Alpha1")

    // https://mvnrepository.com/artifact/com.google.truth/truth
    testImplementation("com.google.truth:truth:1.1.3")

    // https://mvnrepository.com/artifact/com.google.code.findbugs/jsr305
    implementation("com.google.code.findbugs:jsr305:3.0.2")



}



tasks.getByName<Test>("test") {
    useJUnitPlatform()
}

java {
    toolchain {
        languageVersion.set(JavaLanguageVersion.of(15))
    }
}