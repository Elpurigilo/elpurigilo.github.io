
    /*头像*/
    function HeadPhotoEventTransform(nickname){
        document.getElementById("btn-login").innerHTML = ""
        document.getElementById("nickname").innerHTML = nickname
        document.getElementById("nickname").style.display = "flex"
        document.getElementById("btn-login").setAttribute("style", "border-radius: 100%;width:40px;height:40px;background:url('D:/FTP/HTML5/音乐网站/img/artist04.jpg')")
        document.getElementById("btn-login").removeEventListener('click',display_acc)

        hidden_acc()

        document.getElementById("btn-login").addEventListener('click',HeadPhotoEventListioner)

    }

    /*登录与注册*/

    function RigisterEventListener(event){

        var acc = document.getElementById("acc").value
        var pas = document.getElementById("pass").value
        var pasl = document.getElementById("pass-l").value
        var nick = document.getElementById("nick-name").value

        if (acc == "" || pas == "" || pasl == "" || nick == ""){
            return err("内容不能为空")
        } else if (pas != pasl){
            return err("密码不匹配!")
        }

        for (var i=0;i<acc_list.length;++i){
            if (acc_list[i].acc == acc){
                return err("already")
            }
        }

        acc_list.push({acc:acc,pass:pas,nickname:nick})
        LoginEventTransform(event)
        return suc("success")
    }

    function LoginEventListener(e){
        var acc = document.getElementById("acc").value
        var pas = document.getElementById("pass").value

        if (acc == "" || pas == ""){
            return err("内容不能为空")
        }
        for (var i=0;i<acc_list.length;++i){
            if (acc_list[i].acc == acc && acc_list[i].pass == pas){
                suc("success")
                HeadPhotoEventTransform(acc_list[i].nickname)
                return
            }
        }

        return err("账号或密码错误: acc: "+acc+"pass: "+pas)

    }

    ext = ["pas-al","pass-l","nick","nick-name"]

    function LoginEventTransform(event){
        var hid = document.getElementById("hid")
        var accl = document.getElementById("accl")
        var pasl = document.getElementById("pasl")
        var fora = document.getElementById("fora")

        hid.innerHTML = "登录"
        accl.innerHTML = "账号"
        pasl.innerHTML = "密码"
        fora.innerHTML = "忘记密码"
        document.getElementById("close-login").setAttribute("style","bottom:87px")

        for (var i=0;i<ext.length;++i){
            hidden_box(ext[i])
        }
        
        document.getElementById("ent-login").removeEventListener('click',LoginEventTransform)
        document.getElementById("ent-login").addEventListener('click',LoginEventListener)
        document.getElementById("ent-rigister").removeEventListener('click',RigisterEventListener)
        document.getElementById("ent-rigister").addEventListener('click',RigisterEventTransform)

    }
    function RigisterEventTransform(event){
        
        var hid = document.getElementById("hid")
        var accl = document.getElementById("accl")
        var pasl = document.getElementById("pasl")
        var fora = document.getElementById("fora")

        hid.innerHTML = "注册"
        accl.innerHTML = "输入账号"
        pasl.innerHTML = "输入密码"
        fora.innerHTML = "我不知道怎么注册"

        document.getElementById("close-login").setAttribute("style","bottom:27px")

        for (var i=0;i<ext.length;++i){
            display_box_by_id(ext[i])
        }
        
        document.getElementById("ent-login").removeEventListener('click',LoginEventListener)
        document.getElementById("ent-login").addEventListener('click',LoginEventTransform)
        document.getElementById("ent-rigister").removeEventListener('click',RigisterEventTransform)
        document.getElementById("ent-rigister").addEventListener('click',RigisterEventListener)

    }

    document.getElementById("fora").addEventListener('click',function (e){
        err("没救了，等死吧，告辞")
    })

    document.getElementById("ent-rigister").addEventListener('click',RigisterEventTransform)
    document.getElementById("ent-login").addEventListener('click',LoginEventListener)
