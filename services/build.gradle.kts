import com.github.gradle.node.npm.task.NpmTask
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
        dependencies {
            classpath("com.github.node-gradle:gradle-node-plugin:3.5.1")
            classpath("net.ltgt.gradle:gradle-errorprone-plugin:2.0.2")
        }
    }

}
apply(plugin = "net.ltgt.errorprone")
dependencies {

    testImplementation("org.junit.jupiter:junit-jupiter-api:5.6.0")
    testRuntimeOnly("org.junit.jupiter:junit-jupiter-engine")

    testImplementation("org.junit.jupiter:junit-jupiter-api:5.6.0")
    testRuntimeOnly("org.junit.jupiter:junit-jupiter-engine")

    implementation("com.google.flogger:flogger:0.1")
    implementation("com.google.flogger:flogger-system-backend:0.5.1")

    compileOnly("com.google.errorprone:error_prone_core:2.9.0")
    implementation("junit:junit:4.13.1")
    implementation("junit:junit:4.13.1")

    testImplementation("org.junit.jupiter:junit-jupiter-engine:5.9.1")

    implementation(project(":Persistent"))

    implementation("commons-io:commons-io:2.4")

    implementation("com.googlecode.json-simple:json-simple:1.1.1")

    implementation("org.json:json:20160810")

    implementation("com.google.code.gson:gson:2.8.5")

    implementation("com.googlecode.json-simple:json-simple:1.1.1")

    implementation("com.google.guava:guava:30.1.1-jre")
    testImplementation("com.google.guava:guava-testlib:31.1-jre")

    implementation("javax.validation:validation-api:2.0.1.Final")

    implementation("io.jsonwebtoken:jjwt:0.9.1")

    implementation("javax.xml.bind:jaxb-api:2.3.1")

    testImplementation("com.google.truth:truth:1.1.3")

    implementation("com.google.code.findbugs:jsr305:3.0.2")

    testImplementation("org.mockito:mockito-core:4.10.0")
}

tasks.getByName<Test>("test") {
    useJUnitPlatform()
}
tasks.named<JavaCompile>("compileTestJava") {
    options.errorprone.isEnabled.set(false)
}

java {
    toolchain {
        languageVersion.set(JavaLanguageVersion.of(15))
    }
}
