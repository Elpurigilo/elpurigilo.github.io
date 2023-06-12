

    /*搜索框焦点*/
    document.getElementById("search-input").addEventListener('focus',function(e){
        var env = document.getElementsByClassName("search-bar")[0]

        console.log("search-bar 获得输入焦点")

        document.addEventListener('keydown',keyCodeEvent)

        env.setAttribute("style","border: 1px solid rgba(79, 148, 180, 0.386);background:rgba(3, 171, 255, 0.201)")
    })

    document.getElementById("search-input").addEventListener('blur',function(e){
        var env = document.getElementsByClassName("search-bar")[0]

        console.log("search-bar 失去输入焦点")

        document.removeEventListener('keydown',keyCodeEvent)

        env.setAttribute("style","border: 1px solid rgba(0, 174, 255, 0.7);background: rgba(0, 136, 255, 0)")
    })

    /*回车监听*/

    function keyCodeEvent(e){

        console.log("按下了: "+e.keyCode)

        switch (e.keyCode){
            case 13: display_search_result(1, "搜索结果")
            break
        }
    }

    function display_search_result(flag, title){
        
        var content = document.getElementById("search-input").value

        var arr = []

        // console.log("local_songs[i].name.url"+content)

        if (flag != 0 && content == ""){
            return err("搜索结果为空")
        }

        if(flag==0){
            content = ""
        }

        console.log("搜索内容: "+content)

        document.getElementById("r-t-2").innerHTML = title

        for (var i=0;i<env_list.length;++i){

            if (i<local_songs.length && local_songs[i].name.search(content) != -1){

                play_img[i].Index = arr.length //修正顺序下标

                arr.push(local_songs[i])

                console.log("find: "+ local_songs[i].name)

                console.log("set: "+local_songs[i].name)

                writeAudioTime(local_songs[i].url,rsd[i])

                if (audio.src.search(local_songs[i].url) != -1){

                    play_img[i].src = 'img/播放-4.png'
                    if (audio.paused){

                        play_img[i].src = 'img/播放-4.png'
        
                    } else{

                        play_img[i].src = 'img/暂停-4.png'

                    }
                } else {

                    play_img[i].src = 'img/播放-4.png'

                }

                play_img[i].surl =  local_songs[i].url

                rsn[i].innerHTML = local_songs[i].name

                env_list[i].style.display = "block"
            }
            else {

                env_list[i].style.display = "none"
                
            }
        }

        console.log("find: "+arr.length+" results")

        result_array = arr

        len = result_array.length

        cur_song_list = result_array

        document.getElementById("result-2").style.display = "flex"

    }

    function HeadPhotoEventListioner(e){
        display_search_result(0, "我的音乐")
    }
