package service.impl;


import entities.File;
import entities.SecurityToken;
import entities.tinytype.FileID;
import entities.tinytype.SecurityTokenId;
import entities.tinytype.UserID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import reposirory.impl.FileRepository;
import service.FileStorageService;

import javax.naming.NoPermissionException;
import java.io.InputStream;
import java.util.Collection;


public class FileStorageServiceImpl implements FileStorageService {

    private static final Logger log = LoggerFactory.getLogger(FileStorageServiceImpl.class);

    private final FileRepository fileRepository;

    public FileStorageServiceImpl(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }


    @Override
    public void uploadFile(SecurityTokenId securityToken, String fileName, InputStream fileContent) throws NoPermissionException {

        fileRepository.uploadFile(securityToken, fileName, fileContent);

    }

    @Override
    public Collection<File> browseUsersFiles(SecurityToken securityToken, UserID userID) throws NoPermissionException {

        return null;
    }

    @Override
    public InputStream downloadFile(SecurityToken securityToken, FileID fileID) throws NoPermissionException {

        return null;
    }

    @Override
    public void deleteFile(SecurityToken securityToken, FileID fileID) throws NoPermissionException {


    }
}
