import com.github.gradle.node.npm.task.NpmTask

        plugins {
            java
            id("com.github.node-gradle.node") version "3.5.1"
        }

java {
    toolchain {
        languageVersion.set(JavaLanguageVersion.of(15))
    }
}

node {
    download.set(false)
    npmVersion.set("")
    nodeProjectDir.set(file("${project.projectDir}/src/main/resources/js-app"))
    workDir.set(file("${project.projectDir}/src/main/resources/js-app"))
    npmWorkDir.set(file("${project.projectDir}/src/main/resources/js-app"))
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
        classpath("com.github.node-gradle:gradle-node-plugin:3.5.1")
    }
}

apply(plugin = "com.github.node-gradle.node")

dependencies {
    testImplementation("org.junit.jupiter:junit-jupiter-api:5.9.0")
    testRuntimeOnly("org.junit.jupiter:junit-jupiter-engine")

    implementation("com.sparkjava:spark-core:2.9.4")

    implementation("com.sparkjava:spark-template-mustache:2.7.1")

    implementation("org.slf4j:slf4j-api:2.0.5")
    implementation("org.slf4j:slf4j-log4j12:2.0.5")

    implementation("com.google.code.gson:gson:2.10")

    implementation("com.sparkjava:spark-template-velocity:2.7.1")

    implementation(project(":Persistent"))
    implementation(project(":Services"))
    testImplementation("com.google.truth:truth:1.1.3")
    testImplementation("org.mockito:mockito-core:4.10.0")
    // Logging libs
    implementation("com.google.flogger:flogger:0.7.4")
    implementation("com.google.flogger:flogger-system-backend:0.7.4")
}

tasks.getByName<Test>("test") {
    useJUnitPlatform()
}

tasks.register<NpmTask>("buildNpm") {
    dependsOn(tasks.npmInstall)
    npmCommand.set(listOf("run", "build"))
}

tasks.register<JavaExec>("runApplication") {
    dependsOn("buildNpm")
    mainClass.set("com.teamdev.spark.ApplicationFileHub")
    classpath = sourceSets["main"].runtimeClasspath
}
