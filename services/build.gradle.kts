import net.ltgt.gradle.errorprone.errorprone

plugins {
    application
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

apply(plugin = "net.ltgt.errorprone")

dependencies {
    // Use JUnit Jupiter for testing.
    testImplementation("org.junit.jupiter:junit-jupiter:5.8.2")

    // This dependency is used by the application.
    testImplementation("com.google.guava:guava-testlib:31.1-jre")
    implementation("com.google.guava:guava:31.1-jre")
    implementation(project(":persistent"))
    compileOnly("com.google.errorprone:error_prone_core:2.15.0")
    implementation("org.slf4j:slf4j-api:2.0.0-alpha7")



//    implementation(project(":calculator"))
    testImplementation("org.junit.jupiter:junit-jupiter:5.8.1")
    testImplementation("com.google.guava:guava-testlib:31.1-jre")
    testImplementation("org.slf4j:slf4j-log4j12:2.0.0-alpha7")
    // Logging libs
    implementation("com.google.flogger:flogger:0.7.4")
    implementation("com.google.flogger:flogger-log4j2-backend:0.7.4")
}

application {
    // Define the main class for the application.
    mainClass.set("filehub.App")
}

tasks.named<Test>("test") {
    // Use JUnit Platform for unit tests.
    useJUnitPlatform()
}

tasks.withType<JavaCompile>().configureEach {
    options.errorprone.disableWarningsInGeneratedCode.set(true)
}

tasks.named<JavaCompile>("compileTestJava") {
    options.errorprone.isEnabled.set(false)
}
