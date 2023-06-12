



    var local_songs = [

    ]

    var ml = [
        '出山 - 花粥 王胜娚',
        '盗将行 - 花粥 马雨阳',
        '归去来兮 - 花粥',
        "Alex Skrindo Stahl! - Delightful",
        "IOSYS - why I wanna know",
        "宮村優子 - It's only the Fairy Tale",
        "泠鸢yousa Hanser 泠鸢yousaの呆萌忆【管理团队】 - 悠哉日常~悠哉~悠哉",
        "趣味工房にんじんわいん - How to spend winter",
        "汤成君Jun - 时空中的绘旅人",
        "葉月ゆら - 宵暗花火　instrumental",
        "柚卟 - みちしるべ (路标)《紫罗兰永恒花园》ED（翻自 茅原実里）",
        "志方あきこ - 朱隠し"
    ]

    var spl = []
    for (var i=0;i<ml.length;++i){
        spl = ml[i].split(" - ")
        local_songs.push({name:spl[1],artist:spl[0],url:"Music/"+ml[i]+".mp3"})
    }

    /*异步更新*/

    const writeAudioTime = async (src, ptr) => {

        var audio = new Audio(src)
        while (isNaN(audio.duration) || audio.duration === Infinity) {

            await new Promise(resolve => setTimeout(resolve, 200));

            audio.currentTime = 10000000 * Math.random();

            }

        ptr.innerHTML = get_song_duration( audio.duration )
    }

    result_array = []

    cur_song_list = local_songs

    len = cur_song_list.length;  // 歌曲长度

    play_img = document.querySelectorAll('#s-b-f');

    env_list = document.getElementsByClassName("list_n")

    rsn = document.querySelectorAll('#r-s-n');

    rsd = document.querySelectorAll('#r-s-d');


    // function search_result_play_icon_listioner(e){
    //     this.querySelector("a > img").src = "img/暂停-4.png"
    // }


    /*预加载账号*/

    acc_list = [
        {acc: 114514, pass: 1919810, pasp: 0, nickname:"root"},
        {acc: 123456, pass: 7890123, pasp: 0, nickname:"鸡汤来咯"},
        {acc: 131452, pass: 0131452, pasp: 0, nickname:"三生三世"},

    ]

    document.getElementById("btn-login").addEventListener('click',display_acc)

    document.getElementById("close-login").addEventListener('click',hidden_acc)

    document.getElementById("close-list").addEventListener('click',function(e){hidden_box("result-2")})


    // document.getElementById("ent-login").removeEventListener('click',LoginEventListener)
    // hid accl pasl fora



    /*音频控制栏*/
    var env_pl_list = [
        'cb-artist','audio-start','icon-last-song','icon-paly','icon-next-song',
        's-area','total-timeline','infor-timeline','hover-timeline',
        'cur-timeline','audio-end','cb-song-name','roa-play']

    var plbs = []

    for (var i=0;i<env_pl_list.length;++i){
        plbs.push(document.getElementById(env_pl_list[i]).style.display)
    }

    function hidden_control_bar(){

        console.log("hidden: control-bar")

        document.getElementById("plb").style.backgroundColor = "rgba(255, 255, 255, 0)"
        for (var i=0;i<env_pl_list.length;++i){

            document.getElementById(env_pl_list[i]).style.display = "none"
        }
    }

    function display_control_bar(){

        console.log("display: control-bar")

        document.getElementById("plb").style.backgroundColor = "rgba(176, 176, 176, 0.468)"
        for (var i=0;i<env_pl_list.length;++i){


            document.getElementById(env_pl_list[i]).style.display = plbs[i]
        }
    }

    hidden_control_bar()

    /*旋转播放*/

    function addRotateZEvent(){
        document.getElementById("roa-play").setAttribute("style", "animation: rotateAlbumArt 3s linear 0s infinite forwards;")
    }

    function removeRotateZEvent(){
        document.getElementById("roa-play").setAttribute("style", "animation: none;")
    }


    var artistName = document.getElementById('cb-artist');   

    var musicName = document.getElementById('cb-song-name'); 

    var icon_play = document.getElementById('icon-paly');   

    var btn_last = document.getElementById('icon-last-song');   

    var btn_next = document.getElementById('icon-next-song');       

    var tProgress = document.getElementById('audio-start');       

    var totalTime = document.getElementById('audio-end');    

    var ttl = document.getElementById('total-timeline');     

    var ctl = document.getElementById('cur-timeline');    

    var htl = document.getElementById('hover-timeline'); 

    // 一些计算所需的变量
    var seekT, seekLoc, seekBarPos, cM, ctMinutes, ctSeconds, curMinutes, curSeconds, durMinutes, durSeconds, playProgress, bTime, nTime = 0

    var currIndex = -1;              // 当前播放索引

    // 初始化定时器 判断是否需要缓冲

    var buffInterval = null 

    function play_control_event(e){

        if (audio.csrc.search(this.surl) == -1){

            console.log(audio.src + " + " + this.surl)

            console.log("切换歌曲: "+this.surl)

            selectTrack(0, this.Index) // 初始化

            if (audio.last_play){ //如无上一首记录，则为首次启动

                audio.last_play.src = 'img/播放-4.png'

            }

        }

        console.log(audio.paused?"开始播放": "暂停播放")

        if(audio.paused){

            addRotateZEvent()

            document.getElementById("plb").removeEventListener('mouseout', hidden_control_bar)

            document.getElementById("plb").removeEventListener('mouseover', display_control_bar)
            
            display_control_bar()

            this.src = 'img/暂停-4.png'

            icon_play.src = this.src

            if (this != icon_play) {

                audio.last_play = this

            }

            checkBuffering(); 

            audio.play();  

        }else{

            document.getElementById("plb").addEventListener('mouseover', display_control_bar)

            document.getElementById("plb").addEventListener('mouseout', hidden_control_bar)

            removeRotateZEvent()

            this.src = 'img/播放-4.png'

            icon_play.src = this.src

            clearInterval(buffInterval);          // 清除检测是否需要缓冲的定时器

            audio.pause(); // 暂停
        }  
    }

    total_timeline_length = 0

    // 鼠标移动在进度条上， 触发该函数	
    function showHover(event){
        seekBar = ttl.style; 

        // 修复 ttl.offsetWidth 暂停音乐时获取不到的问题?
        if (total_timeline_length == 0 && ttl.offsetWidth != 0){ 
            total_timeline_length = ttl.offsetWidth
        }

        seekT = event.clientX - seekBar.left;  //获取当前鼠标在进度条上的位置

        seekLoc = audio.duration * (seekT / total_timeline_length); //当前鼠标位置的音频播放秒数： 音频长度(单位：s)*（鼠标在进度条上的位置/进度条的宽度）

        htl.style.width = seekT+"px"

        cM = seekLoc / 60;    // 计算播放了多少分钟： 音频播放秒速/60
        
        ctMinutes = Math.floor(cM); 
        ctSeconds = Math.floor(seekLoc - ctMinutes * 60); // 计算播放秒数
        
        console.log("阴影: ctMinutes: "+ctMinutes+" ctSeconds: "+ctSeconds)

        
    }

    // 鼠标移出进度条，触发该函数
    function hideHover(e)
    {
        htl.style.width = 0+"px";
    }

    // 鼠标点击进度条，触发该函数
    function playFromClickedPos(event)
    {

        console.log("设置时间: "+seekLoc)

        audio.currentTime = seekLoc; // 设置音频播放时间 为当前鼠标点击的位置时间

        ctl.style.width = seekT+"px";        // 设置进度条播放长度，为当前鼠标点击的长度

    }

    function get_song_duration(dur){
        var durMinutes = Math.floor(dur / 60);

        var durSeconds = Math.floor(dur - durMinutes * 60);

        if(durMinutes < 10){
            durMinutes = '0'+durMinutes;
        }

        if(durSeconds < 10){
            durSeconds = '0'+durSeconds;
        }

        if( isNaN(durMinutes) || isNaN(durSeconds) )
            return '--:--';
        else
            return durMinutes+':'+durSeconds;
    }

    // 在音频的播放位置发生改变是触发该函数
    function update_timeline()
    {
        nTime = new Date();      // 获取当前时间
        nTime = nTime.getTime(); // 将该时间转化为毫秒数

        // 计算当前音频播放的时间
        curMinutes = Math.floor(audio.currentTime  / 60);
        curSeconds = Math.floor(audio.currentTime  - curMinutes * 60);
        
        // 计算播放进度百分比
        playProgress = (audio.currentTime  / audio.duration) * 100;
        
        // 如果时间为个位数，设置其格式
        if(curMinutes < 10)
            curMinutes = '0'+curMinutes;
        if(curSeconds < 10)
            curSeconds = '0'+curSeconds;
        
        if( isNaN(curMinutes) || isNaN(curSeconds) )
            tProgress.innerHTML = '00:00';
        else
            tProgress.innerHTML = curMinutes+':'+curSeconds;
        
        totalTime.innerHTML = get_song_duration(audio.duration)
        
        // 设置播放进度条的长度
        ctl.style.width = playProgress+'%';
        
        // 进度条为100 即歌曲播放完时
        if( playProgress == 100 )
        {
            icon_play.src = 'img/播放.png'

            ctl.style.width = 0;

            clearInterval(buffInterval);   // 清除定时器

            selectTrack(1);  //播放下一首
        }
    }

    // 定时器检测是否需要缓冲
    function checkBuffering(){
        clearInterval(buffInterval);
        buffInterval = setInterval(function()
        { 
                
            bTime = new Date();
            bTime = bTime.getTime();

        },100);
    }

    function selectTrack(flag, Index){
        if (Index != undefined){ //列表播放选择

            currIndex = Index

            console.log("指定选择: "+ Index)

        }
        else if( flag == 0 || flag == 1 ){  // 初始 || 点击下一首
            ++ currIndex;
            if(currIndex >=len){ 
                currIndex = 0;
            }
        } else{ 
            --currIndex;
            if(currIndex<=-1){  
                currIndex = len-1;
            }
        }

        if( flag == 0 ){

            icon_play.src = 'img/播放-4.png'

        }else{

            icon_play.src = 'img/暂停-4.png'

        }

        ctl.style.width = 0;           // 重置播放进度条为0

        tProgress.innerHTML = '00:00';    // 播放时间重置

        totalTime.innerHTML = '--:--';    // 总时间重置

        // 获取当前索引的:歌曲名，歌手名，图片，歌曲链接等信息

        currMusic = cur_song_list[currIndex].name;

        currArtist = cur_song_list[currIndex].artist;

        audio.src = cur_song_list[currIndex].url;
        audio.csrc = cur_song_list[currIndex].url
        
        nTime = 0;
        bTime = new Date();
        bTime = bTime.getTime();

        // 如果点击的是上一首/下一首 则设置开始播放，添加相关类名，重新开启定时器
        if(flag != 0){

            audio.play();
        
            clearInterval(buffInterval);
            checkBuffering();
        }

        artistName.innerHTML = currArtist;

        musicName.innerHTML = currMusic;
        
    }

    audio = new Audio();  // 创建Audio对象

    // 初始化函数
    function initPlayer() {

        selectTrack(0);       // 初始化第一首歌曲的相关信息

        audio.loop = false;   // 取消歌曲的循环播放功能

        //播放按钮监听
        document.getElementById("play-control").addEventListener('click',play_control_event);         

        for (var i=0;i<play_img.length;++i){

            play_img[i].Index = i
            play_img[i].addEventListener('click',play_control_event)

        }

        // 进度条 移入/移出/点击 动作触发相应函数
        ttl.addEventListener('mouseover',showHover); 
        ctl.addEventListener('mouseover',showHover); 

        ttl.addEventListener('mouseout',hideHover); 
        
        ttl.addEventListener('click',playFromClickedPos);
        ctl.addEventListener('click',playFromClickedPos);

        // 实时更新播放时间
        audio.addEventListener('timeupdate',update_timeline); 

        // 上下首切换
        btn_last.addEventListener('click',function(){ selectTrack(-1);} );
        btn_next.addEventListener('click',function(){ selectTrack(1);});
    }

    // 调用初始化函数
    initPlayer();
















