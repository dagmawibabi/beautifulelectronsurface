// Update the top bar's time
function updateTime(){
    let desktopTime = document.getElementById("desktopTime");
    desktopTime.innerText = new Date().toString().slice(16,25);
}
let updateTimeVar = setInterval(updateTime,1000);

//Toggle the top bar on or off
function show(e){
    let desktopTopBar = document.getElementById("desktopTopBar");
    if(e.clientY <= 40){
        desktopTopBar.style.display = "flex";
        desktopTopBar.style.animation = "none";
        desktopTopBar.style.animationDuration = "0s";
    } else {
        /*desktopTopBar.style.animation = "gentlyHideTopBar";
        desktopTopBar.style.animationDuration = "3s";
        desktopTopBar.style.animationPlayState = "running";*/
        desktopTopBar.display = "none";
    }
}
document.addEventListener("pointermove",show);

//Display files on desktop
let desktopFilesList = [];
//Add 50 folders for debugging
for (var i = 0; i < 51; i++) {
    desktopFilesList.push(i);
}
function displayDesktopFiles(){
    //Determine files container width
    let filesPerHeight = (screen.availHeight * 0.88) / 58; // 0.79 is desktopFilesContainer's %height , 58 is folder size  
    //let filesPerHeight = (screen.availHeight * 0.79) / 68.256;//69.12; 
    //! Total ROWS = Complete ROWS + Remaining ROWS 
    let desktopFilesContainerWidth = ( Math.floor((desktopFilesList.length / filesPerHeight)) + (desktopFilesList.length % filesPerHeight) ) * (30); //84 is folder height
    //If the list of files is beyond the screen, have a fixed value
    if(desktopFilesContainerWidth > screen.width){
        desktopFilesContainer.style.width = screen.width - 14 + "px";
        desktopFilesContainer.style.borderRight = "4px dotted rgb(33, 119, 204)";
        desktopFilesContainer.style.borderLeft = "4px dotted rgb(33, 119, 204)";
    } else {
        desktopFilesContainer.style.width = desktopFilesContainerWidth + "px";
    }
    //let desktopFilesContainer = document.getElementById("desktopFilesContainer");
    /*
    ! Determine how many files fit in the files container height
    ! Then for ever extra
    let columnNum = 1; 
    let filesPerColumn = Math.ceil((screen.availHeight * 0.88) / 58); //Container height divided by each folder height
    let totColumnNum = (desktopFilesList.length / filesPerColumn) + (desktopFilesList.length % filesPerColumn);
    desktopFilesContainer.style.width = (totColumnNum * 86) + "px";

    console.log(desktopFilesList.length,filesPerColumn,totColumnNum)
    console.log(desktopFilesList.length % filesPerColumn)*/

    for (var i = 1; i <= desktopFilesList.length; i++){
        /* Create the file and display it */
        let eachFileContainer = document.createElement("div");
        eachFileContainer.className = "eachFileContainer";
        let fileIcon = document.createElement("div");
        fileIcon.className = "fileIcon";
        let fileIcon1 = document.createElement("div");
        fileIcon1.className = "fileIcon1";
        let fileIcon2 = document.createElement("div");
        fileIcon2.className = "fileIcon2";    
        let fileName = document.createElement("div");
        fileName.className = "fileName";
        let curFileName = document.createElement("h6");
        curFileName.className = "fileName";
        curFileName.innerText = i; // Fill the file name
        eachFileContainer.appendChild(fileIcon);
        fileIcon.appendChild(fileIcon1);
        fileIcon.appendChild(fileIcon2);
        fileIcon2.appendChild(curFileName); //Folder name inside the folder icon
        //eachFileContainer.appendChild(fileName); // Folder name below
        //fileName.appendChild(curFileName);       // The folder icon
        desktopFilesContainer.appendChild(eachFileContainer);
    }
}
if (JSON.parse(users)[0]["preferences"]["showDesktopIcons"] == true){
    desktopFilesContainer.style.display = "flex";
    displayDesktopFiles();
} else {
    desktopFilesContainer.style.display = "none";
}

//User profile
let topBarLeftContainer = document.getElementById("topBarLeftContainer");
topBarLeftContainer.addEventListener("click",showUserProfile);
function showUserProfile(){
    let userProfileContainer = document.getElementById("userProfileContainer");
    userProfileContainer.style.display = "flex";
    let userProfilePic = document.getElementById("userProfilePic");
    userProfilePic.src = JSON.parse(users)[0]["userProfilePic"];
    /*let topBarLeftContainer = document.getElementById("topBarLeftContainer"); // This is 
    topBarLeftContainer.style.visibility = "hidden";*/                          // An Option
    let topBarLeftContainer = document.getElementById("topBarLeftContainer"); // This is 
    topBarLeftContainer.style.justifyContent = "center";                        // An Option
}

