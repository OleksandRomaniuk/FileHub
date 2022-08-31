package com.teamdev.util;

import java.lang.reflect.Array;
import java.util.Arrays;

public class GeneratorUserFile {


    public static String generateFileName(String userId) {

        String replace = userId.replace("@", "").replace(".", "");

        return replace;
    }

    public static String generateFileId(String idOfowner,  String path, String name) {

        idOfowner = generateFileName(idOfowner);

        path = path.replace("\\", "_");

        String sum = idOfowner + "_" + path + "_" + name;

        String result = sum.replace("__", "_");


        return result;
    }

}
