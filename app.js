let songIndex=0
let audioElement= new Audio('songs/1.mp3')
let masterPlay=document.getElementById('masterPlay')
let myProgressBar=document.getElementById('myProgressBar')
let gif=document.getElementById('gif')
let masterSongName=document.getElementById('masterSongName')
let songItems=Array.from(document.getElementsByClassName('songItem'))



let songs=[
    {songName:"Warriyo - Mortals [NCS Release]",filePath:"songs/1.mp3",coverPath:"covers/1.jpg"},
    {songName:"Cielo - Huma-Huma",filePath:"songs/2.mp3",coverPath:"covers/2.jpg"},
    {songName:"DEAF KEV - Invincible [NCS Release]-320k",filePath:"songs/3.mp3",coverPath:"covers/3.jpg"},
    {songName:"Different Heaven & EH!DE - My Heart ",filePath:"songs/4.mp3",coverPath:"covers/4.jpg"},
    {songName:"Janji-Heroes-Tonight-feat-Johnning-",filePath:"songs/5.mp3",coverPath:"covers/5.jpg"},
    {songName:"Royal Salam-e-Ishq",filePath:"songs/6.mp3",coverPath:"covers/6.jpg"},
    {songName:"Salam-e-Ishq",filePath:"songs/7.mp3",coverPath:"covers/7.jpg"},

]

songItems.forEach((Element,i)=>{
    Element.getElementsByTagName('img')[0].src=songs[i].coverPath 
    Element.getElementsByClassName('songName')[0].innerHTML=songs[i].songName
})

masterPlay.addEventListener("click",()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play()
        masterPlay.classList.remove('fa-play-circle')
        masterPlay.classList.add('fa-pause-circle')
        gif.style.opacity=1
     }
     else{
        audioElement.pause()
        masterPlay.classList.remove('fa-pause-circle')
        masterPlay.classList.add('fa-play-circle')
        gif.style.opacity=0
        }
})

audioElement.addEventListener("timeupdate",()=>{
    // update rangr input
    Progress=parseInt((audioElement.currentTime/audioElement.duration)*100)
    myProgressBar.value=Progress;
})

myProgressBar.addEventListener("change",()=>{
    audioElement.currentTime=myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((Element)=>{
        Element.classList.remove('fa-pause-circle')
        Element.classList.add('fa-play-circle')
        
        })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((Element)=>{
    Element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndexindex=parseInt(e.target.id)
        e.target.classList.remove('fa-play-circle')
        e.target.classList.add('fa-pause-circle')
        audioElement.src=`songs/${songIndex+1}.mp3`
        masterSongName.innerHTML=songs[index].songName
        audioElement.currentTime=0
        audioElement.play()
        gif.style.opacity=1
        masterPlay.classList.remove("fa-play-circle")
        masterPlay.classList.add("fa-pause-circle")
        
    })
})

document.getElementById('next').addEventListener("click",()=>{
    if(songIndex>=7){
        songIndex=0
    }else{
        songIndex +=1;
    }
    audioElement.src=`songs/${songIndex+1}.mp3`
    masterSongName.innerHTML=songs[songIndex].songName
    audioElement.currentTime=0
    audioElement.play()
    gif.style.opacity=1
    masterPlay.classList.remove("fa-play-circle")
    masterPlay.classList.add("fa-pause-circle")

})


document.getElementById('previous').addEventListener("click",()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src=`songs/${songIndex+1}.mp3`
    masterSongName.innerHTML=songs[songIndex].songName
    audioElement.currentTime=0
    audioElement.play()
    gif.style.opacity=1
    masterPlay.classList.remove("fa-play-circle")
    masterPlay.classList.add("fa-pause-circle")

})