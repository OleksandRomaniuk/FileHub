package com.teamdev.filehub.getdata.user;

import com.google.common.base.Preconditions;
import com.teamdev.filehub.dto.UserInfo;
import com.teamdev.filehub.record.FolderRecord;
import com.teamdev.filehub.record.UserRecord;
import com.teamdev.filehub.repository.FolderDao;
import com.teamdev.filehub.repository.UserDao;

import java.util.Optional;

/**
 * The implementation of {@link GetUserView} for get information about user email.
 */
public class GetUserDataView implements GetUserView {

    private final UserDao userDao;

    private final FolderDao folderDao;

    public GetUserDataView(UserDao userDao, FolderDao folderDao) {
        this.userDao = Preconditions.checkNotNull(userDao);
        this.folderDao = folderDao;
    }

    @Override
    public Optional<UserInfo> run(GetUserDataQuery query) {

        Optional<UserRecord> userRecord = userDao.read(query.userId());

        UserInfo userInfo = null;

        if (userRecord.isPresent()) {

            UserRecord user = userRecord.get();
            FolderRecord userRootFolder = folderDao.findUserRootFolder(user.getId());
            userInfo = new UserInfo(user.getEmail(), userRootFolder.getId().getId());

        }

        return Optional.ofNullable(userInfo);
    }
}
