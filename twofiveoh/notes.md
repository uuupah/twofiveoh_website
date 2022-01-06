## notes

 - 22.1.6 npm start throws error ```Error: ENOSPC: System limit for number of file watchers reached``` this is apparently just a linux issue. 
 trying: 
 ```sudo gedit /etc/sysctl.conf```
 then appending ```fs.inotify.max_user_watches=524288```, saving and exiting.