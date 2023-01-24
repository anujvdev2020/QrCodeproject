const wrapper = document.querySelector(".wrapper");
form = wrapper.querySelector("form");
fileInp = form.querySelector("input");
infoText=form.querySelector("p")
copyBtn=wrapper.querySelector(".copy")
closeBtn=wrapper.querySelector(".close")



function fetchRequest(formData,file){
    infoText.innerHTML="Scanning Qr Code"
    fetch("https://api.qrserver.com/v1/read-qr-code/",{
        method:"POST", 
        body:formData
    })
    .then((res)=>res.json())
    .then(result=>{
        result=result[0].symbol[0].data

        infoText.innerHTML=result?"Upload Qr Code to Scan":"Could'nt Scan Qr Code"
        if(!result) return;
        wrapper.querySelector("textarea").innerHTML=result
        form.querySelector('img').src=URL.createObjectURL(file)
        wrapper.classList.add("active")
    })
    .catch(err=>{
        infoText.innerHTML="Could'nt Scan Qr Code"

    })
}

fileInp.addEventListener('change',(e)=>{
    let file=e.target.files[0] //getting user selected file
    let formData=new FormData()// creating a new formdata object
    formData.append("file",file) //adding selected file to formData object
    fetchRequest(formData ,file)
    console.log(file)
})

copyBtn.addEventListener("click",()=>{
    let text=wrapper.querySelector("textarea").textContent
    navigator.clipboard.writeText(text)
})
closeBtn.addEventListener("click",()=>wrapper.classList.remove("active"))
form.addEventListener("click",()=> fileInp.click());
