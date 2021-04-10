// # get jobs from json
let jobsArray = JSON.parse(joblisting);

// output
let output = document.getElementsByTagName("main")[0];
const jobArray = [];

// # put jobs into html

// div.jobContainer
//      img.logo
//      +div.company
//      +div.new
//      +div.featured
//      div.position
//      +div.postedAt
//      +div.contract
//      +div.location
//      div.tags
//          btn.role
//          btn.level
//          btn.languages (n)
//          btn.tools (n)

// for(let job in jobsArray){
for (let i = 0; i < jobsArray.length; i++) {

    // div.jobContainer
    var divCont = document.createElement("div");
    divCont.classList.add("jobContainer");
    output.appendChild(divCont);
    jobArray.push(divCont);

    var imgLogo = document.createElement("img");
    imgLogo.setAttribute("src", jobsArray[i].logo);
    divCont.appendChild(imgLogo);

    // div.container for company, new, featured
    var divCont2 = document.createElement("div");
    divCont.appendChild(divCont2);

    var jobComp = document.createElement("div");
    jobComp.classList.add("company");
    var textnode = document.createTextNode(jobsArray[i].company);
    jobComp.appendChild(textnode);
    divCont2.appendChild(jobComp);

    // "new" Badge
    if (jobsArray[i].new) {
        var newBadge = document.createElement("div");
        newBadge.classList.add("newBadge");
        textnode = document.createTextNode("NEW!");
        newBadge.appendChild(textnode);
        divCont2.appendChild(newBadge);
    }

    // "featured" Badge
    if (jobsArray[i].featured) {
        var featuredBadge = document.createElement("div");
        featuredBadge.classList.add("featured");
        textnode = document.createTextNode("FEATURED");
        featuredBadge.appendChild(textnode);
        divCont2.appendChild(featuredBadge);

        // apply styling on parentContainer
        divCont2.parentElement.classList.add("featuredContent");
    }

    // div.position
    var jobPos = document.createElement("h1");
    jobPos.classList.add("position");
    textnode = document.createTextNode(jobsArray[i].position);
    jobPos.appendChild(textnode);
    divCont.appendChild(jobPos);

    // div.contasiner for .postedAt, .contract, .location
    var divCont3 = document.createElement("div");
    divCont.appendChild(divCont3);

    var postedAt = document.createElement("div");
    textnode = document.createTextNode(jobsArray[i].postedAt);
    postedAt.appendChild(textnode);
    divCont3.appendChild(postedAt);

    var spanPoint = document.createElement("span");
    textnode = document.createTextNode(".");
    spanPoint.appendChild(textnode);
    divCont3.appendChild(spanPoint);

    var contract = document.createElement("div");
    textnode = document.createTextNode(jobsArray[i].contract);
    contract.appendChild(textnode);
    divCont3.appendChild(contract);

    spanPoint = document.createElement("span");
    textnode = document.createTextNode(".");
    spanPoint.appendChild(textnode);
    divCont3.appendChild(spanPoint);

    var jobLocation = document.createElement("div");
    textnode = document.createTextNode(jobsArray[i].location);
    jobLocation.appendChild(textnode);
    divCont3.appendChild(jobLocation);

    // div.tags
    var divCont4 = document.createElement("div");
    divCont.appendChild(divCont4);

    // position
    var jobPosition = document.createElement("span");
    jobPosition.classList.add("tagItem");
    textnode = document.createTextNode(jobsArray[i].role);
    jobPosition.appendChild(textnode);
    divCont4.appendChild(jobPosition);

    // level
    var jobLevel = document.createElement("span");
    jobLevel.classList.add("tagItem");
    textnode = document.createTextNode(jobsArray[i].level);
    jobLevel.appendChild(textnode);
    divCont4.appendChild(jobLevel);

    // lang
    for (let lang in jobsArray[i].languages) {
        var jobLang = document.createElement("span");
        jobLang.classList.add("tagItem");
        textnode = document.createTextNode(jobsArray[i].languages[lang]);
        jobLang.appendChild(textnode);
        divCont4.appendChild(jobLang);
    }

    // tools
    for (let tool in jobsArray[i].tools) {
        var jobTool = document.createElement("span");
        jobTool.classList.add("tagItem");
        textnode = document.createTextNode(jobsArray[i].tools[tool]);
        jobTool.appendChild(textnode);
        divCont4.appendChild(jobTool);
    }

}


