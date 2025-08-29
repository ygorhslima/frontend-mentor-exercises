const item = [...document.querySelectorAll(".list .item")];
const indicators = document.querySelectorAll(".indicator-technology");

let currentIndex = 0;
function showItem(index){
    item.forEach((item, i)=>{
        item.classList.toggle("active", i === index);
        indicators[i].classList.toggle("active",i === index);
    });
}

indicators.forEach((indicator, i)=>{
    indicator.addEventListener("click",()=>{
        currentIndex = i
        showItem(currentIndex)
    });
});