/* User Profile Music Player */
let curSong = new Audio();
let audioSrc;
let curSongContainer;
let curSongPlaying;
let curSongMuted;
let curSongRepeat;
function loadUserProfileMusicQueue(){
    //Music Icon Hover Effect
    function userProfileMusicPlayerMouseEnter(e){
        e.path[0]["children"][0].src = "../Images/musicIcon2.png";
    }
    function userProfileMusicPlayerMouseLeave(e){
        e.path[0]["children"][0].src = "../Images/musicIcon1.png";
    }
    //Update seeker
    function updateSeekerStartAndEndTime(){
        function seek(){
            curSong.removeEventListener("timeupdate",updateSeekerStartAndEndTime);
            curSong.currentTime = userProfileMusicSeeker.value;
            curSong.addEventListener("timeupdate",updateSeekerStartAndEndTime);
        }
        let userProfileMusicSeekerStart = document.getElementById("userProfileMusicSeekerStart");
        let userProfileMusicSeeker = document.getElementById("userProfileMusicSeeker");
        let userProfileMusicSeekerEnd = document.getElementById("userProfileMusicSeekerEnd");
        let currentTime = [Math.floor(curSong.currentTime/60),Math.floor(curSong.currentTime%60)];
        let duration = [Math.floor(curSong.duration/60),Math.floor(curSong.duration%60)];
        //Adjust for Zeros for the current time
        let currentTimeM;
        let currentTimeS;
        if (currentTime[0] < 10){
            currentTimeM = "0" + currentTime[0];
        } else {
            currentTimeM = currentTime[0]
        }
        if (currentTime[1] < 10) {
            currentTimeS = "0" + currentTime[1];
        } else {
            currentTimeS = currentTime[1]
        }
        //Adjust for Zeros for the duration
        let durationM;
        let durationS;
        if (duration[0] < 10){
            durationM = "0" + duration[0];
        } else {
            durationM = duration[0]
        }
        if (duration[1] < 10) {
            durationS = "0" + duration[1];
        } else {
            durationS = duration[1]
        }
        userProfileMusicSeekerStart.innerText = currentTimeM + ":" + currentTimeS;
        userProfileMusicSeekerEnd.innerText = durationM + ":" + durationS;    
        userProfileMusicSeeker.value = Math.floor(curSong.currentTime);
        userProfileMusicSeeker.max = Math.floor(curSong.duration);
        userProfileMusicSeeker.addEventListener("change",seek);
    }
    //Update Volume
    let userProfileMusicVolumeSeeker = document.getElementById("userProfileMusicVolumeSeeker");
    let userProfileMusicVolumeValue = document.getElementById("userProfileMusicVolumeValue");
    userProfileMusicVolumeSeeker.addEventListener("change",updateVolumeSeeker);
    function updateVolumeSeeker(){
        curSong.volume = userProfileMusicVolumeSeeker.value / 100;
        userProfileMusicVolumeValue.innerText = userProfileMusicVolumeSeeker.value;
    } 
    //Change the pause play state
    function userProfileMusicPlayerPausePlay(){
        let userProfileMusicButtonsPausePlay = document.getElementsByClassName("userProfileMusicButtons")[0];
        if(curSongPlaying){
            curSong.pause();
            curSongPlaying = false;
            userProfileMusicButtonsPausePlay.innerText = "Play";
        } else {
            curSong.play();
            curSongPlaying = true;
            userProfileMusicButtonsPausePlay.innerText = "Pause";
        }
    }
    //Change the mute state
    function userProfileMusicPlayerMuteUnMute(){
        let userProfileMusicButtonsMute = document.getElementsByClassName("userProfileMusicButtons")[1];
        if(!curSongMuted){
            curSong.muted = true;
            curSongMuted = true;
            userProfileMusicButtonsMute.innerText = "Unmute";
        } else {
            curSong.muted = false;
            curSongMuted = false;
            userProfileMusicButtonsMute.innerText = "Mute";
        }
    }
    //Change the repeat state
    function userProfileMusicPlayerRepeat(){
        let userProfileMusicButtonsMute = document.getElementsByClassName("userProfileMusicButtons")[2];
        if(!curSongRepeat){
            curSong.loop = true;
            curSongRepeat = true;
            userProfileMusicButtonsMute.innerText = "Repeat: ON";
        } else {
            curSong.loop = false;
            curSongRepeat = false;
            userProfileMusicButtonsMute.innerText = "Repeat: OFF";
        }
    }
    //Load and play chosen music
    function userProfileMusicPlayerLoadMusic(e){
        //Adjust for when the user clicks the music icon or the H1
        if (curSongContainer != undefined){
            curSongContainer.addEventListener("mouseenter",userProfileMusicPlayerMouseEnter);
            curSongContainer.addEventListener("mouseleave",userProfileMusicPlayerMouseLeave);
        }
        try {
            curSongContainer = e.path[0];
            e.path[0].removeEventListener("mouseenter",userProfileMusicPlayerMouseEnter);
            e.path[0].removeEventListener("mouseleave",userProfileMusicPlayerMouseLeave);
            e.path[0].className = "userProfileMusicPlayerCurSongContainer";    
            e.path[0]["children"][0].src = "../Images/musicIcon2.png";
            e.path[0]["children"][0].className = "userProfileMusicIcon";
            e.path[0]["children"][1].className = "userProfileMusicPlayerCurSongName";
        } catch {
            curSongContainer = e.path[1];
            e.path[1]["children"][0].src = "../Images/musicIcon2.png";
            e.path[1]["children"][0].className = "userProfileMusicIcon";
            e.path[1].removeEventListener("mouseenter",userProfileMusicPlayerMouseEnter);
            e.path[1].removeEventListener("mouseleave",userProfileMusicPlayerMouseLeave);
            e.path[1].className = "userProfileMusicPlayerCurSongContainer";
            e.path[0].className = "userProfileMusicPlayerCurSongName";
            try {
                e.path[0].src = "../Images/musicIcon2.png";
                e.path[0].className = "userProfileMusicIcon";
                e.path[1]["children"][1].className = "userProfileMusicPlayerCurSongName";
            } catch {
                console.log("here3");
            }
        }
        //
        try {
            audioSrc = e.path[0]["children"][2].src;
        } catch {
            audioSrc = e.path[1]["children"][2].src;
        }
        //PausePlay Button
        let userProfileMusicButtonsPausePlay = document.getElementsByClassName("userProfileMusicButtons")[0];
        userProfileMusicButtonsPausePlay.addEventListener("click",userProfileMusicPlayerPausePlay);
        userProfileMusicButtonsPausePlay.innerText = "Pause";
        curSongPlaying = true;
        //Mute Button
        let userProfileMusicButtonsMute = document.getElementsByClassName("userProfileMusicButtons")[1];
        userProfileMusicButtonsMute.addEventListener("click",userProfileMusicPlayerMuteUnMute);
        userProfileMusicButtonsMute.innerText = "Mute";
        curSongMuted = false;
        //Mute Button
        let userProfileMusicButtonsRepeat = document.getElementsByClassName("userProfileMusicButtons")[2];
        userProfileMusicButtonsRepeat.addEventListener("click",userProfileMusicPlayerRepeat);
        userProfileMusicButtonsRepeat.innerText = "Repeat: OFF";
        curSongRepeat = false;

        curSong.src = audioSrc;
        curSong.play();
        curSong.volume = userProfileMusicVolumeSeeker.value / 100;
        userProfileMusicVolumeValue.innerText = userProfileMusicVolumeSeeker.value;
        curSong.addEventListener("timeupdate",updateSeekerStartAndEndTime);
    }
    //Display each music in the list
    let userProfileMusicQueue = document.getElementById("userProfileMusicQueue"); 
    let userProfileMusicList = JSON.parse(users)[0]["userProfileMusicPlayerQueue"]; 
    for(var i = 0; i < userProfileMusicList.length; i++){
        let userProfileMusicNameContainer = document.createElement("div");
        userProfileMusicNameContainer.className = "userProfileMusicNameContainer";
        userProfileMusicNameContainer.addEventListener("mouseenter",userProfileMusicPlayerMouseEnter);
        userProfileMusicNameContainer.addEventListener("mouseleave",userProfileMusicPlayerMouseLeave);
        userProfileMusicNameContainer.addEventListener("click",userProfileMusicPlayerLoadMusic);
        let userProfileMusicIcon = document.createElement("img");
        userProfileMusicIcon.src = "../Images/musicIcon1.png";
        userProfileMusicIcon.name = userProfileMusicList[i][0];
        userProfileMusicIcon.className = "userProfileMusicIcon";
        let userProfileMusicName = document.createElement("h5");
        userProfileMusicName.name = userProfileMusicList[i][0];
        userProfileMusicName.className = "userProfileMusicName";
        userProfileMusicName.innerText = userProfileMusicList[i][0];
        let audio = document.createElement("audio");
        audio.src = userProfileMusicList[i][1];
        userProfileMusicQueue.appendChild(userProfileMusicNameContainer);
        userProfileMusicNameContainer.appendChild(userProfileMusicIcon);
        userProfileMusicNameContainer.appendChild(userProfileMusicName);
        userProfileMusicNameContainer.appendChild(audio);
    }
}
loadUserProfileMusicQueue()







/*
? F O O T  N O T E S
todo Optimize the system by stopping the top bar time counting when it's not shown 
!Did NOT Work

todo Fix the top bar fade off property - make it work even if user repeatedly displays the top bar

todo As soon us the desktop loads show the top bar and fade away

todo For file numbers 13 53 minamin fix the arranging function

todo For the music player enable it to play even when clicking the image or the text

todo when playing music and it ends change pause button to play

*/