/*

  readFile(path[, options])
  // better than readFile cause readFile uses buffer thus requires more memory
  createReadStream(path[, options])

  writeFile(file, data[, options])
  // better than writeFile cause readFile uses buffer thus requires more memory
  createWriteStream(path[, options])

  // append data to a file, and will create if the file are not existed
  appendFile(path, data[, options])

  // copy file, if the file already existed, it will be overwritten
  copyFile(src, dest[, flags])

  // read information about a file, ex: file size, time related data (date created, date modified)
  stat(path[, options])

  // user permission of a file, changing the permission or even the owner
  access(path[, mode]), chmod(path, mode), chown(path, uid, gid)

  // link and unlink a file
  link(existingPath, newPath), unlink(path)

  // truncate a file
  truncate(path[, len])

  // work with directories
  mkdir(path[, mode]) // make directory
  readdir(path[, options]) // read directory
  rmdir(path) // remove directory
  rename(oldPath, newPath) // rename directory

*/
