package reposirory.impl;



import entities.File;
import entities.SecurityToken;
import entities.tinytype.FileID;
import entities.tinytype.SecurityTokenId;
import entities.tinytype.UserID;

import javax.naming.NoPermissionException;
import java.io.InputStream;
import java.util.Collection;

/**
 * Interface of the service that manages File entities
 */
public interface FileRepository {


    void uploadFile(SecurityTokenId securityTokenid, String name, InputStream fileContent) throws NoPermissionException;


    File findFileByID(FileID id);

    Collection<File> browseFiles(SecurityToken securityToken, UserID userId) throws NoPermissionException;

    InputStream downloadFile(SecurityToken securityToken, FileID fileID) throws NoPermissionException;

    void deleteFile(SecurityToken securityToken ,  FileID fileID) throws NoPermissionException;
}
