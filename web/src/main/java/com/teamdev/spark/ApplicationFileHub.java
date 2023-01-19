package com.teamdev.spark;


import com.teamdev.filehub.resourse.ApplicationContextJDBC;
import spark.ModelAndView;
import spark.template.mustache.MustacheTemplateEngine;

import java.util.HashMap;
import java.util.Map;

import static spark.Spark.*;

public class ApplicationFileHub {

    public static void main(String[] args) {
        final ApplicationContextJDBC context = new ApplicationContextJDBC();
        port(4000);
        staticFiles.location("/js-app/dist");

        get("/", (req, res) -> render(new HashMap<>(), "index.html"));

        post("/api/login", new AuthorizationRoute(context.getUserAuthenticationProcess()));
        post("/api/register", new RegistrationRoute(context.getUserRegistrationProcess()));



    }

    private static String render(Map<String, Object> model, String templatePath) {
        return new MustacheTemplateEngine().render(new ModelAndView(model, templatePath));
    }
}