//setting box
let settingBox = document.querySelector(".setting-box");
let toggle = document.querySelector(".toggle-setting ");
toggle.onclick = function (){
    settingBox.classList.toggle("open")
}
//switch- color
let colorList = document.querySelectorAll(".color-list li")
colorList.forEach(li => {
    li.addEventListener("click", (e=>{
        document.documentElement.style.setProperty("--main--color", e.target.dataset.color)
        //set color local storage
        localStorage.setItem("color_option",e.target.dataset.color);
        e.target.parentElement.querySelectorAll(".active").forEach(element=> {
            element.classList.remove("active")
        })
        e.target.classList.add("active")
    }))
})

//random background option
let backgroundOption = true;

//variable to control interval
let backgroundInterval;

//switch- background
let randomBackEl = document.querySelectorAll(".option-box span")
randomBackEl.forEach(span => {
    span.addEventListener("click", (e=>{
        //remove active class from all span
        e.target.parentElement.querySelectorAll(".active").forEach(element=> {
            element.classList.remove("active")
        })
        //add active class on self
        e.target.classList.add("active")

        if (e.target.dataset.background ==="yes")
        {
            backgroundOption = true;
            randomizeImg();
        }
        else
        {
            backgroundOption = false;
            clearInterval(backgroundInterval);
        }
    }))
})

//local sorage
let mainColor = localStorage.getItem("color_option");
if(mainColor !== null)
{
    document.documentElement.style.setProperty("--main--color",mainColor )
    
    document.querySelectorAll(".color-list li").forEach(element=> {
        element.classList.remove("active");

        if(element.dataset.color === mainColor)
        {
            element.classList.add("active")
        }
    });
}
 //change background img
let landingPage = document.querySelector(".landing");
let imgArray = ["img01.jpg", "img02.png", "img03.jpg", "img04.png"];

// function to randomize imgs
function randomizeImg()
{
    if(backgroundOption === true)
    {
        backgroundInterval = setInterval(()=>{
        //get random num
        let randNum = Math.floor(Math.random() * imgArray.length);
        //change background img
        landingPage.style.transition = "1s"
        landingPage.style.backgroundImage = `url(../imgs/` + imgArray[randNum] +`)`;
        },2000)
    }
}
randomizeImg();


// get slider items
let sliderTest = Array.from(document.querySelectorAll('.test .text .review'));

//num of item in array
let sliderCount = sliderTest.length;

// set current slide
let currentSlide = 1;

//prev and next but
let prevBut = document.getElementById("prev");
let nextBut = document.getElementById("next");

//click on prev and next
prevBut.onclick = prevSlide;
nextBut.onclick = nextSlide;

checker();

//next slide fun
function nextSlide()
{
    if(nextBut.classList.contains('disabled'))
    {
        return false;
    }
    else
    {
        currentSlide ++;
        checker();
    }
}

//prev slide fun
function prevSlide()
{
    if(prevBut.classList.contains('disabled'))
    {
        return false;
    }
    else
    {
        currentSlide --;
        checker();
    }
}

// checker fun
function checker()
{
    removeActiveClass()
    // set active curent slide
    sliderTest[currentSlide - 1].classList.add('active');

    //check if current slide first
    if(currentSlide == 1 )
    {
        //add disabled class
        prevBut.classList.add("disabled")
    }
    else
    {
        prevBut.classList.remove("disabled")
    }
    if(currentSlide === sliderCount )
    {
        //add disabled class
        nextBut.classList.add("disabled")
    }
    else
    {
        nextBut.classList.remove("disabled")
    }
}
function removeActiveClass()
{
    //loop through image
    sliderTest.forEach(el => {
        el.classList.remove("active")
    });
}

//about transition
// let ourAbout = document.querySelector(".about")
// window.onscroll = function (){
//     if(window.scrollY >= ourAbout.offsetTop - 100)
//     {
//         let contents = document.querySelectorAll(".about .box .content")
//         contents.forEach(content => {
//             content.style.opacity = 1
//         });
//     }
// }

/*questions*/

let tabs = document.querySelectorAll(".information .box .ask");
let tabsArry = Array.from(tabs);
let answer = document.querySelectorAll(".information .box span");
let answerArry = Array.from(answer);

tabsArry.forEach((ele) => {
  ele.addEventListener("click", function(e){
    tabsArry.forEach((ele) => {
      ele.classList.remove("active")
    });
    e.currentTarget.classList.add("active");

    answerArry.forEach((ans) => {
      ans.style.display = "none"
    });

    document.querySelector(e.currentTarget.dataset.cont).style.display = "inline"
  })
})

/*count num */
let started = false;
let counter = document.querySelector(".counter");
let nums = document.querySelectorAll(".counter .box .num")
//up
let up = document.querySelector(".up")

window.onscroll = function (){
    if(window.scrollY >= counter.offsetTop - 200)
    {
        if(!started)
        {
            nums.forEach((num) => startCount(num));
        }
        started = true;
    }
    //up
    if(this.scrollY >= 900)
  {
    up.classList.add("show")
  }
  else
  {
    up.classList.remove("show")
  }
}
function startCount(el)
{
    let goal = el.dataset.goal;
    let count = setInterval(()=>{
        el.textContent++;
        if(el.textContent == goal)
        {
            clearInterval(count)
        }
    },100/goal)
}
//up
up.onclick = function()
{
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}
/*Blog*/
//but
let all = document.querySelector(".all")
let latest = document.querySelector(".latest")
let business = document.querySelector(".business")
//news
let bus = document.querySelectorAll(".bus")
let lat = document.querySelector(".lat")
//fun
all.onclick = function()
{
    all.classList.add("active")
    bus.forEach(span => {
        span.classList.remove("disabled")
    })
    lat.classList.remove("disabled");
    business.classList.remove("active");
    latest.classList.remove("active");
}
latest.onclick = function()
{
    latest.classList.add("active");
    bus.forEach(span => {
        span.classList.add("disabled")
    })
    all.classList.remove("active");
    business.classList.remove("active");
    lat.classList.remove("disabled")
}
business.onclick = function()
{
    business.classList.add("active");
    latest.classList.remove("active");
    all.classList.remove("active");
    lat.classList.add("disabled");
    bus.forEach(span => {
        span.classList.remove("disabled")
    })
}