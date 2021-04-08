// # get jobs from json
let jobsArray = JSON.parse(joblisting);

// output
let output = document.getElementsByTagName("main")[0];

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

let spanTagArray = document.querySelectorAll("span.tagItem");
let outputBox = document.getElementById("output");
let filterBox = document.getElementById("filterBox");
let outputContent;
let outputBoxCounter = 0;

// # for each .tagItem an EventListener
for (let i = 0; i < spanTagArray.length; i++) {

    spanTagArray[i].addEventListener("click", () => {

        filterBox.style.display = "grid";
        // console.log(outputBoxCounter);

        // # get all current filterTags in #output
        outputContent = Array.from(document.querySelectorAll("#output span.filterTagItem"));

        // * if != empty, check content
        (outputContent.length == 0) ? createFilterItem(i) : checkAlreadyIn(i);

        // TODO: FILTERFUNKTION

        // TODO: REMOVE TAG

    });
}


// # CREATE TAG IN #OUTPUT
let createFilterItem = (i) => {
    // console.log("  ## createFilterItem START");
    // console.log("      new tag: " + spanTagArray[i].innerHTML);

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
    outputContent = Array.from(document.querySelectorAll("#output span.filterTagItem"));

    // console.log("      output length: " + outputContent.length);
    // console.log("  ## createFilterItem END");
}

// # CHECK OB TAG SCHON VERWENDET
let checkAlreadyIn = (i) => {
    
    const found = outputContent.find(element => element.innerHTML == spanTagArray[i].innerHTML);
    console.log(found);

    (found == undefined) ? console.log("new item") : console.log("alredy exists");

    // console.log("");
    // console.log("## checkAlreadyIn START");
    // console.log("    for loop start:");
    // console.log("    output length: " + outputContent.length);

    let checkCounter = 0;
    // console.log("    checkCounter = " + checkCounter);
    
    for (let j = 0; j < outputContent.length; j++) {

        // console.log("    outputArrayItem: " + [j] + " " + outputContent[j].innerHTML);
        // console.log("    ? CHECK on :  " + spanTagArray[i].innerHTML);

        // if not yet contained - create items
        if (outputContent[j].innerHTML !== spanTagArray[i].innerHTML) {
            // console.log("    = NOT same");
            checkCounter++; // when it is different, the counter is increased
            // console.log("     checkCounter = " + checkCounter);
        // } else {
            // here no counter is increased
            // console.log("    = SAME");
            // console.log("     checkCounter = " + checkCounter);
        }
    }
    // console.log("    for loop end");
    // if counter is same as length, then create item
    // if not the same - no item is created. because then it is already in there
    (checkCounter == outputContent.length) ? createFilterItem(i) : (console.log("already existing item"));

    // console.log("## checkAlreadyIn END");
}