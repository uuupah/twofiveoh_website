## notes

 - 22.1.6 npm start throws error ```Error: ENOSPC: System limit for number of file watchers reached``` this is apparently just a linux issue. 
 trying: 
 ```sudo gedit /etc/sysctl.conf```
 then appending ```fs.inotify.max_user_watches=524288```, saving and exiting.

 - 22.1.7 bringing the data in without a back end server is going to be a pain because: 
     - a prebuilt dataset with the imdb id, episode index and list index will need to be constructed
        - its not very programmer but im considering using csv for this because it'll be modifiable in excel and result in the simplest syntax
     - data cannot be updated live
        - this can be combatted by 'greying out' episodes that are not current yet; the episode release date can be calculated by: 0/1/2021 + (actual index * 7 in days)
        - with this method updates would only need to occur for super extra bonus episodes (like the bethany whitmore interview), adding ids for bonus episodes, and adding extra info for anniversary episodes
     - 