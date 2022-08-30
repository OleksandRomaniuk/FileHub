package service;



import entities.File;
import entities.SecurityToken;
import entities.tinytype.FileID;
import entities.tinytype.SecurityTokenId;
import entities.tinytype.UserID;

import javax.naming.NoPermissionException;
import java.io.InputStream;
import java.util.Collection;

public interface FileStorageService {



    void uploadFile(SecurityTokenId securityTokenId, String fileName, InputStream inputStream) throws NoPermissionException;

    Collection<File> browseUsersFiles (SecurityToken securityToken, UserID userID) throws NoPermissionException;

    InputStream downloadFile(SecurityToken securityToken, FileID fileID) throws NoPermissionException;

    void deleteFile(SecurityToken securityToken, FileID fileID) throws NoPermissionException;
}
