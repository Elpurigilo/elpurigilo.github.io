/*工具*/

    function display_box_by_id(id){
        document.getElementById(id).setAttribute("style","display:flex")
    }

    function display_box(id, type){
        document.getElementById(id).setAttribute("style","display:"+type)
    }

    function hidden_box(id){
        document.getElementById(id).setAttribute("style","display:none")
    }

    function display_acc(e){
        display_box("login","flex")
    }

    function hidden_acc(e){
        document.getElementById("login").setAttribute("style","display:none")
    }

    /*结果框*/

    function suc(text){
        document.getElementById("r-i").innerHTML = text
        document.getElementById("r-w").setAttribute("style","display:none")
        document.getElementById("r-r").setAttribute("style","display:flex")
        document.getElementById("result").setAttribute("style","display:flex")

        setTimeout(()=>{
            document.getElementById("result").setAttribute("style","display:none")
        },1000)
    }

    function err(text){
        document.getElementById("r-i").innerHTML = text
        document.getElementById("r-w").setAttribute("style","display:flex")
        document.getElementById("r-r").setAttribute("style","display:none")
        document.getElementById("result").setAttribute("style","display:flex")

        setTimeout(()=>{
            document.getElementById("result").setAttribute("style","display:none")
        },1000)
    }


