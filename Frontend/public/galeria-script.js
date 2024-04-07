var wholeImgBox=document.getElementById("wholeImgBox");
        var wholeImg=document.getElementById("wholeImg");
        
        function openWholeImg(pic){
            wholeImgBox.style.display = "flex";
            wholeImg.src=pic;
        }
        
        function closeWholeImg(){
            wholeImgBox.style.display = "none";
        }
        

function Kepmegjelenites(){
    const div = document.getElementById("gallery");
        for(let i =1; i<=9; i++){
            const img =document.createElement("img");
            img.src="images/img"+i+".jpg";
            img.className=
            img.addEventListener("click",function(){
            openWholeImg(this.src);
                
            });
            div.appendChild(img);
        }
    }

Kepmegjelenites();