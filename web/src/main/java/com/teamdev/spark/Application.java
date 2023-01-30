package com.teamdev.spark;


import com.teamdev.filehub.resourse.ApplicationContext;
import com.teamdev.filehub.resourse.ApplicationContextJDBC;
import spark.ModelAndView;
import spark.template.mustache.MustacheTemplateEngine;

import java.util.HashMap;
import java.util.Map;

import static spark.Spark.*;

/**
 * Entry point to FileHub application
 */
public class Application {

    public static void main(String[] args) {
        final ApplicationContext context = new ApplicationContextJDBC();
        port(3456);
        staticFiles.location("/js-app/dist");

        get("/", (req, res) -> render(new HashMap<>(), "index.html"));

        post("/api/login", new AuthorizationRoute(context.getUserAuthenticationProcess()));
        post("/api/register", new RegistrationRoute(context.getUserRegistrationProcess()));

        get("/api/user", new UserRoute(context.getAuthenticatedView(), context.getUserView()));

        get("/api/folders/:folderId", new FolderRoute(
                context.getAuthenticatedView(),
                context.getFolderView()));

        get("/api/folders/:folderId/content", new FolderContentRoute(
                context.getAuthenticatedView(),
                context.getFolderContentView()));

        get("/api/folders/:folderId/content/:name", new SearchRoute(
                context.getAuthenticatedView(),
                context.getFolderContentByNameView()));

        post("/api/folders", new CreateNewFolderRoute(
                context.getAuthenticatedView(),
                context.getCreateFolderProcess()));

        post("/api/folder/:folderId/content", new UploadFilesRoute(
                context.getAuthenticatedView(),
                context.getSaveFileProcess()));

        put("api/folder/:folderId", new RenameFolderRoute(
                context.getAuthenticatedView(),
                context.getRenamingFolderProcess()));

        delete("api/file/:fileId", new DeleteFileRoute(
                context.getAuthenticatedView(),
                context.getDeleteFileProcess()));

        delete("api/folder/:folderId", new DeleteFolderRoute(
                context.getAuthenticatedView(),
                context.getDeleteFolderProcess()));

        post("api/logout", new LogoutRoute(
                context.getAuthenticatedView(),
                context.getLogOutProcess()));

        get("api/files/:id", new DownloadFileRoute(
                context.getAuthenticatedView(),
                context.getDownloadView()));

        put("api/file/:fileId", new RenameFileRoute(
                context.getAuthenticatedView(),
                context.getRenamingFileProcess()));

    }

    private static String render(Map<String, Object> model, String templatePath) {
        return new MustacheTemplateEngine().render(new ModelAndView(model, templatePath));
    }
}
