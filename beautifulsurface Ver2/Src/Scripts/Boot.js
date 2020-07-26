let users = `[
    {
        "username": "Dagmawi Babi",
        "password": "s",
        "LSProfilePic": "../Images/DWZQ5569.JPEG",
        "LSSlideShow": "ethan.JPG",
        "desktopProfilePic": "../Images/DWZQ5569.JPEG",
        "userProfilePic": "../Images/DWZQ5569.JPEG",
        "preferences": {
            "showDesktopIcons" : true
        },
        "userProfileMusicPlayerQueue": [
            ["Adore You - Miley Cyrus","../Audio/AY.mp3"],
            ["Crazy In Love - Fifty Shades","../Audio/CIL.mp3"],
            ["Castle On The Hill - Ed Sheeran","../Audio/COTH.mp3"],
            ["Four Five Seconds - Rihanna ft Kanye","../Audio/FFS.mp3"],
            ["F*cking Perfect - P!nk","../Audio/FP.mp3"],
            ["Give Me Love - Ed Sheeran","../Audio/GML.mp3"],
            ["Mirrors - Justin Timberlake","../Audio/M.mp3"],
            ["Not A Bad Thing - Justin Timberlake","../Audio/NABT.mp3"],
            ["Night Changes - One Direction","../Audio/NC.mp3"],
            ["Purpose - Justin Bieber","../Audio/P.mp3"],
            ["Tatoo - Jordan Sparks","../Audio/T.mp3"],
            ["Waves - Mr.Probz","../Audio/W.mp3"],
            ["TNWM - 13 Reasons Why","../Audio/TNWM.mp3"]
        ]
    }
]`; 

// B O O T  S C R E E N
//Load the boot screen progressbar 
let bootProgressValue = 0;
function loadBootProgressbar(){
    let bootScreenDIV = document.getElementById("bootScreen");
    let bootProgressbar = document.getElementById("bootProgressbar");
    bootProgressbar.value = bootProgressValue;
    bootProgressValue++;
    if (bootProgressValue == 150) {
        clearInterval(loadBootProgressbarVar);
        bootScreenDIV.style.display = "none";
        //Load the lock screen when booting is done
        lockScreen();
    }
}
loadBootProgressbarVar = setInterval(loadBootProgressbar,10)

// L O C K  S C R E E N
function lockScreen(){
    /*let bootScreenDIV = document.getElementById("bootScreen"); // remove this too
    bootScreenDIV.style.display = "none"; // remove this after debug*/
    let lockScreenDIV = document.getElementById("lockScreen");
    let lockScreenProfilePic = document.getElementById("lockScreenProfilePic");
    let lockScreenUsername = document.getElementById("lockScreenUsername");
    let lockScreenPasswordInput = document.getElementById("lockScreenPasswordInput");
    let capsLockState = document.getElementById("capsLockState");
    let lockScreenUserProfile = document.getElementById("lockScreenUserProfile");
    let loginBtn = document.getElementById("loginBtn");
    let lockScreenTime = document.getElementById("lockScreenTime");

    lockScreenDIV.style.display = "flex";
    //lockScreenUserProfile.style.animation = "unBlur";       // CHOOSE
    //lockScreenUserProfile.style.animationDuration = "3s";   // BETWEEN
    lockScreenDIV.style.animation = "unBlur";                 // THESE 
    lockScreenDIV.style.animationDuration = "3s";             // TWO
    //Display the time
    lockScreenTime.innerText = new Date().toString().slice(0,25);
    // * User Data * 
    let username = JSON.parse(users)[0]["username"];
    let password = JSON.parse(users)[0]["password"];
    let LSProfilePic = JSON.parse(users)[0]["LSProfilePic"];
    lockScreenProfilePic.src = LSProfilePic;
    lockScreenUsername.innerText = username;
    //Add key binding
    lockScreenPasswordInput.addEventListener("keydown",(e)=>{
        if(e.key == "Enter"){
            authenticateLogin();
        }
    })
    document.addEventListener("keydown",(e)=>{
        if(e.key == "CapsLock"){
            console.log("hello")
            capsLockState.innerText = "CapsLock is on";
            capsLockState.style.visibility = "visible";
        }
    });
    //Login Authentication
    loginBtn.addEventListener("click",authenticateLogin);
    function authenticateLogin(){
        userAttempt = lockScreenPasswordInput.value;
        if (userAttempt == password) {
            lockScreenUserProfile.style.border = "1px solid lime";
            lockScreenUserProfile.style.boxShadow =  "4px 4px 80px lime";
            setTimeout(()=>{
                lockScreenDIV.style.display = "none";
                home();
            },1000);
        } else {
            lockScreenUserProfile.style.border = "1px solid red";
            lockScreenUserProfile.style.boxShadow =  "4px 4px 80px red";
        }
    }
}
//lockScreen();
 

// D E S K T O P - H O M E
function home(){
    let bootScreenDIV = document.getElementById("bootScreen");  // Remove All
    bootScreenDIV.style.display = "none";                       // Of This
    let lockScreenDIV = document.getElementById("lockScreen");  // After
    lockScreenDIV.style.display = "none";                       // DEBUGGING.
    let desktopContainer = document.getElementById("desktopContainer");
    desktopContainer.style.display = "flex";
    //desktopContainer.style.animation = "unBlur";
    //desktopContainer.style.animationDuration = "3s";
    let desktopProfilePic = document.getElementById("desktopProfilePic");
    let desktopUsername = document.getElementById("desktopUsername");
    desktopUsername.innerText = JSON.parse(users)[0]["username"];
    desktopProfilePic.src = JSON.parse(users)[0]["desktopProfilePic"];
}
//home()




/* 
? F O O T   N O T E S
todo Show a random lock screen
todo Enable a slideshow for the lock screen
todo Show if the caps lock is turned on or off
todo Add a login button in the lock screen
*/






