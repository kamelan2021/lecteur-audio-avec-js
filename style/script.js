var heure = document.getElementById('heure'); //l'heure minute seconde
var timeSongProgress = document.getElementById('timeSongProgress'); // le temps de music en cour
var timeSongTotal = document.getElementById('timeSongTotal'); // le temps de la musique total
var increaseMainBarre = document.getElementById('increaseMainBarre');//barre de dont le chargement doit remplire
var nivelIncrease = document.getElementById('nivelIncrease');// le chargement
var count = 0; 
var audio =document.getElementById('audio'); //l'audio
var audioSource = document.getElementById('audioSource'); // l'attribut source d'audio
var image = document.getElementById('image');
var audioplay = document.getElementById('audioplay');//icone permettant de jouer
var audioStop = document.getElementById('audioStop'); // icone permettant d'arreter
var titleSong = document.getElementById('titleSong'); // le titre de la chanson
var iconVolume = document.getElementById('iconVolume'); // icon du volume
var volumeBarre = document.getElementById('volumeBarre'); // la barre de volume à remplire
var volumeProgress = document.getElementById('volumeProgress'); // la barre du volume qui remplit
var blockTitleVolume = document.getElementById('blockTitleVolume'); // le block contenant le titre, les btn de control
var audioList = document.querySelectorAll('.titre'); // la liste des chansons dans la list qui sont sur l'écran

image.className = '';


audioplay.addEventListener('click', function(){
    if(count == 0){
        count = 1;
        audio.play();
        audioplay.innerHTML = "<i class='bx bx-pause'></i>";
        image.className = 'image';
    }else{
        count = 0;
        audio.pause();
        audioplay.innerHTML = "<i class='bx bx-play'></i>";
        image.className = '';
    }
})

audioStop.addEventListener('click', function(){
    count = 0;
    audio.pause();
    audio.currentTime = 0;
    blockTitleVolume.style.visibility = "hidden";
})

audioList.forEach(function(audioSingle){
    // var dataAudioName = audioSingle.getAttribute("data-audio");
        audioSingle.addEventListener('click', function(){
            thisisAudioSingle = this;
            var titre = thisisAudioSingle.innerHTML;
            titleSong.innerHTML = titre;
            var sources = this.getAttribute("data-audio");
            audio.src = sources;
            audio.play();
            image.className = 'image';
            blockTitleVolume.style.visibility = "visible";
            audioplay.innerHTML = "<i class='bx bx-pause'></i>";
            

            setTimeout(function(){
                var s = parseInt(audio.duration % 60);
                var m = parseInt((audio.duration / 60) % 60);
                console.log(s);
                console.log(m);
//                 timeSongTotal.innerHTML = m + ":" + s;
                audio.addEventListener("timeupdate",function(){
                    var s2 = parseInt(audio.currentTime % 60);
                    var m2 = parseInt((audio.currentTime / 60) % 60);
                    timeSongProgress.innerHTML = m2 + ":" + s2;
                })
                if(s == s2 && m == m2){
                    audioplay.innerHTML = "<i class='bx bx-play'></i>";
                    audio.pause();
                }
            },200)
            
    })
})

// volume
volumeProgress.style.width = `${audio.volume * 100}%`;
volumeBarre.addEventListener('click', updateVolume);
function updateVolume(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    // var durer = audio.currentTime;
    // console.log(durer);
    // console.log(clickX);
    // console.log(width);
    audio.volume = (clickX / width);
    volumeProgress.style.width = `${audio.volume * 100}%`;
    if(clickX == 0){
        iconVolume.innerHTML = "<i class='bx bxs-volume-mute'></i> "
    }else{
        iconVolume.innerHTML = "<i class='bx bxs-volume-full'></i>" 
    }

}