// == /////////////////////
// == FILTERBOX
// == /////////////////////

const spanTagArray = document.querySelectorAll("span.tagItem");
const outputBox = document.getElementById("output");
const filterBox = document.getElementById("filterBox");

let outputContent = new Set();
const jobContainerArray = document.querySelectorAll("div.jobContainer");
const clearAll = document.getElementById("clear");




// # for each .tagItem an EventListener
for (let i = 0; i < spanTagArray.length; i++) {

    spanTagArray[i].addEventListener("click", () => {

        filterBox.style.display = "grid";

        // # get all current filterTags in #output
        // outputContent = Array.from(document.querySelectorAll("#output span.filterTagItem"));

        // * if array != empty, check content
        (outputContent.size == 0) ? createFilterItem(i) : checkAlreadyIn(i);

    });
}


// # CREATE TAG IN #OUTPUT
let createFilterItem = (i) => {

    var spanTag = document.createElement("span");
    spanTag.classList.add("filterTagItem");
    textnode = document.createTextNode(spanTagArray[i].innerHTML);
    spanTag.appendChild(textnode);
    outputBox.appendChild(spanTag);

    // add icon remove
    var imgRemove = document.createElement("img");
    imgRemove.setAttribute("src", "/images/icon-remove.svg");
    imgRemove.classList.add("removeFilterTag");
    outputBox.appendChild(imgRemove);

    // get all current filterTags in #output
    // outputContent = Array.from(document.querySelectorAll("#output span.filterTagItem"));
    outputContent.add(spanTagArray[i].innerHTML);

    // FILTER JOBS
    filterAllItems();
    removeBtnListener();
}

// # CHECK OB TAG SCHON VERWENDET
let checkAlreadyIn = (i) => {

    // const found = outputContent.find(element => element.innerHTML == spanTagArray[i].innerHTML);
    // if (found == undefined) {createFilterItem(i)}

    if (outputContent.has(spanTagArray[i].innerHTML)) {
        return;
    } else {
        createFilterItem(i);
    }
}

// # FILTERFUNKTION
let filterAllItems = () => {

    // in jedem Job:
    jobContainerArray.forEach(element => {
        let divSpans = element.lastChild;
        let divSpansChildren = Array.from(divSpans.children);

        element.style.display = "grid";

        // für alle bisher gesetzten filter:
        for (let item of outputContent) {
            // finde im Array divSpansChildren den Wert
            let filterCheck = divSpansChildren.find(tag => tag.innerHTML == item);
            // wenn undefined => gibts den filter darin nicht => display.none
            if (filterCheck == undefined) { element.style.display = "none"; }
        }
    });
}


// # REMOVE TAG

const removeBtnListener = () => {
    let removeFilterArray = document.querySelectorAll("img.removeFilterTag");

    for (let j = 0; j < removeFilterArray.length; j++) {

        // add eventlistener for each set filter to remove when clicked on
        removeFilterArray[j].addEventListener("click", () => {

            outputContent.delete(removeFilterArray[j].previousSibling.innerHTML);

            removeFilterArray[j].previousSibling.remove();
            removeFilterArray[j].remove();

            // if filterbox = empty, display.none
            if (outputBox.childNodes.length == 0) { filterBox.style.display = "none" }

            filterAllItems();
        });
    }

}

// TODO: clear all
// Clear btn event listener
// all jobContainerArray.elements display.grid
clearAll.addEventListener("click", () => {
    jobContainerArray.forEach(element => element.style.display = "grid");
    // outputContent = ();

    for (var elem of outputContent) {
        if (outputContent.has(elem)) {
            outputContent.delete(elem);
        }
    }
    while (outputBox.firstChild) {
        outputBox.removeChild(outputBox.lastChild);
      }
    
    // if filterbox = empty, display.none
    if (outputBox.childNodes.length == 0) { filterBox.style.display = "none" }
})