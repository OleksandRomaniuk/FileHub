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
    testImplementation("org.junit.jupiter:junit-jupiter-api:5.6.3")
    testRuntimeOnly("org.junit.jupiter:junit-jupiter-engine")

    testImplementation("org.junit.jupiter:junit-jupiter-api:5.6.3")
    testRuntimeOnly("org.junit.jupiter:junit-jupiter-engine")

    implementation("com.google.flogger:flogger:0.1")
    implementation("com.google.flogger:flogger-system-backend:0.5.1")

    compileOnly("com.google.errorprone:error_prone_core:2.15.0")
    implementation("junit:junit:4.13.1")
    implementation("junit:junit:4.13.1")

    implementation(project(":persistent"))

    // https://mvnrepository.com/artifact/commons-io/commons-io
    implementation("commons-io:commons-io:2.4")

    // https://mvnrepository.com/artifact/com.googlecode.json-simple/json-simple
    implementation("com.googlecode.json-simple:json-simple:1.1.1")

    // https://mvnrepository.com/artifact/org.json/json
    implementation("org.json:json:20160810")

    // https://mvnrepository.com/artifact/com.google.code.gson/gson
    implementation("com.google.code.gson:gson:2.8.5")

// https://mvnrepository.com/artifact/com.googlecode.json-simple/json-simple
    implementation("com.googlecode.json-simple:json-simple:1.1.1")

    implementation("com.google.guava:guava:30.1.1-jre")
    testImplementation("com.google.guava:guava-testlib:31.1-jre")

    implementation("javax.validation:validation-api:2.0.1.Final")

    implementation("io.jsonwebtoken:jjwt:0.9.1")

    implementation("javax.xml.bind:jaxb-api:2.3.1")

    // https://mvnrepository.com/artifact/com.google.truth/truth
    testImplementation("com.google.truth:truth:1.1.3")

    // https://mvnrepository.com/artifact/com.google.code.findbugs/jsr305
    implementation("com.google.code.findbugs:jsr305:3.0.2")
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
