

group = "org.example"
version = "1.0-SNAPSHOT"


plugins {
    java
    id("net.ltgt.errorprone") version "2.0.2"
}
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
    testImplementation("org.junit.jupiter:junit-jupiter-api:5.6.0")
    testRuntimeOnly("org.junit.jupiter:junit-jupiter-engine")

    implementation("com.google.flogger:flogger:0.1")
    implementation("com.google.flogger:flogger-system-backend:0.5.1")

    compileOnly("com.google.errorprone:error_prone_core:2.15.0")

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